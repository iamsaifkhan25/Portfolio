import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { afterEach, beforeEach, mock, test } from "node:test";
import { fileURLToPath } from "node:url";
import { runInThisContext } from "node:vm";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const modules = new Map();

// Run the actual TypeScript modules in memory with the installed compiler and
// NextResponse. No test framework dependency or generated source files needed.
function loadTs(relativePath) {
  const filename = path.join(root, relativePath);
  if (modules.has(filename)) return modules.get(filename).exports;
  const loadedModule = { exports: {} };
  modules.set(filename, loadedModule);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  });
  const require = createRequire(filename);
  const localRequire = (specifier) => specifier.startsWith("@/")
    ? loadTs(`src/${specifier.slice(2)}.ts`)
    : require(specifier);
  runInThisContext(`(function(exports, require, module) { ${outputText}\n})`, { filename })(loadedModule.exports, localRequire, loadedModule);
  return loadedModule.exports;
}

const { POST } = loadTs("src/app/api/contact/route.ts");
const { submitContact, contactErrors } = loadTs("src/lib/contact.ts");
const endpoint = "https://formsubmit.co/ajax/iamsaifkhan25@gmail.com";
const validInput = { name: "Test Sender", email: "sender@example.com", message: "Mocked test only.\nNo email delivery." };
const privateDetail = "PRIVATE_PROVIDER_OR_SENDER_DETAIL";

function request(input = validInput, url = "http://localhost:3000/api/contact") {
  return new Request(url, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input),
  });
}

beforeEach(() => {
  // Fail closed: every scenario must replace this stub to reach a provider.
  mock.method(globalThis, "fetch", () => { throw new Error("Unmocked fetch forbidden"); });
  mock.method(console, "warn", () => {});
  mock.method(console, "info", () => {});
});
afterEach(() => mock.restoreAll());

async function assertFailure(response, status, code) {
  assert.equal(response.status, status);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { success: false, code, error: contactErrors[code] });
  const logs = JSON.stringify([...console.warn.mock.calls, ...console.info.mock.calls].map((call) => call.arguments));
  assert.ok(!logs.includes(privateDetail));
  assert.ok(!logs.includes(validInput.email));
  assert.ok(!logs.includes(validInput.message));
  assert.ok(!logs.includes(validInput.name));
}

function upstreamResponse(body, { url = endpoint, redirected = false, ...options } = {}) {
  const response = new Response(body, options);
  // Native fetch supplies these read-only properties; no real requests are made.
  Object.defineProperties(response, { url: { value: url }, redirected: { value: redirected } });
  return response;
}

for (const success of [true, "true", " TRUE "]) {
  test(`provider acceptance ${JSON.stringify(success)} is normalized`, async () => {
    mock.method(globalThis, "fetch", async (url, options) => {
      assert.equal(url, endpoint);
      assert.equal(options.method, "POST");
      assert.equal(options.headers.Accept, "application/json");
      assert.equal(options.headers["Content-Type"], "application/json");
      assert.equal(options.redirect, "manual");
      assert.equal(options.cache, "no-store");
      assert.ok(options.signal instanceof AbortSignal);
      assert.deepEqual(JSON.parse(options.body), {
        ...validInput, _subject: "Portfolio Message from Test Sender", _url: "http://localhost:3000/contact",
      });
      return Response.json({ success, message: "Accepted" });
    });
    const response = await POST(request({ ...validInput, _cc: "ignored@example.com", _captcha: "false", _url: "https://untrusted.invalid" }));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), { success: true });
  });
}

for (const origin of ["https://main--saifkhans.netlify.app", "https://saifkhans.netlify.app"]) {
  test(`form metadata uses the request deployment: ${origin}`, async () => {
    mock.method(globalThis, "fetch", async (_url, options) => {
      assert.equal(JSON.parse(options.body)._url, `${origin}/contact`);
      return Response.json({ success: true });
    });
    assert.equal((await POST(request(validInput, `${origin}/api/contact?private=query`))).status, 200);
  });
}

