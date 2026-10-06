import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer],
    template: `
        <!-- Off-screen until focused. Handled in JS: with <base href="/">, "#main_content" would resolve to /#main_content and leave sub-pages -->
        <a href="#main_content" (click)="skipToContent($event)" class="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white focus:translate-y-0">
            Aller au contenu
        </a>
        <app-header />
        <main id="main_content" tabindex="-1" class="pt-16 outline-none">
            <router-outlet />
        </main>
        <app-footer />
    `,
})
export class App {
    private document = inject(DOCUMENT);

    skipToContent(event: Event) {
        event.preventDefault();
        this.document.getElementById('main_content')?.focus();
    }
}
