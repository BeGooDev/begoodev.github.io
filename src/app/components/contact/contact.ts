import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icons';
import { getEmail, getEmailWithSpaces, getLinkedInUrl, getMaltUrl, getPhoneHref, getPhoneNum, getWhatsAppUrl } from '../../config';

interface SecondaryMethod {
    label: string;
    icon?: IconName;
    image?: string;
    badge: string;
    value: string;
    href: string;
    smsHref?: string;
    external?: boolean;
}

@Component({
    selector: 'app-contact',
    imports: [NgTemplateOutlet, Icon],
    template: `
        <section id="contact" class="scroll-mt-20 bg-slate-900 py-20 text-white">
            <div class="container-page text-center">
                <span class="text-xs font-semibold uppercase tracking-widest text-brand-300">Me contacter</span>
                <h2 class="mt-2 text-3xl font-bold text-white sm:text-4xl">Un projet en tête&nbsp;?</h2>
                <p class="mx-auto mt-4 max-w-xl text-slate-300">
                    Actuellement en mission à temps plein, je reste à l'écoute de vos projets&nbsp;: parlons-en pour préparer une future collaboration.
                </p>
            </div>

            <div class="container-page mt-12">
                <div class="mx-auto max-w-2xl space-y-4">
                    <a
                        [href]="'mailto:' + email"
                        title="Envoyez-moi un email"
                        class="flex flex-col items-center gap-3 rounded-2xl bg-brand-600 p-8 text-center text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 sm:flex-row sm:text-left"
                    >
                        <span class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                            <app-icon name="envelope" class="text-2xl" />
                        </span>
                        <span>
                            <span class="block text-lg font-semibold">Email</span>
                            <span class="block text-sm">{{ emailWithSpaces }}</span>
                        </span>
                    </a>

                    <div class="grid gap-4 sm:grid-cols-2">
                        @for (method of secondaryMethods; track method.label) {
                            @if (method.smsHref) {
                                <div class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <ng-container [ngTemplateOutlet]="methodContent" [ngTemplateOutletContext]="{ method: method }" />
                                </div>
                            } @else {
                                <a
                                    [href]="method.href"
                                    [target]="method.external ? '_blank' : null"
                                    [title]="'Contactez-moi par ' + method.label"
                                    class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                                >
                                    <ng-container [ngTemplateOutlet]="methodContent" [ngTemplateOutletContext]="{ method: method }" />
                                </a>
                            }
                        }
                    </div>
                </div>
            </div>
        </section>

        <ng-template #methodContent let-method="method">
            <span class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full {{ method.badge }}">
                @if (method.image) {
                    <img [src]="method.image" alt="" class="h-6 w-6" />
                } @else {
                    <app-icon [name]="method.icon" class="text-xl" />
                }
            </span>
            <span class="min-w-0">
                <span class="block text-base font-semibold text-white">{{ method.label }}</span>
                <span class="block text-sm text-slate-400">{{ method.value }}</span>
                @if (method.smsHref) {
                    <span class="mt-1 flex gap-4 text-sm font-semibold">
                        <a [href]="method.href" class="inline-block py-1 text-brand-300 hover:text-brand-200">Appeler</a>
                        <a [href]="method.smsHref" class="inline-block py-1 text-slate-300 hover:text-white">Envoyer un SMS</a>
                    </span>
                }
            </span>
        </ng-template>
    `,
})
export class Contact {
    email = getEmail();
    emailWithSpaces = getEmailWithSpaces();

    secondaryMethods: SecondaryMethod[] = [
        {
            label: 'Téléphone',
            icon: 'phone',
            badge: 'bg-phone/10 text-phone',
            value: getPhoneNum(),
            href: `tel:${getPhoneHref()}`,
            smsHref: `sms:${getPhoneHref()}`,
        },
        {
            label: 'WhatsApp',
            icon: 'whatsapp',
            badge: 'bg-whatsapp/10 text-whatsapp',
            value: 'Écrivez-moi',
            href: getWhatsAppUrl(),
            external: true,
        },
        {
            label: 'LinkedIn',
            icon: 'linkedin',
            badge: 'bg-linkedin/10 text-linkedin',
            value: 'Connectons-nous',
            href: getLinkedInUrl(),
            external: true,
        },
        {
            label: 'Malt',
            image: '/svg/malt-logo.svg',
            badge: 'bg-malt',
            value: 'Une mission à proposer',
            href: getMaltUrl(),
            external: true,
        },
    ];
}
