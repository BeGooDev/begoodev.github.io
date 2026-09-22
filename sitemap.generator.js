const fs = require("fs");
const path = require("path");

const baseUrl = "https://begoodev.fr";
const outputDir = path.join(__dirname, "dist", "begoodev", "browser");
const today = new Date().toISOString().slice(0, 10);

const routes = ["/", "/development", "/mon-cv"];

const urls = routes
    .map(
        (route) => `
	<url>
		<loc>${baseUrl}${route}</loc>
		<lastmod>${today}</lastmod>
	</url>`,
    )
    .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="sitemap.xsl" type="text/xsl" ?>
<urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`;

fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml generated!");
