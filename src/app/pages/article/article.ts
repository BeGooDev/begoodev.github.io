import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article as ArticleData, articles, readingTime, formatDate } from '../../data/articles';

@Component({
    selector: 'app-article',
    imports: [RouterLink],
    template: `
        @if (article(); as article) {
            <article>
                <header class="relative overflow-hidden bg-slate-900 pt-32 pb-16 text-white">
                    <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"></div>
                    <div class="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>

                    <div class="container-page relative max-w-3xl">
                        @if (article.draft) {
                            <p class="mb-6 rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                                Brouillon&nbsp;: cet article n'est pas encore publié ni référencé.
                            </p>
                        }
                        <nav aria-label="Fil d'Ariane">
                            <a routerLink="/blog" class="inline-block py-1 text-sm text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-white">← Tous les articles</a>
                        </nav>
                        <p class="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-300">{{ article.category }}</p>
                        <h1 class="mt-2 text-3xl font-bold text-white sm:text-5xl">{{ article.title }}</h1>
                        <p class="mt-6 text-sm text-slate-300">
                            Philippe Gibert ·
                            <time [attr.datetime]="article.date">{{ formatDate(article.date) }}</time>
                            · {{ readingTime(article) }}&nbsp;min de lecture
                        </p>
                    </div>
                </header>

                <!-- HTML generated at build time from content/articles/*.md (scripts/articles.mjs) -->
                <div class="article-content container-page max-w-3xl py-16" [innerHTML]="article.html"></div>
            </article>

            @if (others().length) {
                <section class="bg-slate-50 py-16">
                    <div class="container-page max-w-3xl">
                        <h2 class="text-2xl font-bold text-slate-900">À lire aussi</h2>
                        <ul class="mt-6 space-y-3">
                            @for (other of others(); track other.slug) {
                                <li>
                                    <a [routerLink]="['/articles', other.slug]" class="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">{{ other.title }}</a>
                                </li>
                            }
                        </ul>
                    </div>
                </section>
            }

            <section class="py-16 text-center">
                <div class="container-page">
                    <h2 class="text-2xl font-bold text-slate-900 sm:text-3xl">Un projet à lancer ou à remettre sur les rails&nbsp;?</h2>
                    <p class="mx-auto mt-3 max-w-xl text-slate-600">
                        Parlons de votre contexte et de la manière dont je pourrais vous accompagner.
                    </p>
                    <a routerLink="/" fragment="contact" class="mt-8 inline-flex rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-700">
                        Me contacter
                    </a>
                </div>
            </section>
        }
    `,
})
export class Article {
    private data = toSignal(inject(ActivatedRoute).data);
    article = computed(() => this.data()?.['article'] as ArticleData | undefined);
    others = computed(() => articles.filter((other) => other.slug !== this.article()?.slug));
    readingTime = readingTime;
    formatDate = formatDate;
}