for (const success of [false, "false", " FALSE "]) {
  test(`HTTP 200 with provider success ${JSON.stringify(success)} fails`, async () => {
    mock.method(globalThis, "fetch", async () => Response.json({ success, message: privateDetail }));
    await assertFailure(await POST(request()), 502, "PROVIDER_REJECTED");
  });
}

test("an explicit provider error overrides contradictory success", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ success: true, error: privateDetail }));
  await assertFailure(await POST(request()), 502, "PROVIDER_REJECTED");
});

test("an explicit provider error also overrides string acceptance", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ success: "true", error: privateDetail }));
  await assertFailure(await POST(request()), 502, "PROVIDER_REJECTED");
});

test("provider HTTP failure cannot be overridden by a success body", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ success: true }, { status: 503 }));
  await assertFailure(await POST(request()), 502, "PROVIDER_HTTP_ERROR");
});

test("provider HTTP 204 without acceptance is not success", async () => {
  mock.method(globalThis, "fetch", async () => new Response(null, { status: 204 }));
  await assertFailure(await POST(request()), 502, "PROVIDER_INVALID_RESPONSE");
});

for (const status of [400, 403, 429, 500, 503]) {
  test(`provider HTTP ${status} is mapped without leaking its body`, async () => {
    mock.method(globalThis, "fetch", async () => new Response(`<html>${privateDetail}</html>`, { status }));
    await assertFailure(await POST(request()), status === 429 ? 503 : 502, status === 429 ? "CONTACT_BUSY" : "PROVIDER_HTTP_ERROR");
    assert.equal(console.warn.mock.calls[0].arguments[1].providerStatus, status);
  });
}

for (const data of [null, [], true, "true", {}, { message: "Accepted" }, { success: 1 }, { success: "yes" }]) {
  test(`unexpected provider JSON ${JSON.stringify(data)} is not acceptance`, async () => {
    mock.method(globalThis, "fetch", async () => Response.json(data));
    await assertFailure(await POST(request()), 502, "PROVIDER_INVALID_RESPONSE");
  });
}

for (const body of ["<html>Challenge page</html>", "", "{broken"] ) {
  test(`non-JSON provider body ${JSON.stringify(body)} fails safely`, async () => {
    mock.method(globalThis, "fetch", async () => new Response(body));
    await assertFailure(await POST(request()), 502, "PROVIDER_INVALID_RESPONSE");
  });
}

test("provider network or redirect failure is safe", async () => {
  mock.method(globalThis, "fetch", async () => { throw new TypeError(privateDetail); });
  await assertFailure(await POST(request()), 502, "PROVIDER_UNAVAILABLE");
});

for (const [body, contentType, classification, accepted] of [
  ['{"success":true}', "application/json; charset=utf-8", "JSON", true],
  ['{"success":true}', "application/problem+json", "JSON", true],
  ['{"success":true}', "text/plain", "JSON", true],
  [" \n<!DOCTYPE html><html>Challenge</html>", "text/html; charset=UTF-8", "HTML", false],
  ["<html>Challenge</html>", "application/json", "HTML", false],
  ["<div>Challenge</div>", null, "HTML", false],
  ['{"success":true}', "text/html", "HTML", false],
  ["<html />", "application/xhtml+xml", "HTML", false],
  [" \n\t", "application/json", "empty", false],
  ["{broken", "application/json", "unexpected", false],
  ["upstream unavailable", "text/plain", "unexpected", false],
]) {
  test(`upstream diagnostics classify ${classification} with ${contentType}`, async () => {
    const headers = contentType ? { "Content-Type": contentType } : {};
    const upstream = upstreamResponse(body, { headers, url: `${endpoint}?token=${privateDetail}#secret` });
    if (!contentType) upstream.headers.delete("content-type");
    mock.method(globalThis, "fetch", async () => upstream);
    const response = await POST(request());
    if (accepted) {
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { success: true });
    } else {
      await assertFailure(response, 502, "PROVIDER_INVALID_RESPONSE");
    }
    const logs = [...console.warn.mock.calls, ...console.info.mock.calls];
    assert.equal(logs.length, 1);
    assert.deepEqual(logs[0].arguments, ["[CONTACT_DELIVERY]", {
      code: accepted ? "PROVIDER_ACCEPTED" : "PROVIDER_INVALID_RESPONSE",
      providerStatus: 200,
      providerContentType: contentType?.split(";", 1)[0] ?? null,
      providerRedirected: false,
      providerRedirectBlocked: false,
      providerResponseOrigin: "https://formsubmit.co",
      providerResponsePathname: "/ajax/[redacted]",
      providerResponseClassification: classification,
    }]);
  });
}

