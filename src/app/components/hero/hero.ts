import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Slogan, slogans } from '../../config';
import { Logo } from '../logo/logo';

const accentStyles: Record<string, { blob: string; text: string }> = {
    blue: { blob: 'bg-accent-blue', text: 'text-accent-blue' },
    navy: { blob: 'bg-accent-navy', text: 'text-accent-navy' },
    pink: { blob: 'bg-accent-pink', text: 'text-accent-pink' },
    green: { blob: 'bg-accent-green', text: 'text-accent-green' },
    orange: { blob: 'bg-accent-orange', text: 'text-accent-orange' },
};

@Component({
    selector: 'app-hero',
    imports: [RouterLink, Logo],
    template: `
        <section class="relative overflow-hidden bg-slate-900 pt-32 pb-24 text-white">
            <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"></div>
            <div class="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-20 blur-3xl transition-colors duration-1000 {{ accent().blob }}"></div>

            <div class="container-page relative flex flex-col items-center text-center">
                <span class="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-slate-300">
                    Développeur freelance · Rennes &amp; alentours
                </span>

                <h1 class="mt-8">
                    <app-logo variant="onDark" [height]="64" />
                </h1>

                <p class="mt-6 max-w-2xl text-lg font-medium transition-colors duration-700 sm:text-xl {{ accent().text }}">
                    {{ slogan().text }}
                </p>

                <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                    <a routerLink="/" fragment="contact" class="rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400">
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
export class Hero implements OnInit, OnDestroy {
    slogan = signal<Slogan>(slogans[0]);
    private intervalId?: ReturnType<typeof setInterval>;

    accent() {
        return accentStyles[this.slogan().accent];
    }

    ngOnInit() {
        this.intervalId = setInterval(() => {
            const others = slogans.filter((s) => s !== this.slogan());
            this.slogan.set(others[Math.floor(Math.random() * others.length)]);
        }, 5000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }
}
