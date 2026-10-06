import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { pages } from './pages';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

for (const path of [...pages, '/page-inexistante']) {
    test(`${path} n'a aucune violation axe (WCAG 2.2 AA)`, async ({ page }) => {
        await page.goto(path);
        const results = await new AxeBuilder({ page })
            .withTags(WCAG_TAGS)
            // Logotypes are exempt from contrast requirements (WCAG 1.4.3)
            .exclude('app-logo')
            .analyze();

        const summary = results.violations.map((v) => `${v.id} (${v.impact}) : ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
        expect(summary).toEqual([]);
    });
}

for (const path of ['/', '/mon-cv']) {
    test(`le lien d'évitement mène au contenu principal de ${path}`, async ({ page }) => {
        await page.goto(path);
        await page.keyboard.press('Tab');
        const skipLink = page.getByRole('link', { name: 'Aller au contenu' });
        await expect(skipLink).toBeFocused();
        await expect(skipLink).toBeInViewport();
        await page.keyboard.press('Enter');
        await expect(page.locator('#main_content')).toBeFocused();
        // With <base href="/">, a plain "#main_content" link would navigate to /#main_content
        expect(new URL(page.url()).pathname).toBe(path);
    });
}

test('la navigation annonce la page courante', async ({ page, isMobile }) => {
    test.skip(isMobile, 'navigation desktop');
    await page.goto('/mon-cv');
    await expect(page.locator('header').getByRole('link', { name: 'Mon parcours' }).first()).toHaveAttribute('aria-current', 'page');
});

test('le menu mobile n\'est atteignable au clavier qu\'une fois ouvert', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'menu mobile uniquement');
    await page.goto('/');
    const menuButton = page.getByRole('button', { name: 'Ouvrir le menu' });
    const menuLink = page.locator('#mobile-menu').getByRole('link', { name: 'Mon parcours' });

    await expect(page.locator('#mobile-menu')).toHaveAttribute('inert');
    await menuButton.focus();
    await page.keyboard.press('Tab');
    await expect(menuLink).not.toBeFocused();

    await menuButton.click();
    await expect(page.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#mobile-menu')).not.toHaveAttribute('inert');
    await expect(menuLink).toBeInViewport();
    await page.keyboard.press('Tab');
    await expect(page.locator('#mobile-menu').getByRole('link').first()).toBeFocused();
});

test('« Me contacter » fait défiler jusqu\'au contact même au deuxième clic', async ({ page, isMobile }) => {
    test.skip(isMobile, 'lien du menu desktop');
    await page.goto('/');
    const contactLink = page.locator('header').getByRole('link', { name: 'Me contacter' }).first();
    const contactSection = page.locator('#contact');

    await contactLink.click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(contactSection).toBeInViewport();

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(contactSection).not.toBeInViewport();
    await contactLink.click();
    await expect(contactSection).toBeInViewport();
});
