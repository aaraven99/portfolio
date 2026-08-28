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
  assert.match(html, /og:title[^>]+Aarav Shah — Systems in Motion/);
  assert.doesNotMatch(html, /Quantitative Finance Collection|Ten quantitative-finance systems/);
  assert.match(html, /Different systems\. One mindset: disciplined improvement\./);
  assert.match(html, /FTC Team 31053/);
  assert.match(html, /PLTW Introduction to Engineering Design EOC/);
  assert.match(html, /Distinguished · May 2026 · Panther Creek High School/);
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
  assert.doesNotMatch(page, /PORTFOLIO VALUE|TIME →|DataTrace/);
  assert.doesNotMatch(page, /RELATIVE SIGNAL STRENGTH|SCAN \/ FILTER \/ VALIDATE|HUMAN IN THE LOOP/);
  assert.doesNotMatch(page, /ON THE SYSTEM|OFF THE SYSTEM|OPEN TO EXPLORING|quantProjects|Quant Backtesting Lab/);
  assert.doesNotMatch(page, /explore-wheel/);
  assert.match(content, /Precision, consistency, and teamwork under pressure\./);
  assert.match(content, /Recognized among the top quarter of competitors\./);
  assert.match(content, /chapters:/);
  assert.match(content, /metrics:/);
  assert.match(content, /projects:/);
  assert.match(content, /leadRoles:/);
  assert.match(page, /portfolio\.leadRoles\.map/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /focus-visible/);
  assert.match(css, /background:rgba\(16,18,15,\.94\)/);
  assert.doesNotMatch(page, /SystemVisual|RobotBlueprint|trace-bars/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
