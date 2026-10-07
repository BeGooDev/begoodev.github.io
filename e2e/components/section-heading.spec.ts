import { expect, test } from '@playwright/test';
import { gotoHydrated } from '../hydration';

test.describe('<app-section-heading>', () => {
    test.skip(({ isMobile }) => isMobile, 'rendu identique sur mobile');

    test('affiche le sur-titre, le titre en h2 et le sous-titre', async ({ page }) => {
        await gotoHydrated(page, '/');
        const heading = page.locator('app-section-heading').filter({ hasText: 'Quelques réalisations' });
        await expect(heading.getByRole('heading', { level: 2 })).toHaveText('Quelques réalisations');
        await expect(heading.getByText('Réalisations', { exact: true })).toBeVisible();
        await expect(heading.locator('p')).toHaveText(/^Des projets concrets/);
    });

    test('n\'affiche pas de paragraphe vide sans sous-titre', async ({ page }) => {
        await gotoHydrated(page, '/');
        const heading = page.locator('app-section-heading').filter({ hasText: 'Mes compétences' });
        await expect(heading.locator('p')).toHaveCount(0);
    });

    test('est centré par défaut', async ({ page }) => {
        await gotoHydrated(page, '/');
        const block = page.locator('app-section-heading').filter({ hasText: 'Mes compétences' }).locator('> div');
        await expect(block).toHaveCSS('text-align', 'center');
    });

    test('est aligné à gauche avec [center]="false"', async ({ page }) => {
        await gotoHydrated(page, '/mon-cv');
        const block = page.locator('app-section-heading').filter({ hasText: 'Mon parcours' }).locator('> div');
        await expect(block).toHaveCSS('text-align', 'start');
    });
});
