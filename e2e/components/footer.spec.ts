import { expect, test } from '@playwright/test';
import { getEmail, getGithubUrl, getLinkedInUrl, getWhatsAppUrl } from '../../src/app/config';
import { gotoHydrated } from '../hydration';

test.describe('<app-footer>', () => {
    test('les réseaux sociaux ont un nom accessible et le bon lien', async ({ page }) => {
        await gotoHydrated(page, '/');
        const footer = page.locator('app-footer');

        await expect(footer.getByRole('link', { name: 'Email', exact: true })).toHaveAttribute('href', `mailto:${getEmail()}`);
        await expect(footer.getByRole('link', { name: 'Email', exact: true })).not.toHaveAttribute('target');

        for (const { name, href } of [
            { name: 'WhatsApp', href: getWhatsAppUrl() },
            { name: 'LinkedIn', href: getLinkedInUrl() },
            { name: 'GitHub', href: getGithubUrl() },
        ]) {
            const link = footer.getByRole('link', { name, exact: true });
            await expect(link).toHaveAttribute('href', href);
            await expect(link).toHaveAttribute('target', '_blank');
            await expect(link).toHaveAttribute('rel', 'noopener');
        }
    });

    test('les boutons des réseaux sociaux font au moins 44 px (cible tactile)', async ({ page }) => {
        await gotoHydrated(page, '/');
        for (const link of await page.locator('app-footer a[aria-label]').all()) {
            const box = await link.boundingBox();
            expect(box!.width).toBeGreaterThanOrEqual(44);
            expect(box!.height).toBeGreaterThanOrEqual(44);
        }
    });

    test('affiche l\'année en cours', async ({ page }) => {
        await gotoHydrated(page, '/');
        await expect(page.locator('app-footer')).toContainText(`© ${new Date().getFullYear()} BeGooDev`);
    });

    test('« Mentions légales » navigue vers la page dédiée', async ({ page }) => {
        await gotoHydrated(page, '/');
        await page.locator('app-footer').getByRole('link', { name: 'Mentions légales' }).click();
        await expect(page).toHaveURL('/mentions-legales');
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Mentions légales');
    });

    test('est présent sur toutes les pages, y compris la 404', async ({ page }) => {
        await gotoHydrated(page, '/page-inexistante');
        await expect(page.locator('app-footer footer')).toBeVisible();
    });
});
