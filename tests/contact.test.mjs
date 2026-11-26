import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { afterEach, beforeEach, mock, test } from "node:test";
import { runInThisContext } from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const validInput = { name: "Sender Name", email: "sender@example.com", message: "Mocked test only.\nNo email delivery." };
const source = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

// Execute actual TS/TSX with installed dependencies. The hook harness below tests
// event/state behavior without adding a framework; it is not browser/DOM QA.
function load(file, { react = React, flag, deliveryFlag, verifiedFlag } = {}, cache = new Map()) {
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const { outputText } = ts.transpileModule(source(file), {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, esModuleInterop: true },
  });
  const localRequire = (name) => {
    if (name === "react") return react;
    if (name.endsWith(".css")) return { default: {} , __esModule: true };
    if (name.startsWith("@/")) return load(`src/${name.slice(2)}.ts`, { react, flag, deliveryFlag, verifiedFlag }, cache);
    return require(name);
  };
  runInThisContext(`(function(exports, require, process) { ${outputText}\n})`, { filename: file })(
    exports, localRequire, { env: { NEXT_PUBLIC_CONTACT_FORM_ENABLED: flag, CONTACT_DELIVERY_ENABLED: deliveryFlag, NEXT_PUBLIC_CONTACT_DELIVERY_VERIFIED: verifiedFlag } },
  );
  return exports;
}
const { submitContact, contactErrors, contactLimits } = load("src/lib/contact.ts");

beforeEach(() => {
  mock.method(globalThis, "fetch", () => { throw new Error("Unmocked network forbidden"); });
});
afterEach(() => mock.restoreAll());

for (const field of ["name", "email", "message"]) {
  for (const value of [undefined, "", " \n\t ", 42]) {
    test(`required ${field}: ${JSON.stringify(value)} prevents submission`, async () => {
      assert.deepEqual(await submitContact({ ...validInput, [field]: value }), { success: false, error: contactErrors.INVALID_INPUT });
      assert.equal(fetch.mock.callCount(), 0);
    });
  }
  test(`oversized ${field} prevents submission`, async () => {
    const result = await submitContact({ ...validInput, [field]: "x".repeat(contactLimits[field] + 1) });
    assert.deepEqual(result, { success: false, error: contactErrors.INPUT_TOO_LONG });
    assert.equal(fetch.mock.callCount(), 0);
  });
}
for (const email of ["invalid", "a@", "@example.com", "a b@example.com", "a@example.com\0", "a@b@c.com"]) {
  test(`invalid email ${JSON.stringify(email)}`, async () => {
    assert.deepEqual(await submitContact({ ...validInput, email }), { success: false, error: contactErrors.INVALID_EMAIL });
    assert.equal(fetch.mock.callCount(), 0);
  });
}

test("raw length limits include surrounding whitespace", async () => {
  assert.equal((await submitContact({ ...validInput, name: " ".repeat(100) + "a" })).error, contactErrors.INPUT_TOO_LONG);
  assert.equal(fetch.mock.callCount(), 0);
});

test("URLSearchParams encodes the exact static form fields and special characters", async () => {
  const input = { name: " Saif & Co + % ", email: "sender+contact@example.com", message: "Hello = \u0928\u092e\u0938\u094d\u0924\u0947 & caf\u00e9\nSecond line + %", "bot-field": "" };
  mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "/__forms.html");
    assert.equal(options.method, "POST");
    assert.equal(options.headers["Content-Type"], "application/x-www-form-urlencoded");
    assert.equal(typeof options.body, "string");
    assert.ok(options.signal instanceof AbortSignal);
    assert.deepEqual(Object.fromEntries(new URLSearchParams(options.body)), {
      "form-name": "portfolio-contact", ...input, name: input.name.trim(),
    });
    assert.match(options.body, /%26/);
    assert.match(options.body, /%2B/);
    assert.match(options.body, /%0A/);
    return new Response("");
  });
  assert.deepEqual(await submitContact(input), { success: true });
  assert.equal(fetch.mock.callCount(), 1);
});

