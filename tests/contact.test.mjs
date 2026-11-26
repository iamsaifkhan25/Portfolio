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
function load(file, { react = React, flag, deliveryFlag } = {}, cache = new Map()) {
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
    if (name.startsWith("@/")) return load(`src/${name.slice(2)}.ts`, { react, flag, deliveryFlag }, cache);
    return require(name);
  };
  runInThisContext(`(function(exports, require, process) { ${outputText}\n})`, { filename: file })(
    exports, localRequire, { env: { NEXT_PUBLIC_CONTACT_FORM_ENABLED: flag, CONTACT_DELIVERY_ENABLED: deliveryFlag } },
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

for (const flag of [undefined, "false", "TRUE", "1", "", "true"]) {
  test(`presentation switch ${JSON.stringify(flag)} and direct email fallback`, () => {
    const Page = load("src/app/contact/page.tsx", { flag }).default;
    const html = renderToStaticMarkup(React.createElement(Page));
    assert.ok(html.includes('href="mailto:iamsaifkhan25@gmail.com"'));
    assert.equal(html.includes('<form name="portfolio-contact"'), flag === "true");
    assert.equal(html.includes("Reach me by email"), flag !== "true");
    if (flag === "true") {
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

function nodes(tree) {
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...React.Children.toArray(tree.props?.children).flatMap(nodes)];
}
function harness() {
  let cursor = 0;
  const slots = [];
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
  };
  const Page = load("src/app/contact/page.tsx", { flag: "true", react: hooks }).default;
  const render = () => { cursor = 0; return Page(); };
  const find = (predicate) => nodes(render()).find(predicate);
  const field = (name) => find((node) => node.props?.name === name);
  const submit = () => find((node) => node.type === "form").props.onSubmit({ preventDefault() {} });
  const values = () => Object.fromEntries(Object.keys(validInput).map((key) => [key, field(key).props.value]));
  const fill = () => {
    for (const [key, value] of Object.entries(validInput)) field(key).props.onChange({ target: { value } });
  };
  return { find, field, submit, values, fill };
}

test("rapid duplicate events, loading announcement, disabled controls, then accepted/reset", async () => {
  let resolve;
  mock.method(globalThis, "fetch", () => new Promise((done) => { resolve = done; }));
  const page = harness();
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
  assert.match(JSON.stringify(page.find((node) => node.props?.role === "status")), /Sending message/);
  assert.deepEqual(page.values(), validInput);
  resolve(new Response(""));
  await pending;
  assert.deepEqual(page.values(), { name: "", email: "", message: "" });
  assert.equal(page.find((node) => node.type === "button").props.disabled, false);
  assert.match(JSON.stringify(page.find((node) => node.props?.role === "status")), /Message accepted/);
});

for (const kind of ["validation", "server", "network"]) {
  test(`${kind} failure retains input, announces error and permits retry`, async () => {
    mock.method(globalThis, "fetch", async () => {
      if (kind === "network") throw new TypeError("offline");
      return new Response("Rejected", { status: 503 });
    });
    const page = harness();
    page.fill();
    if (kind === "validation") page.field("email").props.onChange({ target: { value: "invalid" } });
    const before = page.values();
    await page.submit();
    assert.deepEqual(page.values(), before);
    assert.equal(page.find((node) => node.type === "button").props.disabled, false);
    assert.match(JSON.stringify(page.find((node) => node.props?.role === "status")), /email me directly|valid email address/i);
    assert.ok(page.find((node) => node.props?.role === "status").props.children);
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