for (const status of [301, 302, 303, 307, 308]) {
  test(`HTTP ${status} is inspected without following or logging Location`, async () => {
    mock.method(globalThis, "fetch", async (_url, options) => {
      assert.equal(options.redirect, "manual");
      return upstreamResponse(`<html>${privateDetail}</html>`, { status, headers: {
        "Content-Type": "text/html", Location: `https://untrusted.invalid/${privateDetail}`,
      } });
    });
    await assertFailure(await POST(request()), 502, "PROVIDER_UNAVAILABLE");
    assert.equal(fetch.mock.calls.length, 1);
    const log = console.warn.mock.calls[0].arguments[1];
    assert.equal(log.providerStatus, status);
    assert.equal(log.providerRedirected, false);
    assert.equal(log.providerRedirectBlocked, true);
    assert.equal(log.providerResponseClassification, "HTML");
  });
}

test("an already-followed response cannot be reported as accepted", async () => {
  mock.method(globalThis, "fetch", async () => upstreamResponse('{"success":true}', {
    redirected: true, headers: { "Content-Type": "application/json" },
    url: `https://formsubmit.co/confirm/${privateDetail}?secret=${privateDetail}`,
  }));
  await assertFailure(await POST(request()), 502, "PROVIDER_UNAVAILABLE");
  const log = console.warn.mock.calls[0].arguments[1];
  assert.equal(log.providerRedirected, true);
  assert.equal(log.providerResponsePathname, "/confirm/[redacted]");
});

test("success diagnostics omit payloads, cookies, header parameters, credentials and URL secrets", async () => {
  mock.method(globalThis, "fetch", async () => upstreamResponse(JSON.stringify({ success: true, message: privateDetail }), {
    headers: {
      "Content-Type": `Application/JSON; secret=${privateDetail}`,
      "Set-Cookie": `session=${privateDetail}`,
      "X-Token": privateDetail,
    },
    url: `https://user:${privateDetail}@formsubmit.co/ajax/${encodeURIComponent(validInput.email)}/${privateDetail}?token=${privateDetail}#${privateDetail}`,
  }));
  assert.equal((await POST(request())).status, 200);
  assert.deepEqual(console.info.mock.calls[0].arguments, ["[CONTACT_DELIVERY]", {
    code: "PROVIDER_ACCEPTED", providerStatus: 200, providerContentType: "application/json",
    providerRedirected: false, providerRedirectBlocked: false,
    providerResponseOrigin: "https://formsubmit.co", providerResponsePathname: "/ajax/[redacted]/[redacted]",
    providerResponseClassification: "JSON",
  }]);
});

for (const url of ["", "not a URL", `data:text/plain,${privateDetail}`]) {
  test(`unavailable or non-HTTP response URL is omitted: ${url.split(":", 1)[0]}`, async () => {
    mock.method(globalThis, "fetch", async () => upstreamResponse("failure", { url }));
    await assertFailure(await POST(request()), 502, "PROVIDER_INVALID_RESPONSE");
    const log = console.warn.mock.calls[0].arguments[1];
    assert.equal(log.providerResponseOrigin, null);
    assert.equal(log.providerResponsePathname, null);
  });
}

test("HTTP error diagnostics classify the body without leaking it", async () => {
  mock.method(globalThis, "fetch", async () => upstreamResponse(`<html>${privateDetail}</html>`, {
    status: 403, headers: { "Content-Type": "text/html" },
  }));
  await assertFailure(await POST(request()), 502, "PROVIDER_HTTP_ERROR");
  assert.equal(console.warn.mock.calls[0].arguments[1].providerResponseClassification, "HTML");
});

