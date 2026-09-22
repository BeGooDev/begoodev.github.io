import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { skills } from '../../data/skills';

@Component({
    selector: 'app-development',
    imports: [RouterLink, SectionHeading],
    template: `
        <section class="bg-slate-900 pt-32 pb-16 text-center text-white">
            <div class="container-page">
                <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">Développement d'applications</span>
                <h1 class="mt-2 text-4xl font-bold sm:text-5xl">Les compétences que j'ai à vous offrir</h1>
            </div>
        </section>

        <section class="container-page py-16">
            <div class="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-[1fr_220px]">
                <div class="space-y-4 text-base leading-relaxed text-slate-600">
                    <p>
                        Développeur depuis 2009, j'ai travaillé dans des environnements variés, le plus souvent
                        dans des équipes de petite taille, où il a toujours fallu s'adapter en fonction des
                        besoins, développer de nouvelles compétences et apprendre de nouvelles choses.
                    </p>
                    <p>
                        Mon profil polyvalent et mes capacités d'adaptation me permettent de m'acclimater à
                        l'environnement de travail de votre équipe. Je suis également un excellent intermédiaire
                        technique pour faciliter les échanges entre les différentes spécialités qui composent
                        votre entreprise.
                    </p>
                </div>
                <img src="/svg/undraw_Developer_activity_re_39tg.svg" alt="Mes compétences" class="mx-auto h-48 w-48" />
            </div>
        </section>

        <section class="bg-slate-50 py-16">
            <div class="container-page">
                <app-section-heading eyebrow="Stack technique" title="Voici les technologies que je maîtrise" />
                <div class="mt-14 grid gap-6 sm:grid-cols-3">
                    @for (group of skills; track group.category) {
                        <div class="rounded-2xl bg-white p-6 shadow-sm shadow-slate-100">
                            <h3 class="text-lg font-semibold text-slate-900">{{ group.category }}</h3>
                            <hr class="my-4 border-slate-100" />
                            <ul class="space-y-2 text-sm text-slate-600">
                                @for (item of group.items; track item) {
                                    <li class="flex items-start gap-2">
                                        <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400"></span>
                                        {{ item }}
                                    </li>
                                }
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </section>

        <section class="container-page py-16 text-center">
            <p class="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                J'aime apprendre de nouvelles choses, en fonction de vos besoins mais aussi de mes envies&nbsp;!
                Savoir s'adapter à de nouveaux langages, de nouveaux frameworks ou de nouveaux outils fait partie
                de ma philosophie. Je n'hésiterai donc pas à enrichir cette liste.
            </p>
            <a routerLink="/" fragment="contact" title="Contactez-moi" class="mt-8 inline-flex rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600">
                Alors, contactez-moi&nbsp;!
            </a>
        </section>
    `,
})
export class Development implements OnInit {
    skills = skills;
    private titleService = inject(Title);
    private meta = inject(Meta);

    ngOnInit() {
        this.titleService.setTitle('BeGooDev - Mes compétences en développement');
        this.meta.updateTag({ name: 'keywords', content: 'php,java,angular,javascript' });
    }
}
