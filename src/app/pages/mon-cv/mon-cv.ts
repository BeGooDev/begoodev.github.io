import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { Timeline } from '../../components/timeline/timeline';

@Component({
    selector: 'app-mon-cv',
    imports: [RouterLink, SectionHeading, Timeline],
    template: `
        <section class="bg-slate-900 pt-32 pb-16 text-center text-white">
            <div class="container-page">
                <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">Parcours</span>
                <h1 class="mt-2 text-4xl font-bold sm:text-5xl">13 ans à faire du développement mon métier</h1>
                <p class="mx-auto mt-4 max-w-2xl text-slate-300">
                    De mes débuts en 2009 à mon activité de freelance aujourd'hui, un parcours guidé par la
                    curiosité technique et le goût du travail bien fait.
                </p>
            </div>
        </section>

        <section class="container-page py-16">
            <app-section-heading eyebrow="Étapes clés" title="Mon parcours" [center]="false" />
            <div class="mt-12">
                <app-timeline />
            </div>
        </section>

        <section class="bg-slate-50 py-16 text-center">
            <div class="container-page">
                <h2 class="text-2xl font-bold text-slate-900 sm:text-3xl">Envie d'en discuter&nbsp;?</h2>
                <p class="mx-auto mt-3 max-w-xl text-slate-600">
                    Je suis disponible pour échanger sur votre projet et voir comment je peux vous accompagner.
                </p>
                <a routerLink="/" fragment="contact" class="mt-8 inline-flex rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600">
                    Me contacter
                </a>
            </div>
        </section>
    `,
})
export class MonCv implements OnInit {
    private titleService = inject(Title);

    ngOnInit() {
        this.titleService.setTitle('BeGooDev - Mon parcours');
    }
}