test("body read failure retains safe metadata and the HTTP error mapping", async () => {
  const upstream = upstreamResponse(null, { status: 429, headers: { "Content-Type": "application/json" } });
  upstream.text = async () => { throw new Error(privateDetail); };
  mock.method(globalThis, "fetch", async () => upstream);
  await assertFailure(await POST(request()), 503, "CONTACT_BUSY");
  assert.equal(console.warn.mock.calls[0].arguments[1].providerResponseClassification, "unexpected");
});

// The mocked fetch/body respects AbortSignal just like native fetch. Advance
// timers without waiting 15 or 20 seconds or making any network requests.
function untilAborted(signal) {
  return new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException(privateDetail, "AbortError")), { once: true });
  });
}

test("provider fetch times out at 15 seconds", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let started;
  const ready = new Promise((resolve) => { started = resolve; });
  mock.method(globalThis, "fetch", (_url, options) => { started(); return untilAborted(options.signal); });
  const pending = POST(request());
  await ready;
  t.mock.timers.tick(15000);
  await assertFailure(await pending, 504, "PROVIDER_TIMEOUT");
});

test("provider body reading shares the same deadline", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let started;
  const ready = new Promise((resolve) => { started = resolve; });
  mock.method(globalThis, "fetch", async (_url, options) => ({
    ok: true, status: 200,
    headers: new Headers({ "Content-Type": "application/json" }), url: endpoint, redirected: false,
    text: () => { started(); return untilAborted(options.signal); },
  }));
  const pending = POST(request());
  await ready;
  t.mock.timers.tick(15000);
  await assertFailure(await pending, 504, "PROVIDER_TIMEOUT");
  const log = console.warn.mock.calls[0].arguments[1];
  assert.equal(log.providerStatus, 200);
  assert.equal(log.providerContentType, "application/json");
  assert.equal(log.providerResponseClassification, "unexpected");
});

for (const input of [null, [], {}, { ...validInput, name: "  " }, { ...validInput, email: 12 }, { ...validInput, message: {} }, { ...validInput, name: "Name\r\nInjected" }]) {
  test(`invalid input ${JSON.stringify(input)} never reaches provider`, async () => {
    await assertFailure(await POST(request(input)), 400, "INVALID_INPUT");
    assert.equal(fetch.mock.calls.length, 0);
  });
}

test("invalid sender email never reaches provider", async () => {
  await assertFailure(await POST(request({ ...validInput, email: "invalid-email" })), 400, "INVALID_EMAIL");
  assert.equal(fetch.mock.calls.length, 0);
});

for (const [field, length] of [["name", 101], ["email", 255], ["message", 5001]]) {
  test(`oversized ${field} never reaches provider`, async () => {
    await assertFailure(await POST(request({ ...validInput, [field]: "x".repeat(length) })), 400, "INPUT_TOO_LONG");
    assert.equal(fetch.mock.calls.length, 0);
  });
}

test("malformed request JSON returns 400 rather than 500", async () => {
  await assertFailure(await POST(new Request("http://localhost:3000/api/contact", { method: "POST", body: "{broken" })), 400, "INVALID_JSON");
  assert.equal(fetch.mock.calls.length, 0);
});

test("valid fields are trimmed before forwarding", async () => {
  mock.method(globalThis, "fetch", async (_url, options) => {
    const { name, email, message } = JSON.parse(options.body);
    assert.deepEqual({ name, email, message }, validInput);
    return Response.json({ success: true });
  });
  const padded = Object.fromEntries(Object.entries(validInput).map(([key, value]) => [key, `  ${value}  `]));
  assert.equal((await POST(request(padded))).status, 200);
});

test("browser submission succeeds only on the normalized backend contract", async () => {
  mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "/api/contact");
    assert.deepEqual(JSON.parse(options.body), validInput);
    return Response.json({ success: true });
  });
  assert.deepEqual(await submitContact(validInput), { success: true });
});

