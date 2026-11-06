import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Development } from './pages/development/development';
import { MonCv } from './pages/mon-cv/mon-cv';
import { NotFound } from './pages/not-found/not-found';
import { Legal } from './pages/legal/legal';
import { Prestations } from './pages/prestations/prestations';
import { faq } from './data/prestations';
import { SeoRouteData } from './seo';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'BeGooDev – Lead développeur freelance à Rennes',
        data: {
            description:
                "Lead développeur freelance près de Rennes, 15+ ans d'expérience : conception, audit de performance et évolution de vos applications web et mobiles.",
        } satisfies SeoRouteData,
    },
    {
        path: 'prestations',
        component: Prestations,
        title: 'Développeur freelance à Rennes\u00a0: prestations – BeGooDev',
        data: {
            description:
                "Développement web et mobile, audit de performance et lead technique\u00a0: un développeur freelance à Rennes pour vos applications Angular, Java et PHP.",
            pageType: 'FAQPage',
            faq,
        } satisfies SeoRouteData,
    },
    {
        path: 'development',
        component: Development,
        title: 'Compétences et stack technique – BeGooDev',
        data: {
            description:
                'Java/Spring Boot, PHP/Laravel, Angular, React, SQL, Tailwind/DSFR, Playwright, CI/CD GitLab et GitHub : les technologies que je maîtrise.',
        } satisfies SeoRouteData,
    },
    {
        path: 'mon-cv',
        component: MonCv,
        title: 'Parcours de Philippe Gibert, lead développeur – BeGooDev',
        data: {
            description:
                "Ingénieur ENIB, développeur depuis 2009, freelance depuis 2021 et lead développeur sur un projet numérique de l'État : mon parcours en détail.",
            pageType: 'ProfilePage',
        } satisfies SeoRouteData,
    },
    {
        path: 'mentions-legales',
        component: Legal,
        title: 'Mentions légales – BeGooDev',
        data: {
            description:
                "Mentions légales du site BeGooDev : éditeur, hébergement, données personnelles (aucun cookie) et propriété intellectuelle.",
        } satisfies SeoRouteData,
    },
    { path: 'contact', redirectTo: () => inject(Router).createUrlTree(['/'], { fragment: 'contact' }) },
    {
        path: '**',
        component: NotFound,
        title: 'Page introuvable – BeGooDev',
        data: { noindex: true } satisfies SeoRouteData,
    },
];
