const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const baseUrl = "https://begoodev.fr";
const outputDir = path.join(__dirname, "dist", "begoodev", "browser");
const today = new Date().toISOString().slice(0, 10);

// Each route with the sources its content comes from. Google only trusts <lastmod> when it
// is accurate, so it's the date of the last commit touching them, not the build date.
const shared = ["src/app/components", "src/app/seo.ts", "src/app/config.ts"];
const routes = {
    "/": ["src/app/pages/home", "src/app/data/prestations.ts", "src/app/data/projects.ts"],
    "/prestations": ["src/app/pages/prestations", "src/app/data/prestations.ts", "src/app/data/projects.ts"],
    "/development": ["src/app/pages/development", "src/app/data/skills.ts"],
    "/mon-cv": ["src/app/pages/mon-cv", "src/app/data/experience.ts"],
    "/mentions-legales": ["src/app/pages/legal"],
};

/** Date (YYYY-MM-DD) of the last commit touching these paths; today if git can't tell (e.g. uncommitted work). */
function lastModified(paths) {
    try {
        const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], { encoding: "utf8" }).trim();
        return date || today;
    } catch {
        return today;
    }
}

const urls = Object.entries(routes)
    .map(
        ([route, sources]) => `
	<url>
		<loc>${baseUrl}${route}</loc>
		<lastmod>${lastModified([...sources, ...shared])}</lastmod>
	</url>`,
    )
    .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="sitemap.xsl" type="text/xsl" ?>
<urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`;

fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml generated!");
