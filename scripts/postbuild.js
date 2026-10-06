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
