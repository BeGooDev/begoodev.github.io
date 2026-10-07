import { expect, test } from '@playwright/test';
import { experience } from '../../src/app/data/experience';
import { gotoHydrated } from '../hydration';

test.describe('<app-timeline>', () => {
    test.skip(({ isMobile }) => isMobile, 'rendu identique sur mobile');

    test('est une liste ordonnée avec une étape par période', async ({ page }) => {
        await gotoHydrated(page, '/mon-cv');
        const steps = page.locator('app-timeline > ol > li');
        await expect(steps).toHaveCount(experience.length);
        await expect(page.locator('app-timeline').getByRole('heading', { level: 3 })).toHaveText(experience.map((step) => step.title));
    });

    for (const [index, step] of experience.entries()) {
        test(`étape « ${step.title} » (${step.year})`, async ({ page }) => {
            await gotoHydrated(page, '/mon-cv');
            // Some titles repeat across periods: steps are matched by position
            const item = page.locator('app-timeline > ol > li').nth(index);

            await expect(item).toContainText(step.year);
            await expect(item).toContainText(step.place);
            await expect(item).toContainText(step.description);

            // Stack chips: only rendered when the step has a stack
            const stack = item.locator('> ul:not(.space-y-4) > li');
            await expect(stack).toHaveText(step.stack ?? []);

            const missions = item.getByRole('heading', { level: 4 });
            await expect(missions).toHaveText((step.missions ?? []).map((mission) => mission.title));
            for (const mission of step.missions ?? []) {
                const card = item.locator('li').filter({ has: page.getByRole('heading', { level: 4, name: mission.title }) });
                await expect(card).toContainText(mission.period);
                await expect(card).toContainText(mission.description);
                await expect(card.locator('ul > li')).toHaveText(mission.stack ?? []);
            }
        });
    }
});
