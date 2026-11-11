const fs = require("fs");
const path = require("path");

const browserDir = path.join(__dirname, "..", "dist", "begoodev", "browser");

// GitHub Pages serves this file for any unmatched path. It's the same CSR
// shell used for client-only routes, so the Angular router boots up,
// reads the real URL and renders the NotFound component itself.
fs.copyFileSync(
    path.join(browserDir, "index.csr.html"),
    path.join(browserDir, "404.html"),
);

console.log("✅ 404.html generated from index.csr.html");

// GitHub Pages answers /mon-cv with a 301 to /mon-cv/ when mon-cv/ is a folder, but
// serves mon-cv.html directly (200). Flatten each prerendered route so the URLs used in
// canonicals, the sitemap and internal links resolve without a redirect.
const { routes } = JSON.parse(
    fs.readFileSync(path.join(browserDir, "..", "prerendered-routes.json"), "utf8"),
);
for (const route of Object.keys(routes).filter((route) => route !== "/")) {
    const dir = path.join(browserDir, route);
    fs.renameSync(path.join(dir, "index.html"), `${dir}.html`);
    fs.rmdirSync(dir);
}

console.log("✅ Prerendered routes flattened to <route>.html");

// List the published blog articles in llms.txt, in the blog's order. Read from the prerendered
// pages, so drafts (absent from /blog) are left out and titles never drift from the articles.
const llmsPath = path.join(browserDir, "llms.txt");
const blogHtml = fs.readFileSync(path.join(browserDir, "blog.html"), "utf8");
const slugs = [...new Set([...blogHtml.matchAll(/href="\/articles\/([^"]+)"/g)].map((match) => match[1]))];
const articleLines = slugs.map((slug) => {
    const html = fs.readFileSync(path.join(browserDir, "articles", `${slug}.html`), "utf8");
    const graph = JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1])["@graph"];
    const { headline, description } = graph.find((node) => node["@type"] === "BlogPosting");
    const text = (value) => value.replace(/ /g, " ");
    return `- [${text(headline)}](https://begoodev.fr/articles/${slug}): ${text(description)}`;
});
const llms = fs.readFileSync(llmsPath, "utf8");
const marker = /<!-- articles :.*-->\n/;
if (!marker.test(llms)) {
    throw new Error("llms.txt: marqueur <!-- articles : … --> introuvable");
}
fs.writeFileSync(llmsPath, llms.replace(marker, `${articleLines.join("\n")}\n`));

console.log(`✅ llms.txt: ${articleLines.length} articles listed`);
