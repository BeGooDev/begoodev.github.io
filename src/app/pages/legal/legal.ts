import { Component } from '@angular/core';
import { company, getEmail, getPhoneNum } from '../../config';

@Component({
    selector: 'app-legal',
    template: `
        <section class="bg-slate-900 pt-32 pb-16 text-center text-white">
            <div class="container-page">
                <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">Informations légales</span>
                <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">Mentions légales</h1>
            </div>
        </section>

        <div class="container-page max-w-3xl space-y-12 py-16 text-base leading-relaxed text-slate-600">
            <section>
                <h2 class="text-2xl font-bold">Éditeur du site</h2>
                <dl class="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
                    <dt class="font-semibold text-slate-900">Raison sociale</dt>
                    <dd>{{ company.name }}, {{ company.legalForm }}@if (company.shareCapital) { au capital de {{ company.shareCapital }}}</dd>
                    <dt class="font-semibold text-slate-900">Siège social</dt>
                    <dd>{{ company.address }}</dd>
                    <dt class="font-semibold text-slate-900">Immatriculation</dt>
                    <dd>{{ company.rcs }} — SIRET {{ company.siret }}</dd>
                    <dt class="font-semibold text-slate-900">TVA intracommunautaire</dt>
                    <dd>{{ company.vatNumber }}</dd>
                    <dt class="font-semibold text-slate-900">Directeur de la publication</dt>
                    <dd>{{ company.manager }}, gérant</dd>
                    <dt class="font-semibold text-slate-900">Contact</dt>
                    <dd>
                        <a [href]="'mailto:' + email" class="text-brand-700 underline underline-offset-4">{{ email }}</a>
                        — <a [href]="'tel:' + phoneHref" class="text-brand-700 underline underline-offset-4">{{ phone }}</a>
                    </dd>
                </dl>
            </section>

            <section>
                <h2 class="text-2xl font-bold">Hébergement</h2>
                <p class="mt-4">
                    Le site est hébergé par GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street,
                    San Francisco, CA 94107, États-Unis —
                    <a href="https://github.com" class="text-brand-700 underline underline-offset-4">github.com</a>.
                </p>
            </section>

            <section>
                <h2 class="text-2xl font-bold">Données personnelles et cookies</h2>
                <p class="mt-4">
                    Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience ni de traceur
                    publicitaire. Aucune donnée personnelle n'est collectée lors de la navigation.
                </p>
                <p class="mt-4">
                    Si vous me contactez par email ou par téléphone, les informations que vous transmettez sont
                    utilisées uniquement pour répondre à votre demande et ne sont jamais cédées à des tiers.
                    Conformément au RGPD, vous pouvez demander à tout moment l'accès, la rectification ou la
                    suppression de ces données en écrivant à
                    <a [href]="'mailto:' + email" class="text-brand-700 underline underline-offset-4">{{ email }}</a>.
                    Vous pouvez également adresser une réclamation à la
                    <a href="https://www.cnil.fr" class="text-brand-700 underline underline-offset-4">CNIL</a>.
                </p>
                <p class="mt-4">
                    L'hébergeur GitHub peut enregistrer des journaux techniques (dont l'adresse IP) pour assurer
                    la sécurité et le bon fonctionnement du service.
                </p>
            </section>

            <section>
                <h2 class="text-2xl font-bold">Propriété intellectuelle</h2>
                <p class="mt-4">
                    Les textes, le logo et la mise en page de ce site sont la propriété de {{ company.name }}.
                    Toute reproduction sans autorisation préalable est interdite. Les illustrations proviennent
                    de <a href="https://undraw.co" class="text-brand-700 underline underline-offset-4">unDraw</a>,
                    sous leur licence libre.
                </p>
            </section>
        </div>
    `,
})
export class Legal {
    company = company;
    email = getEmail();
    phone = getPhoneNum();
    phoneHref = this.phone.replace(/\s/g, '');
}