test("honeypot value is forwarded for Netlify spam processing", async () => {
  mock.method(globalThis, "fetch", async (_url, options) => {
    assert.equal(new URLSearchParams(options.body).get("bot-field"), "bot content");
    return new Response("");
  });
  await submitContact({ ...validInput, "bot-field": "bot content" });
});

for (const status of [200, 201, 204]) {
  test(`HTTP ${status} is accepted without requiring JSON`, async () => {
    mock.method(globalThis, "fetch", async () => new Response(null, { status }));
    assert.deepEqual(await submitContact(validInput), { success: true });
  });
}
for (const status of [400, 403, 404, 422, 429, 500, 503]) {
  test(`HTTP ${status} rejection keeps response content private`, async () => {
    mock.method(globalThis, "fetch", async () => new Response("PRIVATE_PROVIDER_BODY", { status }));
    assert.deepEqual(await submitContact(validInput), { success: false, error: contactErrors.PROVIDER_HTTP_ERROR });
  });
}
test("redirected success page does not establish acceptance", async () => {
  mock.method(globalThis, "fetch", async () => {
    const response = new Response("login");
    Object.defineProperty(response, "redirected", { value: true });
    return response;
  });
  assert.deepEqual(await submitContact(validInput), { success: false, error: contactErrors.PROVIDER_INVALID_RESPONSE });
});
test("network failure provides a safe error", async () => {
  assert.deepEqual(await submitContact(validInput), { success: false, error: contactErrors.PROVIDER_UNAVAILABLE });
});
test("timeout aborts submission and clears its timer", async () => {
  const timers = [];
  const clear = mock.method(globalThis, "clearTimeout", () => {});
  mock.method(globalThis, "setTimeout", (callback, milliseconds) => {
    assert.equal(milliseconds, 20000);
    timers.push(callback);
    return 123;
  });
  mock.method(globalThis, "fetch", (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new Error("Aborted")));
  }));
  const pending = submitContact(validInput);
  timers[0]();
  assert.deepEqual(await pending, { success: false, error: contactErrors.PROVIDER_TIMEOUT });
  assert.deepEqual(clear.mock.calls[0].arguments, [123]);
});

test("maximum permitted field lengths are accepted", async () => {
  mock.method(globalThis, "fetch", async () => new Response(""));
  assert.deepEqual(await submitContact({ name: "n".repeat(100), email: `${"a".repeat(64)}@${"b".repeat(185)}.com`, message: "m".repeat(5000) }), { success: true });
});

