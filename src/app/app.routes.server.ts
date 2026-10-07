import { RenderMode, ServerRoute } from '@angular/ssr';
import { articles } from './data/articles';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => articles.map(({ slug }) => ({ slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
