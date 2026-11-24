import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { actions, answerQuestion, suggestions } from "../src/assistant/knowledge.js";
import { projects } from "../src/portfolio.js";
import { portfolioSeo } from "../portfolio-seo.js";

test("each suggested question returns a documented answer with working actions", () => {
  for (const question of suggestions) {
    const {text, ids} = answerQuestion(question, "chat");
    assert.doesNotMatch(text, /don’t have a documented answer/);
    assert.ok(ids.length && ids.every(id => actions[id]?.href));
  }
  for (const project of projects) {
    assert.ok(answerQuestion(project.name, "chat").text.includes(project.contribution));
  }
  assert.match(answerQuestion("How do you manage server state in React?", "chat").text, /RTK Query/);
});

test("recruiter comparisons distinguish documented tools from unverified ones", () => {
  const {text} = answerQuestion("Docker, Vitest and Kubernetes", "recruiter");
  const [documented, remaining] = text.split("**Relevant projects**");
  assert.match(documented, /Docker/);
  assert.match(documented, /Vitest/);
  assert.doesNotMatch(documented, /Kubernetes/);
  assert.match(remaining, /does not document Kubernetes/);
});

test("each public route generates its own canonical URL and sitemap entry", () => {
  const origin = "https://example.org";
  const plugin = portfolioSeo(origin);
  const assets = {};
  plugin.generateBundle.call({emitFile: asset => { assets[asset.fileName] = asset.source; }});
  for (const route of ["/", "/about/", "/projects/", "/resume/"]) {
    const path = route + "index.html";
    const tags = plugin.transformIndexHtml(readFileSync("." + path, "utf8"), {path});
    assert.equal(tags.find(tag => tag.attrs.rel === "canonical").attrs.href, origin + route);
    assert.ok(assets["sitemap.xml"].includes("<loc>" + origin + route + "</loc>"));
    assert.ok(tags.some(tag => tag.attrs.property === "og:image" && tag.attrs.content.startsWith(origin)));
  }
  assert.ok(assets["robots.txt"].includes(origin + "/sitemap.xml"));
});
