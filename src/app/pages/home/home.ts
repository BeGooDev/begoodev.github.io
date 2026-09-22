import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Hero } from '../../components/hero/hero';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { Projects } from '../../components/projects/projects';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Contact } from '../../components/contact/contact';

@Component({
    selector: 'app-home',
    imports: [RouterLink, Hero, SectionHeading, Projects, Testimonials, Contact],
    template: `
        <app-hero />

        <section class="container-page py-20">
            <div class="grid items-center gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
                <img
                    class="mx-auto h-64 w-64 rounded-3xl object-cover shadow-xl shadow-slate-200 md:h-80 md:w-80"
                    width="580" height="580"
                    src="/img/photo-profil.jpg"
                    alt="Philippe Gibert, développeur freelance"
                />
                <div>
                    <span class="text-xs font-semibold uppercase tracking-widest text-brand-600">À propos</span>
                    <h2 class="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Développeur freelance depuis plus de 13 ans</h2>
                    <p class="mt-5 text-base leading-relaxed text-slate-600">
                        Je suis développeur web depuis plus de 13 ans, spécialisé dans les applications complexes à
                        fortes charges et les applications mobiles de qualité.
                    </p>
                    <p class="mt-4 text-base leading-relaxed text-slate-600">
                        Je suis très polyvalent&nbsp;! Je suis capable de prendre en charge votre projet dans son
                        ensemble&nbsp;: de l'analyse de votre besoin à la mise en place de l'architecture applicative,
                        en passant par l'optimisation, les tests et le développement. Je porte une grande attention
                        à la qualité du code et au suivi de vos projets.
                    </p>
                    <a routerLink="/" fragment="contact" class="mt-8 inline-flex rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600">
                        Prendre contact
                    </a>
                </div>
            </div>
        </section>

        <section class="bg-slate-50 py-20">
            <div class="container-page">
                <app-section-heading eyebrow="Ce que je peux faire pour vous" title="Mes compétences" />
                <div class="mt-14 grid gap-8 sm:grid-cols-3">
                    <div class="text-center">
                        <img src="/svg/undraw_Web_developer_re_h7ie.svg" alt="" class="mx-auto h-32 w-32" />
                        <p class="mt-6 text-sm leading-relaxed text-slate-600">
                            Je prends en charge le développement de votre application web et mobile en veillant à
                            concevoir une architecture solide et à soigner la qualité du code.
                        </p>
                    </div>
                    <div class="text-center">
                        <img src="/svg/undraw_Code_thinking_re_gka2.svg" alt="" class="mx-auto h-32 w-32" />
                        <p class="mt-6 text-sm leading-relaxed text-slate-600">
                            Votre application est lente&nbsp;? J'analyse votre code et vous conseille sur les bonnes
                            pratiques pour booster vos projets&nbsp;!
                        </p>
                    </div>
                    <div class="text-center">
                        <img src="/svg/undraw_Mobile_apps_re_3wjf.svg" alt="" class="mx-auto h-32 w-32" />
                        <p class="mt-6 text-sm leading-relaxed text-slate-600">
                            Besoin d'un conseil sur les choix technologiques ou sur les outils à mettre en place
                            pour un développement de qualité&nbsp;? Je suis là&nbsp;!
                        </p>
                    </div>
                </div>
                <div class="mt-12 text-center">
                    <a routerLink="/development" class="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-white">
                        Découvrez ma stack
                    </a>
                </div>
            </div>
        </section>

        <section class="container-page py-20">
            <app-section-heading
                eyebrow="Exemples de missions"
                title="Le type de projets que j'aime mener"
                subtitle="Quelques exemples représentatifs des missions que je peux prendre en charge — à personnaliser avec tes propres réalisations."
            />
            <div class="mt-14">
                <app-projects />
            </div>
        </section>

        <section class="bg-slate-50 py-20">
            <div class="container-page">
                <app-section-heading eyebrow="Retours" title="Ce qu'on dit de mon travail" />
                <div class="mt-14">
                    <app-testimonials />
                </div>
            </div>
        </section>

        <app-contact />
    `,
})
export class Home implements OnInit {
    private titleService = inject(Title);

    ngOnInit() {
        this.titleService.setTitle("BeGooDev, Développeur d'applications web et mobiles sur Rennes");
    }
}
