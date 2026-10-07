import { expect, test } from '@playwright/test';
import { articles } from '../src/app/data/articles';
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

    test('un article inexistant affiche la page 404', async ({ page }) => {
        await page.goto('/articles/article-inexistant');
        await expect(page).toHaveTitle(/introuvable/);
    });
});