for (const [status, data] of [[200, {}], [200, { success: false }], [200, { success: "true" }], [200, { success: true, error: privateDetail }], [500, { success: true }], [502, { error: privateDetail }], [200, { code: "toString" }]]) {
  test(`browser rejects ambiguous backend response ${status} ${JSON.stringify(data)}`, async () => {
    mock.method(globalThis, "fetch", async () => Response.json(data, { status }));
    assert.deepEqual(await submitContact(validInput), { success: false, error: contactErrors.PROVIDER_INVALID_RESPONSE });
  });
}

test("browser uses approved error text and ignores raw provider details", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ success: false, code: "CONTACT_BUSY", error: privateDetail }, { status: 503 }));
  assert.deepEqual(await submitContact(validInput), { success: false, error: contactErrors.CONTACT_BUSY });
});

test("browser handles non-JSON platform responses", async () => {
  mock.method(globalThis, "fetch", async () => new Response(`<html>${privateDetail}</html>`, { status: 502 }));
  const result = await submitContact(validInput);
  assert.deepEqual(result, { success: false, error: contactErrors.PROVIDER_INVALID_RESPONSE });
});

test("browser network failures are safe", async () => {
  mock.method(globalThis, "fetch", async () => { throw new TypeError(privateDetail); });
  assert.deepEqual(await submitContact(validInput), { success: false, error: contactErrors.PROVIDER_UNAVAILABLE });
});

test("browser request times out at 20 seconds", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  mock.method(globalThis, "fetch", (_url, options) => untilAborted(options.signal));
  const pending = submitContact(validInput);
  t.mock.timers.tick(20000);
  assert.deepEqual(await pending, { success: false, error: contactErrors.PROVIDER_TIMEOUT });
});

test("browser rejects invalid input without a request", async () => {
  assert.deepEqual(await submitContact({ ...validInput, message: "  " }), { success: false, error: contactErrors.INVALID_INPUT });
  assert.equal(fetch.mock.calls.length, 0);
});

test("browser response body reading shares the 20 second deadline", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let started;
  const ready = new Promise((resolve) => { started = resolve; });
  mock.method(globalThis, "fetch", async (_url, options) => ({
    ok: true,
    json: () => { started(); return untilAborted(options.signal); },
  }));
  const pending = submitContact(validInput);
  await ready;
  t.mock.timers.tick(20000);
  assert.deepEqual(await pending, { success: false, error: contactErrors.PROVIDER_TIMEOUT });
});

test("browser to actual API route to mocked provider preserves rejection", async () => {
  mock.method(globalThis, "fetch", async (url, options) => {
    if (url === "/api/contact") return POST(new Request("http://localhost:3000/api/contact", options));
    assert.equal(url, endpoint);
    return Response.json({ success: "false", message: privateDetail });
  });
  assert.deepEqual(await submitContact(validInput), { success: false, error: contactErrors.PROVIDER_REJECTED });
});

test("browser to actual API route to mocked provider preserves acceptance", async () => {
  const visited = [];
  mock.method(globalThis, "fetch", async (url, options) => {
    visited.push(url);
    if (url === "/api/contact") return POST(new Request("http://localhost:3000/api/contact", options));
    assert.equal(url, endpoint);
    return Response.json({ success: "true" });
  });
  assert.deepEqual(await submitContact(validInput), { success: true });
  assert.deepEqual(visited, ["/api/contact", endpoint]);
});

test("provider timeout reaches the browser helper before its own deadline", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let started;
  const ready = new Promise((resolve) => { started = resolve; });
  mock.method(globalThis, "fetch", (url, options) => {
    if (url === "/api/contact") return POST(new Request("http://localhost:3000/api/contact", options));
    assert.equal(url, endpoint);
    started();
    return untilAborted(options.signal);
  });
  const pending = submitContact(validInput);
  await ready;
  t.mock.timers.tick(15000);
  assert.deepEqual(await pending, { success: false, error: contactErrors.PROVIDER_TIMEOUT });
});
