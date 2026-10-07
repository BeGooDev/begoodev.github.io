import { expect, test } from '@playwright/test';
import { icons } from '../../src/app/components/icon/icons';
import { gotoHydrated } from '../hydration';
import { pages } from '../pages';

test.describe('<app-icon>', () => {
    test.skip(({ isMobile }) => isMobile, 'rendu identique sur mobile');

    for (const path of pages) {
        test(`les icônes de ${path} sont décoratives et viennent du jeu d'icônes`, async ({ page }) => {
            await gotoHydrated(page, path);
            const knownPaths = new Map(Object.values(icons).map((icon) => [icon.path, icon.width]));

            for (const svg of await page.locator('app-icon > svg').all()) {
                await expect(svg).toHaveAttribute('aria-hidden', 'true');
                await expect(svg).toHaveAttribute('focusable', 'false');

                const d = await svg.locator('path').getAttribute('d');
                expect(knownPaths.has(d!), 'tracé connu').toBe(true);
                await expect(svg).toHaveAttribute('viewBox', `0 0 ${knownPaths.get(d!)} 512`);
            }
        });
    }

    test('prend la taille et la couleur du texte (1em, currentColor)', async ({ page }) => {
        await gotoHydrated(page, '/');
        const icon = page.locator('app-footer app-icon').first();
        const svg = icon.locator('svg');
        const fontSize = await icon.evaluate((el) => getComputedStyle(el).fontSize);
        const color = await icon.evaluate((el) => getComputedStyle(el).color);

        await expect(svg).toHaveCSS('height', fontSize);
        await expect(svg).toHaveCSS('fill', color);
    });

    test('affiche l\'icône demandée par le parent', async ({ page }) => {
        await gotoHydrated(page, '/');
        // Footer socials, in order: email, WhatsApp, LinkedIn, GitHub
        const drawn = await page.locator('app-footer app-icon path').evaluateAll((paths) => paths.map((p) => p.getAttribute('d')));
        expect(drawn).toEqual([icons.envelope.path, icons.whatsapp.path, icons.linkedin.path, icons.github.path]);
    });
});
