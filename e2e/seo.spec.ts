import { existsSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { pages } from './pages';

const SITE_URL = 'https://begoodev.fr';

/** Reads the raw prerendered HTML, as a crawler that doesn't run JavaScript (most AI bots) gets it. */
async function staticHtml(request: import('@playwright/test').APIRequestContext, path: string) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    return response.text();
}

const attr = (html: string, pattern: RegExp) => html.match(pattern)?.[1];

test.describe('SEO du HTML statique', () => {
    // Static HTML checks don't depend on the viewport
    test.skip(({ isMobile }) => isMobile);

    for (const path of pages) {
        test(`${path} a les balises SEO et le JSON-LD attendus`, async ({ request }) => {
            const html = await staticHtml(request, path);

            const title = attr(html, /<title>([^<]*)<\/title>/);
            expect(title?.length, `titre « ${title} »`).toBeGreaterThanOrEqual(20);
            expect(title?.length, `titre « ${title} »`).toBeLessThanOrEqual(65);

            const description = attr(html, /<meta name="description" content="([^"]*)"/);
            expect(description?.length, 'description').toBeGreaterThanOrEqual(70);
            expect(description?.length, 'description').toBeLessThanOrEqual(160);

            const url = SITE_URL + path;
            expect(attr(html, /<link rel="canonical" href="([^"]*)"/)).toBe(url);
            expect(attr(html, /<meta property="og:url" content="([^"]*)"/)).toBe(url);
            expect(html).toContain('property="og:title"');
            expect(html).toContain('property="og:description"');
            expect(html).not.toContain('name="keywords"');

            expect(html.match(/<h1[\s>]/g), 'un seul h1').toHaveLength(1);

            const jsonLd = attr(html, /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
            expect(jsonLd, 'JSON-LD présent').toBeTruthy();
            const types = JSON.parse(jsonLd!)['@graph'].map((node: { '@type': string }) => node['@type']);
            expect(types).toEqual(expect.arrayContaining(['ProfessionalService', 'Person', 'WebSite']));
            expect(types.some((type: string) => type.endsWith('Page'))).toBe(true);
        });
    }

    test('titres et descriptions sont uniques', async ({ request }) => {
        const heads = await Promise.all(pages.map((path) => staticHtml(request, path)));
        const titles = heads.map((html) => attr(html, /<title>([^<]*)<\/title>/));
        const descriptions = heads.map((html) => attr(html, /<meta name="description" content="([^"]*)"/));
        expect(new Set(titles).size).toBe(pages.length);
        expect(new Set(descriptions).size).toBe(pages.length);
    });

    test('/prestations publie ses services et sa FAQ en JSON-LD', async ({ request }) => {
        const html = await staticHtml(request, '/prestations');
        const graph = JSON.parse(attr(html, /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)!)['@graph'];
        const business = graph.find((node: { '@type': string }) => node['@type'] === 'ProfessionalService');
        expect(business.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0);

        const page = graph.find((node: { '@type': string }) => node['@type'] === 'FAQPage');
        expect(page.mainEntity.length).toBeGreaterThan(0);
        // Every question of the JSON-LD must be visible on the page (Google's structured data guidelines)
        for (const question of page.mainEntity) {
            expect(html).toContain(question.name);
        }
    });

    test('og:image, robots.txt, sitemap.xml et llms.txt sont servis', async ({ request }) => {
        const html = await staticHtml(request, '/');
        const ogImage = attr(html, /<meta property="og:image" content="https:\/\/begoodev\.fr([^"]*)"/);
        expect((await request.get(ogImage!)).ok(), `og:image ${ogImage}`).toBe(true);

        expect(await staticHtml(request, '/robots.txt')).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
        expect(await staticHtml(request, '/llms.txt')).toMatch(/^# BeGooDev/);

        const sitemap = await staticHtml(request, '/sitemap.xml');
        for (const path of pages) {
            expect(sitemap).toContain(`<loc>${SITE_URL}${path}</loc>`);
        }
    });

    test('les favicons déclarés sont servis, dont un multiple de 48 px (exigé par Google)', async ({ request }) => {
        const html = await staticHtml(request, '/');
        const icons = [...html.matchAll(/<link rel="icon"[^>]*>/g)].map((m) => ({
            href: attr(m[0], /href="([^"]*)"/)!,
            sizes: attr(m[0], /sizes="(\d+)x\d+"/),
        }));
        for (const { href } of icons) {
            expect((await request.get(href)).ok(), href).toBe(true);
        }
        expect(icons.some(({ sizes }) => sizes && Number(sizes) % 48 === 0)).toBe(true);
    });

    test('chaque page est un fichier <route>.html (GitHub Pages redirige les dossiers en 301)', () => {
        const dist = 'dist/begoodev/browser';
        for (const path of pages.filter((path) => path !== '/')) {
            expect(existsSync(`${dist}${path}.html`), `${path}.html`).toBe(true);
            expect(existsSync(`${dist}${path}`), `dossier ${path}/`).toBe(false);
        }
    });

    test('la page 404 n\'est pas indexable', async ({ page }) => {
        await page.goto('/page-inexistante');
        await expect(page).toHaveTitle(/introuvable/);
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
        await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    });

    test('/contact redirige vers la section contact', async ({ page }) => {
        await page.goto('/contact');
        await expect(page).toHaveURL(/\/#contact$/);
    });
});
