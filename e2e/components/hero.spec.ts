import { expect, test } from '@playwright/test';
import { gotoHydrated } from '../hydration';

test.describe('<app-hero>', () => {
    test('a un h1 dont le nom accessible décrit l\'activité, sans répéter le logo', async ({ page }) => {
        await gotoHydrated(page, '/');
        const heading = page.locator('app-hero').getByRole('heading', { level: 1 });
        await expect(heading).toHaveAccessibleName('BeGooDev, lead développeur freelance à Rennes');
        await expect(heading.locator('app-logo')).toHaveCount(2);
        for (const logo of await heading.locator('app-logo').all()) {
            await expect(logo).toHaveAttribute('aria-hidden', 'true');
        }
    });

    test('n\'affiche qu\'un des deux logos selon la largeur d\'écran', async ({ page, isMobile }) => {
        await gotoHydrated(page, '/');
        const logos = page.locator('app-hero h1 app-logo');
        await expect(logos.nth(0)).toBeVisible({ visible: isMobile });
        await expect(logos.nth(1)).toBeVisible({ visible: !isMobile });
    });

    test('« Prendre contact » fait défiler jusqu\'à la section contact', async ({ page }) => {
        await gotoHydrated(page, '/');
        await page.locator('app-hero').getByRole('link', { name: 'Prendre contact' }).click();
        await expect(page).toHaveURL(/\/#contact$/);
        await expect(page.locator('app-contact #contact')).toBeInViewport();
    });

    test('« Découvrir mes compétences » mène à /development', async ({ page }) => {
        await gotoHydrated(page, '/');
        await page.locator('app-hero').getByRole('link', { name: 'Découvrir mes compétences' }).click();
        await expect(page).toHaveURL('/development');
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
});
