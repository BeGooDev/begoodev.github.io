import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getEmail, getGithubUrl, getLinkedInUrl, getPseudo, getTwitterUrl } from '../../config';
import { Logo } from '../logo/logo';

interface Social {
    href: string;
    icon: string;
    label: string;
    external: boolean;
}

@Component({
    selector: 'app-footer',
    imports: [Logo, RouterLink],
    template: `
        <footer class="border-t border-white/10 bg-slate-900 text-slate-300">
            <div class="container-page flex flex-col items-center gap-6 py-14 text-center">
                <app-logo variant="onDark" [height]="22" class="opacity-90" />

                <div class="flex items-center gap-3">
                    @for (s of socials; track s.icon) {
                        <a
                            [href]="s.href"
                            [target]="s.external ? '_blank' : null"
                            [attr.rel]="s.external ? 'noopener' : null"
                            [title]="s.label"
                            [attr.aria-label]="s.label"
                            class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-500"
                        >
                            <i class="fa {{ s.icon }} text-lg" aria-hidden="true"></i>
                        </a>
                    }
                </div>

                <div class="text-sm text-slate-400">
                    <p>
                        Fait avec <span aria-hidden="true">❤️</span> par
                        <a [href]="twitterUrl" target="_blank" rel="noopener" class="text-slate-200 underline decoration-slate-600 underline-offset-4 hover:text-white">{{ pseudo }}</a>
                    </p>
                    <p class="mt-1">
                        Illustrations :
                        <a href="https://undraw.co" target="_blank" rel="noopener" class="text-slate-200 underline decoration-slate-600 underline-offset-4 hover:text-white">undraw.co</a>
                    </p>
                    <p class="mt-4 text-xs text-slate-400">
                        © {{ year }} BeGooDev — Philippe Gibert ·
                        <a routerLink="/mentions-legales" class="inline-block py-1 underline decoration-slate-600 underline-offset-4 hover:text-white">Mentions légales</a>
                    </p>
                </div>
            </div>
        </footer>
    `,
})
export class Footer {
    pseudo = getPseudo();
    twitterUrl = getTwitterUrl();
    year = new Date().getFullYear();

    socials: Social[] = [
        { href: `mailto:${getEmail()}`, icon: 'fa-envelope', label: 'Email', external: false },
        { href: getLinkedInUrl(), icon: 'fa-linkedin', label: 'LinkedIn', external: true },
        { href: getGithubUrl(), icon: 'fa-github', label: 'GitHub', external: true },
        { href: getTwitterUrl(), icon: 'fa-twitter', label: 'Twitter', external: true },
    ];
}
