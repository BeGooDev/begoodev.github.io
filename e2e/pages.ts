import { articles } from '../src/app/data/articles';

/** Indexable pages of the site; keep in sync with app.routes.ts (the sitemap lists every prerendered route). */
export const pages = ['/', '/development', '/mon-cv', '/blog', ...articles.map((article) => `/articles/${article.slug}`), '/mentions-legales'];
