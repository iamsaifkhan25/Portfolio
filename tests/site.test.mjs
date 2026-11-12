import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { afterEach, test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const originalContext = process.env.CONTEXT;
afterEach(() => {
  if (originalContext === undefined) delete process.env.CONTEXT;
  else process.env.CONTEXT = originalContext;
});

function load(relativePath, dependencies = {}) {
  const source = readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  runInNewContext(outputText, { exports, process, URL, require: (name) => {
    assert.ok(name in dependencies, `Unexpected dependency ${name}`);
    return dependencies[name];
  } });
  return exports;
}

for (const context of [undefined, "production", "dev", "branch-deploy", "deploy-preview"]) {
  test(`indexing and production URLs for Netlify context ${String(context)}`, () => {
    if (context === undefined) delete process.env.CONTEXT;
    else process.env.CONTEXT = context;
    const site = load("src/lib/site.ts");
    assert.equal(site.isPreviewDeploy, context === "branch-deploy" || context === "deploy-preview");
    assert.equal(site.siteUrl, "https://saifkhans.netlify.app");
    for (const route of ["/projects", "/resume", "/contact"]) {
      const metadata = site.pageMetadata("Example", "Description", route);
      assert.equal(metadata.alternates.canonical, `https://saifkhans.netlify.app${route}`);
      assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
      assert.equal(metadata.twitter.title, metadata.openGraph.title);
      assert.equal(metadata.openGraph.images[0].url, "https://saifkhans.netlify.app/opengraph-image");
      assert.equal(metadata.openGraph.images[0].alt, site.socialImageAlt);
      assert.equal(metadata.twitter.images[0].url, metadata.openGraph.images[0].url);
    }
    const robots = load("src/app/robots.ts", { "@/lib/site": site }).default();
    assert.equal(robots.rules.allow, "/");
    assert.equal(robots.sitemap, site.isPreviewDeploy ? undefined : "https://saifkhans.netlify.app/sitemap.xml");
    const sitemap = load("src/app/sitemap.ts", { "@/lib/site": site }).default();
    assert.equal(JSON.stringify(sitemap.map(({ url }) => url)), JSON.stringify([
      "https://saifkhans.netlify.app", "https://saifkhans.netlify.app/projects",
      "https://saifkhans.netlify.app/resume", "https://saifkhans.netlify.app/contact",
    ]));
  });
}
