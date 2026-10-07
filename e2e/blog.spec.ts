import { expect, test } from '@playwright/test';
import { existsSync } from 'node:fs';
import { allArticles, articleImage, articleImageSizes, articles, drafts } from '../src/app/data/articles';
import { gotoHydrated } from './hydration';

test.describe('blog', () => {
    test('la liste affiche une carte cliquable par article', async ({ page }) => {
        await gotoHydrated(page, '/blog');
        const titles = page.locator('main article').getByRole('heading', { level: 2 });
        await expect(titles).toHaveText(articles.map((article) => article.title));

        await page.locator('main article').first().click({ position: { x: 20, y: 20 } });
        await expect(page).toHaveURL(`/articles/${articles[0].slug}`);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(articles[0].title);
    });

    for (const article of articles) {
        test(`/articles/${article.slug} affiche l'article et ses données structurées`, async ({ page }) => {
            await gotoHydrated(page, `/articles/${article.slug}`);
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(article.title);
            await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');

            const graph = JSON.parse(await page.locator('script#structured-data').textContent() ?? '{}')['@graph'];
            const posting = graph.find((node: { '@type': string }) => node['@type'] === 'BlogPosting');
            expect(posting).toMatchObject({ headline: article.title, datePublished: article.date });
            expect(posting.image).toHaveLength(articleImageSizes.length);
            await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `https://begoodev.fr${articleImage(article)}`);
            await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'max-image-preview:large');
        });
    }

    test('le Markdown est converti dans le HTML prérendu (intertitres, listes, encadré)', async ({ request }) => {
        for (const article of articles) {
            const html = await (await request.get(`/articles/${article.slug}`)).text();
            expect(html).toMatch(/<div class="article-content[^"]*"[^>]*>\s*<p>/);
            expect(html).toContain('<h2>');
            expect(html).toContain('<blockquote>');
            expect(html, 'espace insécable avant « : »').toMatch(/(\u00a0|&nbsp;):/);
        }
    });

    test('« À lire aussi » mène vers un autre article sans recharger la page', async ({ page }) => {
        const [first, second] = articles;
        await gotoHydrated(page, `/articles/${first.slug}`);
        await page.getByRole('link', { name: second.title }).click();
        await expect(page).toHaveURL(`/articles/${second.slug}`);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(second.title);
        await expect(page).toHaveTitle(second.metaTitle);
    });

    for (const draft of drafts) {
        test(`le brouillon /articles/${draft.slug} est consultable mais ni indexé ni listé`, async ({ page, request }) => {
            await gotoHydrated(page, `/articles/${draft.slug}`);
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(draft.title);
            await expect(page.getByText('Brouillon')).toBeVisible();
            await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
            await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);

            await gotoHydrated(page, '/blog');
            await expect(page.getByRole('link', { name: draft.title })).toHaveCount(0);
            expect(await (await request.get('/sitemap.xml')).text()).not.toContain(draft.slug);
        });
    }

    test('chaque article a ses images de partage (sinon : pnpm images:articles)', () => {
        for (const article of allArticles) {
            for (const { ratio } of articleImageSizes) {
                expect(existsSync(`public${articleImage(article, ratio)}`), articleImage(article, ratio)).toBe(true);
            }
        }
    });

    test('le sitemap date chaque article de sa publication', async ({ request }) => {
        const sitemap = await (await request.get('/sitemap.xml')).text();
        for (const article of articles) {
            expect(sitemap).toContain(`<loc>https://begoodev.fr/articles/${article.slug}</loc>\n\t\t<lastmod>${article.date}</lastmod>`);
        }
    });

    test('revenir d\'un article à l\'accueil remet l\'image de partage du site', async ({ page }) => {
        await gotoHydrated(page, `/articles/${articles[0].slug}`);
        await page.locator('app-header').getByRole('link', { name: 'BeGooDev, accueil' }).click();
        await expect(page).toHaveURL(/\/$/);
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://begoodev.fr/img/og-image.png');
        await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    });

    test('llms.txt liste chaque article publié, sans les brouillons', async ({ request }) => {
        const llms = await (await request.get('/llms.txt')).text();
        expect(llms).not.toContain('<!--');
        for (const article of articles) {
            expect(llms).toContain(`(https://begoodev.fr/articles/${article.slug}): `);
        }
        for (const draft of drafts) {
            expect(llms).not.toContain(draft.slug);
        }
    });

    test('un article inexistant affiche la page 404', async ({ page }) => {
        await page.goto('/articles/article-inexistant');
        await expect(page).toHaveTitle(/introuvable/);
    });
});
