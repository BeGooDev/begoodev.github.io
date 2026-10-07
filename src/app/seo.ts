import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { company, getEmail, getPhoneHref, getGithubUrl, getLinkedInUrl, getMaltUrl } from './config';
import { skills } from './data/skills';
import { Article, articleImage, articleImageSizes } from './data/articles';

export const SITE_URL = 'https://begoodev.fr';
const SITE_NAME = 'BeGooDev';
const OG_IMAGE = `${SITE_URL}/img/og-image.png`;

/** SEO fields read from each route's `data`; the page title itself comes from the route's `title`. */
export interface SeoRouteData {
    description?: string;
    /** schema.org type of the page, e.g. 'ProfilePage' (defaults to 'WebPage') */
    pageType?: string;
    noindex?: boolean;
    /** Set (via a resolver) on blog article pages */
    article?: Article;
}

const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Philippe Gibert',
    jobTitle: 'Lead développeur freelance',
    url: `${SITE_URL}/mon-cv`,
    image: `${SITE_URL}/img/photo-profil.jpg`,
    email: `mailto:${getEmail()}`,
    worksFor: { '@id': BUSINESS_ID },
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: "École Nationale d'Ingénieurs de Brest (ENIB)",
    },
    knowsAbout: skills.flatMap((group) => group.items),
    sameAs: [getLinkedInUrl(), getGithubUrl(), getMaltUrl()],
};

const business = {
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: SITE_NAME,
    legalName: `${company.name} ${company.legalForm}`,
    taxID: company.siren.replace(/\s/g, ''),
    vatID: company.vatNumber,
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    image: OG_IMAGE,
    description:
        "Développement, audit de performance et accompagnement technique d'applications web et mobiles, par un lead développeur freelance basé près de Rennes.",
    email: getEmail(),
    telephone: getPhoneHref(),
    foundingDate: '2021',
    founder: { '@id': PERSON_ID },
    address: {
        '@type': 'PostalAddress',
        streetAddress: '11 allée Madame de Sévigné',
        postalCode: '35470',
        addressLocality: 'Bain-de-Bretagne',
        addressRegion: 'Bretagne',
        addressCountry: 'FR',
    },
    areaServed: [
        { '@type': 'City', name: 'Rennes' },
        { '@type': 'AdministrativeArea', name: 'Bretagne' },
        { '@type': 'Country', name: 'France' },
    ],
    knowsLanguage: 'fr',
    sameAs: [getMaltUrl(), getLinkedInUrl()],
};

const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'fr-FR',
    publisher: { '@id': BUSINESS_ID },
};

/**
 * Applies the page's SEO tags on every navigation: title, description, canonical URL,
 * Open Graph / Twitter cards and schema.org JSON-LD. Runs during prerendering too, so
 * crawlers (including AI ones, which don't execute JavaScript) get them in the static HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
    private title = inject(Title);
    private meta = inject(Meta);
    private document = inject(DOCUMENT);

    override updateTitle(snapshot: RouterStateSnapshot) {
        let route = snapshot.root;
        while (route.firstChild) {
            route = route.firstChild;
        }
        const data = route.data as SeoRouteData;
        const title = this.buildTitle(snapshot) ?? SITE_NAME;
        const path = snapshot.url.split(/[?#]/)[0];
        const url = SITE_URL + (path === '/' ? '/' : path);

        this.title.setTitle(title);
        this.setMeta('name', 'description', data.description);
        // max-image-preview:large lets Google show large images (required for Discover)
        this.setMeta('name', 'robots', data.noindex ? 'noindex' : 'max-image-preview:large');
        this.setMeta('property', 'og:title', title);
        this.setMeta('property', 'og:description', data.description);
        this.setMeta('property', 'og:url', data.noindex ? undefined : url);
        this.setMeta('property', 'og:type', data.article ? 'article' : 'website');
        // Set on every page so a client-side navigation away from an article restores the site image
        const [wide] = articleImageSizes;
        const image = data.article ? SITE_URL + articleImage(data.article) : OG_IMAGE;
        this.setMeta('property', 'og:image', image);
        this.setMeta('property', 'og:image:width', data.article ? String(wide.width) : '2400');
        this.setMeta('property', 'og:image:height', data.article ? String(wide.height) : '1260');
        this.setMeta('property', 'og:image:alt', data.article ? data.article.title : 'BeGooDev, lead développeur freelance à Rennes');
        this.setMeta('name', 'twitter:image', image);
        this.setMeta('name', 'twitter:title', title);
        this.setMeta('name', 'twitter:description', data.description);
        this.setCanonical(data.noindex ? undefined : url);

        const page = {
            '@type': data.pageType ?? 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: title,
            description: data.description,
            inLanguage: 'fr-FR',
            isPartOf: { '@id': WEBSITE_ID },
            about: { '@id': data.pageType === 'ProfilePage' ? PERSON_ID : BUSINESS_ID },
            ...(data.pageType === 'ProfilePage' && { mainEntity: { '@id': PERSON_ID } }),
        };
        const article = data.article && {
            '@type': 'BlogPosting',
            '@id': `${url}#article`,
            headline: data.article.title,
            description: data.description,
            articleSection: data.article.category,
            datePublished: data.article.date,
            dateModified: data.article.date,
            inLanguage: 'fr-FR',
            image: articleImageSizes.map(({ ratio }) => SITE_URL + articleImage(data.article!, ratio)),
            author: { '@id': PERSON_ID },
            publisher: { '@id': BUSINESS_ID },
            mainEntityOfPage: { '@id': page['@id'] },
            isPartOf: { '@id': `${SITE_URL}/blog#webpage` },
        };
        const graph = [business, person, website, page, ...(article ? [article] : [])];
        this.setJsonLd(data.noindex ? undefined : { '@context': 'https://schema.org', '@graph': graph });
    }

    private setMeta(attr: 'name' | 'property', key: string, content: string | undefined) {
        const selector = `${attr}="${key}"`;
        if (content) {
            this.meta.updateTag({ [attr]: key, content }, selector);
        } else {
            this.meta.removeTag(selector);
        }
    }

    private setCanonical(url: string | undefined) {
        let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!url) {
            link?.remove();
            return;
        }
        if (!link) {
            link = this.document.createElement('link');
            link.rel = 'canonical';
            this.document.head.appendChild(link);
        }
        link.href = url;
    }

    private setJsonLd(graph: object | undefined) {
        let script = this.document.head.querySelector<HTMLScriptElement>('script#structured-data');
        if (!graph) {
            script?.remove();
            return;
        }
        if (!script) {
            script = this.document.createElement('script');
            script.id = 'structured-data';
            script.type = 'application/ld+json';
            this.document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(graph);
    }
}
