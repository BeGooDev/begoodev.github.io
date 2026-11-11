// Generates each article's share image (Open Graph, Google Discover) in the three ratios Google
// recommends, with the article's title in the site's colors: pnpm images:articles [--force]
// Existing images are kept unless --force, so a hand-made image can replace a generated one.
// Uses Playwright's Chromium (PLAYWRIGHT_CHROMIUM_PATH to point to another binary).
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { allArticles, articleImageSizes } from '../src/app/data/articles.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'img', 'articles');
const force = process.argv.includes('--force');
// Inlined: a page loaded with setContent can't read file:// URLs
const font = (pkg, file) =>
    `data:font/woff2;base64,${readFileSync(join(root, 'node_modules', '@fontsource', pkg, 'files', file)).toString('base64')}`;
const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const page = (article, { width, height }) => `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
    @font-face { font-family: Sora; font-weight: 700; src: url(${font('sora', 'sora-latin-700-normal.woff2')}); }
    @font-face { font-family: Inter; font-weight: 600; src: url(${font('inter', 'inter-latin-600-normal.woff2')}); }
    @font-face { font-family: 'Space Grotesk'; font-weight: 700; src: url(${font('space-grotesk', 'space-grotesk-latin-700-normal.woff2')}); }
    * { margin: 0; box-sizing: border-box; }
    body {
        width: ${width}px; height: ${height}px; overflow: hidden; position: relative;
        display: flex; flex-direction: column; justify-content: space-between; padding: ${height > 700 ? 96 : 72}px 88px;
        background: #0f172a; color: #fff; font-family: Inter, sans-serif;
    }
    .grid { position: absolute; inset: 0; opacity: .12; background-image: radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px); background-size: 32px 32px; }
    .glow { position: absolute; top: -260px; right: -160px; width: 640px; height: 640px; border-radius: 50%; background: #6c63ff; opacity: .35; filter: blur(120px); }
    .logo { position: relative; font: 700 44px 'Space Grotesk', sans-serif; letter-spacing: -.01em; }
    .logo span { color: #22c55e; }
    main { position: relative; }
    .category { font-size: 26px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #aca3ff; }
    h1 { margin-top: 20px; font: 700 ${width === height ? 76 : 68}px/1.12 Sora, sans-serif; letter-spacing: -.01em; text-wrap: balance; }
    footer { position: relative; font-size: 26px; font-weight: 600; color: #cbd5e1; }
</style></head>
<body>
    <div class="grid"></div><div class="glow"></div>
    <div class="logo">be<span>good</span>ev<span>_</span></div>
    <main><p class="category">${escape(article.category)}</p><h1>${escape(article.title)}</h1></main>
    <footer>Philippe Gibert · Lead développeur freelance</footer>
</body></html>`;

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined });
for (const article of allArticles) {
    for (const size of articleImageSizes) {
        const file = join(outDir, `${article.slug}-${size.ratio}.png`);
        if (existsSync(file) && !force) continue;
        const tab = await browser.newPage({ viewport: { width: size.width, height: size.height } });
        await tab.setContent(page(article, size));
        await tab.evaluate(() => document.fonts.ready);
        await tab.screenshot({ path: file });
        await tab.close();
        console.log(`✅ ${file.slice(root.length + 1)}`);
    }
}
await browser.close();
