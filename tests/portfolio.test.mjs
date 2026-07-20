import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete portfolio and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Aarav Shah — Systems in Motion<\/title>/i);
  assert.match(html, /Different systems\. One mindset: disciplined improvement\./);
  assert.match(html, /FTC Team 31053/);
  assert.match(html, /Past performance\. Personal research project\. Not financial advice/);
  assert.match(html, /mailto:aaraven99@gmail\.com/);
  assert.match(html, /linkedin\.com\/in\/aarav-shah-eng/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("keeps content centralized and accessibility fallbacks present", async () => {
  const [page, content, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(page, /from "\.\/content"/);
  assert.match(content, /chapters:/);
  assert.match(content, /metrics:/);
  assert.match(content, /projects:/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /focus-visible/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
