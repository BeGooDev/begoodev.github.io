import { expect, Page } from '@playwright/test';

/**
 * Opens a prerendered page and waits for Angular to hydrate it: until then the static HTML is
 * shown but event listeners (menu button, router links) aren't attached yet.
 * Hydration removes the `ngh` attribute the prerenderer puts on each component host.
 */
export async function gotoHydrated(page: Page, path: string) {
    await page.goto(path);
    await expect(page.locator('[ngh]')).toHaveCount(0);
}
