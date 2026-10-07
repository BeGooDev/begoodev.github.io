import { Component, isDevMode } from '@angular/core';
import { RouterLink } from '@angular/router';
import { allArticles, articles, readingTime, formatDate } from '../../data/articles';

@Component({
    selector: 'app-blog',
    imports: [RouterLink],
    template: `
        <section class="relative overflow-hidden bg-slate-900 pt-32 pb-16 text-center text-white">
            <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"></div>
            <div class="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>

            <div class="container-page relative">
                <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">Blog</span>
                <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">Réussir un projet, au-delà du code</h1>
                <p class="mx-auto mt-4 max-w-2xl text-slate-300">
                    Organisation, communication, adoption&nbsp;: des retours d'expérience concrets pour les
                    dirigeants et les équipes qui lancent un projet numérique.
                </p>
            </div>
        </section>

        <section class="container-page max-w-3xl py-16">
            <ul class="space-y-6">
                @for (article of articles; track article.slug) {
                    <li>
                        <article class="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100 transition-shadow hover:shadow-lg hover:shadow-slate-200 sm:p-8">
                            <p class="text-xs font-semibold uppercase tracking-wide text-brand-600">
                                @if (article.draft) {
                                    <span class="mr-2 rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">Brouillon</span>
                                }
                                {{ article.category }}
                                <span class="text-slate-400" aria-hidden="true">&nbsp;·&nbsp;</span>
                                <span class="font-medium normal-case tracking-normal text-slate-500">
                                    <time [attr.datetime]="article.date">{{ formatDate(article.date) }}</time>
                                    · {{ readingTime(article) }}&nbsp;min de lecture
                                </span>
                            </p>
                            <h2 class="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
                                <!-- The whole card is clickable through the stretched link's ::after -->
                                <a [routerLink]="['/articles', article.slug]" class="after:absolute after:inset-0 after:rounded-2xl hover:text-brand-700 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-brand-600">
                                    {{ article.title }}
                                </a>
                            </h2>
                            <p class="mt-3 text-base leading-relaxed text-slate-600">{{ article.description }}</p>
                            <p class="mt-4 text-sm font-semibold text-brand-700" aria-hidden="true">Lire l'article →</p>
                        </article>
                    </li>
                }
            </ul>
        </section>
    `,
})
export class Blog {
    // Drafts are listed only under ng serve, never in the production build
    articles = isDevMode() ? allArticles : articles;
    readingTime = readingTime;
    formatDate = formatDate;
}
