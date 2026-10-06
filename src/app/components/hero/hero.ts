import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../logo/logo';

@Component({
    selector: 'app-hero',
    imports: [RouterLink, Logo],
    template: `
        <section class="relative overflow-hidden bg-slate-900 pt-32 pb-24 text-white">
            <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"></div>
            <div class="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>

            <div class="container-page relative flex flex-col items-center text-center">
                <span class="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-slate-300">
                    Développeur freelance · Rennes &amp; alentours
                </span>

                <h1 class="mt-8">
                    <app-logo variant="onDark" [height]="48" class="sm:hidden" aria-hidden="true" />
                    <app-logo variant="onDark" [height]="64" class="hidden sm:inline" aria-hidden="true" />
                    <span class="sr-only">BeGooDev, lead développeur freelance à Rennes</span>
                </h1>

                <p class="mt-6 max-w-2xl text-lg font-medium text-slate-300 sm:text-xl">
                    Plus de 15&nbsp;ans d'expérience pour concevoir, fiabiliser et faire évoluer vos applications web, en renfort ou en lead de votre équipe.
                </p>

                <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                    <a routerLink="/" fragment="contact" class="rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700">
                        Prendre contact
                    </a>
                    <a routerLink="/development" class="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                        Découvrir mes compétences
                    </a>
                </div>
            </div>
        </section>
    `,
})
export class Hero {}
