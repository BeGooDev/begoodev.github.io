import { RenderMode, ServerRoute } from '@angular/ssr';
import { allArticles } from './data/articles';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => allArticles.map(({ slug }) => ({ slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
