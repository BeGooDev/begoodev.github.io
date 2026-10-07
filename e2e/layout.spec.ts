import { expect, test } from '@playwright/test';
import { pages } from './pages';

test.describe('mise en page mobile', () => {
    test.skip(({ isMobile }) => !isMobile, 'mobile uniquement');

    for (const path of [...pages, '/page-inexistante']) {
        test(`les boutons d'action de ${path} sont centrés`, async ({ page }) => {
            await page.goto(path);
            const viewportCenter = page.viewportSize()!.width / 2;

            // Buttons side by side (e.g. on the 404 page) are centered as a group
            const offsets = await page.locator('main a.rounded-full').evaluateAll((links) => links.map((link) => {
                const group = [...link.parentElement!.children].filter((el) => el.matches('a.rounded-full'));
                const boxes = group.map((el) => el.getBoundingClientRect());
                const left = Math.min(...boxes.map((box) => box.left));
                const right = Math.max(...boxes.map((box) => box.right));
                return { label: link.textContent!.trim(), center: (left + right) / 2 };
            }));

            for (const { label, center } of offsets) {
                expect(Math.abs(center - viewportCenter), `« ${label} »`).toBeLessThanOrEqual(1);
            }
        });
    }
});
