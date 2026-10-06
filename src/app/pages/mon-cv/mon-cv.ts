import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { Timeline } from '../../components/timeline/timeline';
import { Icon } from '../../components/icon/icon';
import { IconName } from '../../components/icon/icons';

@Component({
    selector: 'app-mon-cv',
    imports: [RouterLink, SectionHeading, Timeline, Icon],
    template: `
        <section class="relative overflow-hidden bg-slate-900 pt-32 pb-16 text-center text-white">
            <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"></div>
            <div class="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>

            <div class="container-page relative">
                <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">Parcours</span>
                <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">Plus de 15&nbsp;ans à faire du développement mon métier</h1>
                <p class="mx-auto mt-4 max-w-2xl text-slate-300">
                    De mes débuts en 2009 à mon activité de freelance aujourd'hui, un parcours guidé par la
                    curiosité technique et le goût du travail bien fait.
                </p>

                <dl class="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
                    @for (fact of facts; track fact.label) {
                        <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm">
                            <dt class="sr-only">{{ fact.label }}</dt>
                            <dd>
                                <app-icon [name]="fact.icon" class="text-brand-300" />
                                <span class="mt-2 block text-2xl font-bold">{{ fact.value }}</span>
                                <span class="mt-1 block text-xs text-slate-400" aria-hidden="true">{{ fact.label }}</span>
                            </dd>
                        </div>
                    }
                </dl>
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
                    Je suis toujours partant pour échanger sur votre projet et voir comment je pourrais vous accompagner.
                </p>
                <a routerLink="/" fragment="contact" class="mt-8 inline-flex rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-700">
                    Me contacter
                </a>
            </div>
        </section>
    `,
})
export class MonCv {
    facts: { icon: IconName; value: string; label: string }[] = [
        { icon: 'code', value: '15+ ans', label: "d'expérience en développement" },
        { icon: 'graduation-cap', value: 'Ingénieur', label: 'diplômé de l\'ENIB' },
        { icon: 'rocket', value: '2021', label: 'création de BeGooDev' },
        { icon: 'users', value: 'Lead dev', label: "sur un projet de l'État" },
    ];
}