for (const flag of [undefined, "false", "TRUE", "1", "", "unknown", " true", "true ", "true"]) {
  test(`presentation switch ${JSON.stringify(flag)} and direct email fallback`, () => {
    const Page = load("src/app/contact/page.tsx", { flag }).default;
    const html = renderToStaticMarkup(React.createElement(Page));
    assert.ok(html.includes('href="mailto:iamsaifkhan25@gmail.com"'));
    const enabled = flag === undefined || flag === "true";
    assert.equal(html.includes('<form name="portfolio-contact"'), enabled);
    assert.equal(html.includes("Reach me by email"), !enabled);
    assert.equal((html.match(/id="contact-details-title"/g) || []).length, 1);
    assert.ok(html.indexOf('aria-labelledby="contact-details-title"') < html.indexOf(`aria-labelledby="${enabled ? "message" : "email"}-title"`));
    assert.ok(!html.includes("Your message didn&#x27;t go through"));
    if (enabled) {
      assert.ok(html.includes("Send Message"));
      assert.ok(html.includes('id="message-title" class="type-section font-display-serif">Send me a message</h2>'));
      assert.ok(html.includes("Have something in mind? I&#x27;d love to hear about it."));
      assert.ok(!html.includes("Try again"));
      assert.ok(html.includes("I&#x27;m testing this form at the moment."));
      assert.ok(!html.includes("All fields are required"));
      for (const [name, label] of Object.entries({ name: "Your name", email: "Email address", message: "Your message" })) {
        assert.ok(html.includes(`<label for="${name}">${label} <span class="type-metadata">(required)</span></label>`));
      }
      assert.ok(html.includes('aria-label="Social profiles"'));
      for (const placeholder of ["e.g. Alex Morgan", "you@example.com", "A project, an opportunity, or just a question. Tell me a little about it."]) {
        assert.ok(html.includes(`placeholder="${placeholder}"`));
      }
      assert.ok(html.includes('name="form-name" value="portfolio-contact"'));
      assert.ok(html.includes('aria-live="polite"'));
      assert.ok(html.includes('aria-busy="false"'));
      for (const [name, limit] of Object.entries(contactLimits)) {
        const control = html.match(new RegExp(`<(?:input|textarea)\\b[^>]*name="${name}"[^>]*>`))?.[0];
        assert.ok(control);
        assert.ok(control.includes(`maxLength="${limit}"`));
        assert.ok(control.includes('required=""'));
        assert.ok(html.includes(`for="${name}"`));
      }
      const staticHtml = source("public/__forms.html");
      assert.equal((staticHtml.match(/<form\b/g) || []).length, 1);
      assert.ok(staticHtml.includes('name="portfolio-contact"'));
      assert.ok(staticHtml.includes('data-netlify="true"'));
      assert.ok(staticHtml.includes('netlify-honeypot="bot-field"'));
      const names = (text) => [...text.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/g)].map((match) => match[1]).sort();
      assert.deepEqual(names(html), names(staticHtml));
      assert.deepEqual(names(html), ["bot-field", "email", "form-name", "message", "name"]);
    }
    assert.equal(fetch.mock.callCount(), 0);
  });
}

for (const verifiedFlag of [undefined, "false", "TRUE", "true"]) {
  test(`delivery verification ${String(verifiedFlag)} controls notice without changing enable switch`, () => {
    for (const flag of [undefined, "true", "false"]) {
      const Page = load("src/app/contact/page.tsx", { flag, verifiedFlag }).default;
      const html = renderToStaticMarkup(React.createElement(Page));
      const enabled = flag === undefined || flag === "true";
      assert.equal(html.includes('<form name="portfolio-contact"'), enabled);
      assert.equal(html.includes('id="form-notice"'), enabled && verifiedFlag !== "true");
      if (enabled) {
        assert.equal(html.includes('aria-describedby="form-notice"'), verifiedFlag !== "true");
        if (verifiedFlag === "true") assert.ok(!html.includes("aria-describedby="));
        assert.ok(html.includes("email me directly"));
      }
    }
    assert.equal(fetch.mock.callCount(), 0);
  });
}

