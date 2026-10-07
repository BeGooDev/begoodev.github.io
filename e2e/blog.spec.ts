import { expect, test } from '@playwright/test';
import { articles, drafts } from '../src/app/data/articles';
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
        });
    }

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
