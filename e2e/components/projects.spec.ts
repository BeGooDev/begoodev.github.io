import { expect, test } from '@playwright/test';
import { projects } from '../../src/app/data/projects';
import { gotoHydrated } from '../hydration';

test.describe('<app-projects>', () => {
    test('affiche une carte par réalisation, avec un titre h3', async ({ page }) => {
        await gotoHydrated(page, '/');
        const titles = page.locator('app-projects').getByRole('heading', { level: 3 });
        await expect(titles).toHaveText(projects.map((project) => project.title));
    });

    test('chaque carte affiche le contexte, la stack et la description', async ({ page }) => {
        await gotoHydrated(page, '/');
        for (const project of projects) {
            const card = page.locator('app-projects > div > div').filter({ has: page.getByRole('heading', { name: project.title }) });
            await expect(card).toContainText(project.context);
            await expect(card).toContainText(project.stack);
            await expect(card).toContainText(project.description);
            await expect(card.locator('app-icon')).toHaveCount(1);
        }
    });

    test('passe sur plusieurs colonnes sur grand écran', async ({ page, isMobile }) => {
        await gotoHydrated(page, '/');
        const cards = page.locator('app-projects > div > div');
        const [first, second] = await Promise.all([cards.nth(0).boundingBox(), cards.nth(1).boundingBox()]);
        // Side by side on desktop, stacked on mobile
        expect(first!.y === second!.y).toBe(!isMobile);
    });
});
