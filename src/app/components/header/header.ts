import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from '../logo/logo';

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: '/development', label: 'Développement' },
    { href: '/mon-cv', label: 'Mon parcours' },
];

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, Logo],
    template: `
        <header class="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
            <nav class="container-page flex h-16 items-center justify-between" aria-label="Navigation principale">
                <a routerLink="/" class="flex items-center gap-2" (click)="open.set(false)">
                    <app-logo variant="onLight" [height]="24" [compact]="true" class="sm:hidden" />
                    <app-logo variant="onLight" [height]="22" class="hidden sm:inline-block" />
                </a>

                <div class="hidden items-center gap-1 md:flex">
                    @for (link of navLinks; track link.href) {
                        <a
                            [routerLink]="link.href"
                            routerLinkActive="bg-brand-50 text-brand-700"
                            class="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        >
                            {{ link.label }}
                        </a>
                    }
                    <a
                        routerLink="/"
                        fragment="contact"
                        class="ml-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600"
                    >
                        Me contacter
                    </a>
                </div>

                <button
                    type="button"
                    aria-label="Ouvrir le menu"
                    [attr.aria-expanded]="open()"
                    (click)="open.set(!open())"
                    class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full hover:bg-slate-100 md:hidden"
                >
                    <span class="block h-0.5 w-5 bg-slate-700 transition-transform" [class.translate-y-2]="open()" [class.rotate-45]="open()"></span>
                    <span class="block h-0.5 w-5 bg-slate-700 transition-opacity" [class.opacity-0]="open()"></span>
                    <span class="block h-0.5 w-5 bg-slate-700 transition-transform" [class.-translate-y-2]="open()" [class.-rotate-45]="open()"></span>
                </button>
            </nav>

            <div class="overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden" [class.max-h-72]="open()" [class.max-h-0]="!open()" [class.border-t-0]="!open()">
                <div class="container-page flex flex-col gap-1 py-4">
                    @for (link of navLinks; track link.href) {
                        <a
                            [routerLink]="link.href"
                            routerLinkActive="bg-brand-50 text-brand-700"
                            (click)="open.set(false)"
                            class="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            {{ link.label }}
                        </a>
                    }
                    <a
                        routerLink="/"
                        fragment="contact"
                        (click)="open.set(false)"
                        class="mt-1 rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                        Me contacter
                    </a>
                </div>
            </div>
        </header>
    `,
})
export class Header {
    navLinks = navLinks;
    open = signal(false);
}
