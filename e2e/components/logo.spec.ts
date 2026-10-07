import { expect, test } from '@playwright/test';
import { gotoHydrated } from '../hydration';

// Colors as computed by the browser (see INK and ACCENT in logo.ts)
const WHITE = 'rgb(255, 255, 255)';
const INK_ON_LIGHT = 'rgb(16, 20, 24)';
const GREEN_ON_DARK = 'rgb(34, 197, 94)';
const GREEN_ON_LIGHT = 'rgb(22, 163, 74)';

test.describe('<app-logo>', () => {
    test('affiche le mot-symbole « begoodev_ »', async ({ page }) => {
        await gotoHydrated(page, '/');
        await expect(page.locator('app-header app-logo')).toHaveText('begoodev_');
    });

    for (const { where, variant, ink, accent, height } of [
        { where: 'app-header', variant: 'onLight', ink: INK_ON_LIGHT, accent: GREEN_ON_LIGHT, height: 22 },
        { where: 'app-footer', variant: 'onDark', ink: WHITE, accent: GREEN_ON_DARK, height: 22 },
    ]) {
        test(`variante ${variant} (${where}) : couleurs et taille`, async ({ page }) => {
            await gotoHydrated(page, '/');
            const wordmark = page.locator(`${where} app-logo > span`);
            await expect(wordmark).toHaveCSS('color', ink);
            await expect(wordmark).toHaveCSS('font-size', `${height}px`);
            // "good" and the "_" cursor carry the accent color
            const accents = wordmark.locator('span');
            await expect(accents).toHaveText(['good', '_']);
            for (const part of await accents.all()) {
                await expect(part).toHaveCSS('color', accent);
            }
        });
    }

    test('le logo du hero suit la prop height', async ({ page, isMobile }) => {
        await gotoHydrated(page, '/');
        const visibleLogo = page.locator('app-hero h1 app-logo').nth(isMobile ? 0 : 1);
        await expect(visibleLogo.locator('> span')).toHaveCSS('font-size', isMobile ? '48px' : '64px');
    });
});
