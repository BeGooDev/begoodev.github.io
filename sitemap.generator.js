const fs = require("fs");
const path = require("path");

const baseUrl = "https://begoodev.fr";
const outputDir = path.join(__dirname, "dist", "begoodev", "browser");
const today = new Date().toISOString().slice(0, 10);

const htmlOf = (route) => fs.readFileSync(path.join(outputDir, route === "/" ? "index.html" : `${route}.html`), "utf8");

/** An article's dateModified, read from its JSON-LD; undefined for other pages. */
const articleDate = (html) => {
    const jsonLd = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
    return jsonLd && JSON.parse(jsonLd)["@graph"].find((node) => node["@type"] === "BlogPosting")?.dateModified;
};

// Every prerendered page, blog articles included, except redirects and noindex pages (drafts)
const redirects = ["/contact"];
const pages = Object.keys(
    JSON.parse(fs.readFileSync(path.join(outputDir, "..", "prerendered-routes.json"), "utf8")).routes,
)
    .filter((route) => !redirects.includes(route))
    .map((route) => ({ route, html: htmlOf(route) }))
    .filter(({ html }) => !html.includes('<meta name="robots" content="noindex"'))
    .map(({ route, html }) => ({ route, lastmod: articleDate(html) }));

// Articles keep their own date, the blog takes its latest article's, other pages the build date
const latestArticle = pages.map((page) => page.lastmod).filter(Boolean).sort().at(-1);
for (const page of pages) {
    page.lastmod ??= page.route === "/blog" && latestArticle ? latestArticle : today;
}

const urls = pages
    .map(
        ({ route, lastmod }) => `
	<url>
		<loc>${baseUrl}${route}</loc>
		<lastmod>${lastmod}</lastmod>
	</url>`,
    )
    .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="sitemap.xsl" type="text/xsl" ?>
<urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`;

fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml generated!");
