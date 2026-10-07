import { inject } from '@angular/core';
import { CanMatchFn, ResolveFn, Router, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Development } from './pages/development/development';
import { MonCv } from './pages/mon-cv/mon-cv';
import { NotFound } from './pages/not-found/not-found';
import { Legal } from './pages/legal/legal';
import { Blog } from './pages/blog/blog';
import { Article } from './pages/article/article';
import { Article as ArticleData, findArticle } from './data/articles';
import { SeoRouteData } from './seo';

const articleExists: CanMatchFn = (_route, segments) => !!findArticle(segments[1]?.path ?? '');
// articleExists guarantees the article exists when these resolvers run
const articleOf = (slug: string | null) => findArticle(slug ?? '')!;
const articleTitle: ResolveFn<string> = (route) => articleOf(route.paramMap.get('slug')).metaTitle;
const articleData: ResolveFn<ArticleData> = (route) => articleOf(route.paramMap.get('slug'));
const articleDescription: ResolveFn<string> = (route) => articleOf(route.paramMap.get('slug')).description;

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
        path: 'blog',
        component: Blog,
        title: 'Blog : réussir un projet, au-delà du code – BeGooDev',
        data: {
            description:
                "Organisation, démos, validation, adoption : des retours d'expérience concrets pour réussir un projet numérique, sans jargon technique.",
            pageType: 'CollectionPage',
        } satisfies SeoRouteData,
    },
    {
        path: 'articles/:slug',
        component: Article,
        // Unknown slugs fall through to the 404 page
        canMatch: [articleExists],
        title: articleTitle,
        resolve: { article: articleData, description: articleDescription },
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
