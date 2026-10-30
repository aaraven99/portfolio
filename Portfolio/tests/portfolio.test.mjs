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
  assert.match(html, /<title>Aarav Shah \| Robotics, Markets &amp; Music<\/title>/i);
  assert.match(html, /og:title[^>]+Aarav Shah \| Robotics, Markets &amp; Music/);
  assert.doesNotMatch(html, /I work across code, capital, machines, music, and community/);
  assert.match(html, /FTC Team 24290/);
  assert.match(html, /Robo Rulers/);
  assert.match(html, /A Python scanner for swing-trading setups/);
  assert.match(html, /Not indicative of future results/);
  assert.match(html, /Awards &amp; Recognition/);
  assert.match(html, /Youth Finance First/);
  assert.match(html, /AP-heavy coursework/);
  assert.match(html, /John Wooden/);
  assert.doesNotMatch(html, /interview transcript/);
  assert.doesNotMatch(html, /Systems in Motion|CHAPTERS|01 \/ INTRO|02 \/ BUILD|03 \/ TRADE|06 \/ FUTURE/);
  assert.doesNotMatch(html, /DEVELOPMENT LOG|FIELD NOTES|Always improving the system|© /);
  assert.doesNotMatch(html, /FTX Combobulators|FTC Team 31053/);
  assert.match(html, /Not indicative of future results/);
  assert.match(html, /mailto:aaraven99@gmail\.com/);
  assert.match(html, /linkedin\.com\/in\/aarav-shah-tx/);
  assert.match(html, /github\.com\/aaraven99/);
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
  assert.match(content, /Precision you can hear\./);
  assert.match(content, /Top 25%/);
  assert.match(content, /skills:/);
  assert.match(content, /metrics:/);
  assert.match(content, /projects:/);
  assert.match(content, /leadRoles:/);
  assert.match(page, /portfolio\.leadRoles\.map/);
  assert.match(page, /aria-expanded=\{isOpen\}/);
  assert.match(page, /Market research process/);
  assert.match(page, /skill-marquee-row/);
  assert.match(page, /updatePlaybackRate\(rate\)/);
  assert.doesNotMatch(page, /motionPaused|Pause motion|Resume motion/);
  assert.doesNotMatch(css, /animation-duration:\s*150s/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /focus-visible/);
  assert.match(css, /scroll-hint/);
  assert.match(css, /skill-bubble\[aria-expanded="true"\]/);
  assert.doesNotMatch(page, /ChapterHeader|CHAPTERS|DEVELOPMENT LOG|FIELD NOTES/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