function nodes(tree) {
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...React.Children.toArray(tree.props?.children).flatMap(nodes)];
}
function textContent(tree) {
  return React.Children.toArray(tree).map((child) => typeof child === "object" ? textContent(child.props.children) : String(child)).join("");
}
function harness({ flag, verifiedFlag } = {}) {
  let cursor = 0;
  const slots = [];
  let effects = [];
  const focused = [];
  const hooks = { ...React,
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = initial;
      return [slots[index], (value) => { slots[index] = value; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
    useEffect(effect, dependencies) {
      const index = cursor++;
      if (!slots[index] || dependencies.some((value, i) => value !== slots[index][i])) effects.push(effect);
      slots[index] = dependencies;
    },
  };
  const Page = load("src/app/contact/page.tsx", { flag, verifiedFlag, react: hooks }).default;
  const render = () => {
    cursor = 0;
    effects = [];
    const tree = Page();
    // Simulate ref attachment/effect timing only; this is not DOM focus proof.
    for (const node of nodes(tree)) {
      if (node.props?.ref) node.props.ref.current = { focus: () => focused.push(node.props.id || node.type) };
    }
    effects.forEach((effect) => effect());
    return tree;
  };
  const find = (predicate) => nodes(render()).find(predicate);
  const field = (name) => find((node) => node.props?.name === name);
  const submit = () => find((node) => node.type === "form").props.onSubmit({ preventDefault() {} });
  const values = () => Object.fromEntries(Object.keys(validInput).map((key) => [key, field(key).props.value]));
  const fill = () => {
    for (const [key, value] of Object.entries(validInput)) field(key).props.onChange({ target: { value } });
  };
  const retry = () => find((node) => node.type === "button" && node.props.children === "Try again").props.onClick();
  const layout = () => nodes(render()).find((node) =>
    React.Children.toArray(node.props?.children).some((child) => child.props?.["aria-labelledby"] === "contact-details-title"));
  const panels = () => React.Children.toArray(layout().props.children);
  return { find, field, submit, values, fill, retry, focused, panels };
}

function assertDetailsFirst(page, panelTitle = "message-title") {
  assert.deepEqual(page.panels().map((panel) => panel.props["aria-labelledby"]), ["contact-details-title", panelTitle]);
}

test("contact columns follow reading order without CSS reordering at any state", () => {
  const css = source("src/app/contact/page.module.css");
  assert.match(css, /@media \(min-width: 64rem\)[\s\S]*?\.layout\s*\{[^}]*grid-template-columns:\s*minmax\(0, \d+fr\) minmax\(0, \d+fr\)/);
  assert.doesNotMatch(css, /(?:\border\s*:|grid-(?:area|column|row)\s*:|direction\s*:|dense|row-reverse|column-reverse)/);
});

test("UNSET environment initially shows empty form with Contact Details first; no focus move or submission", () => {
  const page = harness();
  assertDetailsFirst(page);
  assert.deepEqual(page.values(), { name: "", email: "", message: "" });
  assert.ok(!page.find((node) => node.type === "button" && node.props.children === "Try again"));
  assert.deepEqual(page.focused, []);
  assert.equal(fetch.mock.callCount(), 0);
});

test("explicit emergency disable wins even when delivery is verified", () => {
  const page = harness({ flag: "false", verifiedFlag: "true" });
  assertDetailsFirst(page, "email-title");
  assert.doesNotMatch(textContent(page.panels()[1]), /didn't go through|Try again/);
  assert.ok(!page.find((node) => node.type === "form"));
  assert.ok(!page.find((node) => node.type === "button"));
  assert.ok(page.find((node) => node.type === "a" && node.props.children === "Email Saif"));
  assert.equal(fetch.mock.callCount(), 0);
});

test("rapid duplicate events, loading announcement, disabled controls, then accepted/reset", async () => {
  let resolve;
  mock.method(globalThis, "fetch", () => new Promise((done) => { resolve = done; }));
  const page = harness();
  const details = textContent(page.panels()[0]);
  page.fill();
  // Capture one handler and invoke twice before rendering, as with rapid events.
  const handler = page.find((node) => node.type === "form").props.onSubmit;
  const event = { preventDefault() {} };
  const pending = handler(event);
  await handler(event);
  assert.equal(fetch.mock.callCount(), 1);
  assert.equal(page.find((node) => node.type === "form").props["aria-busy"], true);
  for (const key of Object.keys(validInput)) assert.equal(page.field(key).props.disabled, true);
  assert.equal(page.find((node) => node.type === "button").props.disabled, true);
  const sendingStatus = page.find((node) => node.props?.role === "status");
  assert.equal(textContent(sendingStatus), "Sending your message...");
  assert.equal(sendingStatus.props["aria-live"], "polite");
  assert.equal(sendingStatus.props["aria-atomic"], "true");
  assert.equal(page.find((node) => node.type === "button").props.children, "Sending your message...");
  assert.deepEqual(page.values(), validInput);
  assertDetailsFirst(page);
  assert.equal(textContent(page.panels()[0]), details);
  resolve(new Response(""));
  await pending;
  assert.deepEqual(page.values(), { name: "", email: "", message: "" });
  assertDetailsFirst(page);
  assert.equal(textContent(page.panels()[0]), details);
  assert.equal(page.find((node) => node.type === "button").props.disabled, false);
  assert.equal(textContent(page.find((node) => node.props?.role === "status")), "Thanks for reaching out! Your message has been submitted.");
  assert.doesNotMatch(JSON.stringify(page.find((node) => node.props?.role === "status")), /delivered|inbox/i);
});

for (const kind of ["validation", "server", "network", "redirect", "timeout"]) {
  test(`${kind} failure switches to email fallback; Try again preserves entries without resending`, async () => {
    const timers = [];
    if (kind === "timeout") {
      mock.method(globalThis, "setTimeout", (callback) => { timers.push(callback); return 123; });
      mock.method(globalThis, "clearTimeout", () => {});
    }
    mock.method(globalThis, "fetch", async (_url, { signal }) => {
      if (kind === "network") throw new TypeError("offline");
      if (kind === "timeout") return new Promise((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(new Error("Aborted")));
      });
      if (kind === "redirect") {
        const response = new Response("login");
        Object.defineProperty(response, "redirected", { value: true });
        return response;
      }
      return new Response("Rejected", { status: 503 });
    });
    const page = harness();
    const details = textContent(page.panels()[0]);
    page.fill();
    if (kind === "validation") page.field("email").props.onChange({ target: { value: "invalid" } });
    const before = page.values();
    const pending = page.submit();
    if (kind === "timeout") timers[0]();
    await pending;
    assertDetailsFirst(page);
    assert.equal(textContent(page.panels()[0]), details);
    assert.ok(!page.find((node) => node.type === "form"));
    assert.ok(!page.field("name"));
    const email = page.find((node) => node.type === "a" && node.props.children === "Email Saif");
    assert.equal(email.props.href, "mailto:iamsaifkhan25@gmail.com");
    const retry = page.find((node) => node.type === "button" && node.props.children === "Try again");
    assert.equal(retry.props.type, "button");
    const failureStatus = page.find((node) => node.props?.role === "status");
    assert.equal(textContent(failureStatus), "Your message didn't go through. You can try again or email me directly.");
    assert.equal(failureStatus.props["aria-live"], "polite");
    assert.deepEqual(page.focused, ["h3"]);
    const count = fetch.mock.callCount();
    assert.equal(count, kind === "validation" ? 0 : 1);
    page.retry();
    assertDetailsFirst(page);
    assert.equal(textContent(page.panels()[0]), details);
    assert.deepEqual(page.values(), before);
    assert.equal(fetch.mock.callCount(), count);
    assert.deepEqual(page.focused, ["h3", "name"]);
    assert.ok(!page.find((node) => node.type === "button" && node.props.children === "Try again"));
    assert.equal(textContent(page.find((node) => node.props?.role === "status")), "");
    mock.method(globalThis, "fetch", async () => new Response(""));
    page.field("email").props.onChange({ target: { value: validInput.email } });
    await page.submit();
    assert.deepEqual(page.values(), { name: "", email: "", message: "" });
  });
}

for (const deliveryFlag of [undefined, "false", "true"]) {
  test(`retired relay cannot send even with CONTACT_DELIVERY_ENABLED=${String(deliveryFlag)}`, async () => {
    const { POST } = load("src/app/api/contact/route.ts", { deliveryFlag });
    const response = await POST();
    assert.equal(response.status, 410);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal((await response.json()).code, "CONTACT_DISABLED");
    assert.equal(fetch.mock.callCount(), 0);
  });
}
