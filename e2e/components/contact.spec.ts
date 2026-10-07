import { expect, test } from '@playwright/test';
import { getEmail, getLinkedInUrl, getMaltUrl, getPhoneHref, getPhoneNum, getWhatsAppUrl } from '../../src/app/config';
import { gotoHydrated } from '../hydration';

test.describe('<app-contact>', () => {
    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page, '/');
    });

    test('est la cible de l\'ancre #contact, avec un titre h2', async ({ page }) => {
        const section = page.locator('app-contact > section');
        await expect(section).toHaveId('contact');
        await expect(section.getByRole('heading', { level: 2 })).toHaveText('Un projet en tête ?');
    });

    test('le lien email ouvre la messagerie, l\'adresse est affichée avec des espaces', async ({ page }) => {
        const email = page.locator('app-contact').getByRole('link', { name: /^Email/ });
        await expect(email).toHaveAttribute('href', `mailto:${getEmail()}`);
        await expect(email).toContainText(getEmail().replace('@', ' @ '));
    });

    test('le téléphone propose d\'appeler ou d\'envoyer un SMS, sans liens imbriqués', async ({ page }) => {
        const contact = page.locator('app-contact');
        await expect(contact).toContainText(getPhoneNum());
        await expect(contact.getByRole('link', { name: 'Appeler' })).toHaveAttribute('href', `tel:${getPhoneHref()}`);
        await expect(contact.getByRole('link', { name: 'Envoyer un SMS' })).toHaveAttribute('href', `sms:${getPhoneHref()}`);
        await expect(contact.locator('a a')).toHaveCount(0);
    });

    for (const { label, href } of [
        { label: 'WhatsApp', href: getWhatsAppUrl() },
        { label: 'LinkedIn', href: getLinkedInUrl() },
        { label: 'Malt', href: getMaltUrl() },
    ]) {
        test(`le lien ${label} s'ouvre dans un nouvel onglet`, async ({ page }) => {
            const link = page.locator('app-contact').getByRole('link', { name: new RegExp(`^${label}`) });
            await expect(link).toHaveAttribute('href', href);
            await expect(link).toHaveAttribute('target', '_blank');
            await expect(link).toHaveAttribute('title', `Contactez-moi par ${label}`);
        });
    }

    test('le logo Malt est décoratif', async ({ page }) => {
        await expect(page.locator('app-contact img')).toHaveAttribute('alt', '');
    });
});
