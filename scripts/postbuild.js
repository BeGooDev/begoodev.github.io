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
