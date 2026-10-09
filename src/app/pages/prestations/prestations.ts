import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { Projects } from '../../components/projects/projects';
import { faq, services } from '../../data/prestations';

@Component({
    selector: 'app-prestations',
    imports: [RouterLink, SectionHeading, Projects],
    template: `
        <section class="relative overflow-hidden bg-slate-900 pt-32 pb-16 text-center text-white">
            <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"></div>
            <div class="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>

            <div class="container-page relative">
                <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">Prestations</span>
                <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">Développeur freelance à Rennes&nbsp;: mes prestations</h1>
                <p class="mx-auto mt-4 max-w-2xl text-slate-300">
                    Développement, audit de performance et lead technique de vos applications web et mobiles,
                    à Rennes, en Bretagne et à distance partout en France.
                </p>
                <nav class="mt-10 flex flex-wrap justify-center gap-3" aria-label="Prestations">
                    @for (service of services; track service.id) {
                        <a
                            routerLink="/prestations"
                            [fragment]="service.id"
                            class="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            {{ service.name }}
                        </a>
                    }
                </nav>
            </div>
        </section>

        @for (service of services; track service.id; let odd = $odd) {
            <section [id]="service.id" class="scroll-mt-20 py-16" [class.bg-slate-50]="odd">
                <div class="container-page mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-[200px_1fr]">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 sm:text-3xl">{{ service.name }}</h2>
                        <p class="mt-4 text-base leading-relaxed text-slate-600">{{ service.summary }}</p>
                        <ul class="mt-6 space-y-3 text-sm leading-relaxed text-slate-600">
                            @for (detail of service.details; track detail) {
                                <li class="flex items-start gap-3">
                                    <span class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400"></span>
                                    {{ detail }}
                                </li>
                            }
                        </ul>
                    </div>
                    <img [src]="service.illustration" alt="" width="200" height="200" class="mx-auto h-40 w-40 sm:order-first sm:h-48 sm:w-48" />
                </div>
            </section>
        }

        <section class="bg-slate-50 py-16">
            <div class="container-page">
                <app-section-heading
                    eyebrow="Réalisations"
                    title="Des exemples concrets"
                    subtitle="Ces prestations, je les ai mises en œuvre sur des projets variés."
                />
                <div class="mt-14">
                    <app-projects />
                </div>
                <div class="mt-12 text-center">
                    <a routerLink="/development" class="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-white">
                        Voir toute ma stack technique
                    </a>
                </div>
            </div>
        </section>

        <section class="container-page py-16">
            <app-section-heading eyebrow="FAQ" title="Questions fréquentes" />
            <div class="mx-auto mt-12 max-w-3xl divide-y divide-slate-100">
                @for (item of faq; track item.question) {
                    <div class="py-6">
                        <h3 class="text-lg font-semibold text-slate-900">{{ item.question }}</h3>
                        <p class="mt-2 text-base leading-relaxed text-slate-600">{{ item.answer }}</p>
                    </div>
                }
            </div>
        </section>

        <section class="bg-slate-900 py-16 text-center text-white">
            <div class="container-page">
                <h2 class="text-2xl font-bold text-white sm:text-3xl">Un projet en tête&nbsp;?</h2>
                <p class="mx-auto mt-3 max-w-xl text-slate-300">
                    Parlons de votre application et de la façon dont je peux vous accompagner.
                </p>
                <a routerLink="/" fragment="contact" class="mt-8 inline-flex rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-700">
                    Me contacter
                </a>
            </div>
        </section>
    `,
})
export class Prestations {
    services = services;
    faq = faq;
}
