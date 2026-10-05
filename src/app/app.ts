import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer],
    template: `
        <a href="#main_content" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-slate-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white">
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
}
