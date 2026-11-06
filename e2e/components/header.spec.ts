import { expect, test } from '@playwright/test';
import { gotoHydrated } from '../hydration';

test.describe('<app-header>', () => {
    test('le logo ramène à l\'accueil', async ({ page }) => {
        await gotoHydrated(page, '/mon-cv');
        await page.locator('app-header').getByRole('link', { name: 'BeGooDev, accueil' }).click();
        await expect(page).toHaveURL(/\/$/);
        await expect(page.locator('app-hero')).toBeVisible();
    });

    test.describe('desktop', () => {
        test.skip(({ isMobile }) => isMobile, 'navigation desktop');

        test('cache le bouton du menu mobile', async ({ page }) => {
            await gotoHydrated(page, '/');
            await expect(page.locator('app-header').getByRole('button')).toBeHidden();
        });

        for (const { name, path } of [
            { name: 'Prestations', path: '/prestations' },
            { name: 'Développement', path: '/development' },
            { name: 'Mon parcours', path: '/mon-cv' },
        ]) {
            test(`« ${name} » navigue vers ${path} sans recharger la page et devient la page courante`, async ({ page }) => {
                await gotoHydrated(page, '/');
                // Marker lost on a full page load: proves the router handled the navigation
                await page.evaluate(() => ((window as unknown as { spa: boolean }).spa = true));

                const link = page.locator('app-header nav').getByRole('link', { name, exact: true }).first();
                await expect(link).not.toHaveAttribute('aria-current');
                await link.click();

                await expect(page).toHaveURL(path);
                await expect(link).toHaveAttribute('aria-current', 'page');
                expect(await page.evaluate(() => (window as unknown as { spa?: boolean }).spa)).toBe(true);
            });
        }
    });

    test.describe('menu mobile', () => {
        test.skip(({ isMobile }) => !isMobile, 'menu mobile uniquement');

        test('s\'ouvre et se ferme avec le bouton', async ({ page }) => {
            await gotoHydrated(page, '/');
            const header = page.locator('app-header');
            const menu = header.locator('#mobile-menu');

            await expect(menu).toHaveAttribute('inert');
            await header.getByRole('button', { name: 'Ouvrir le menu' }).click();

            const closeButton = header.getByRole('button', { name: 'Fermer le menu' });
            await expect(closeButton).toHaveAttribute('aria-expanded', 'true');
            await expect(closeButton).toHaveAttribute('aria-controls', 'mobile-menu');
            await expect(menu.getByRole('link')).toHaveCount(4);
            await expect(menu.getByRole('link', { name: 'Me contacter' })).toBeVisible();

            await closeButton.click();
            await expect(header.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute('aria-expanded', 'false');
            await expect(menu).toHaveAttribute('inert');
        });

        test('se referme après avoir choisi une page', async ({ page }) => {
            await gotoHydrated(page, '/');
            const header = page.locator('app-header');
            await header.getByRole('button', { name: 'Ouvrir le menu' }).click();
            await header.locator('#mobile-menu').getByRole('link', { name: 'Mon parcours' }).click();

            await expect(page).toHaveURL('/mon-cv');
            await expect(header.locator('#mobile-menu')).toHaveAttribute('inert');
            await expect(header.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute('aria-expanded', 'false');
        });

        test('se referme en revenant à l\'accueil par le logo', async ({ page }) => {
            await gotoHydrated(page, '/mon-cv');
            const header = page.locator('app-header');
            await header.getByRole('button', { name: 'Ouvrir le menu' }).click();
            await header.getByRole('link', { name: 'BeGooDev, accueil' }).click();

            await expect(page).toHaveURL(/\/$/);
            await expect(header.locator('#mobile-menu')).toHaveAttribute('inert');
        });
    });
});
