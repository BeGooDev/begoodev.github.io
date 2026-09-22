import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    imports: [RouterLink],
    template: `
        <section class="container-page flex min-h-[70vh] flex-col items-center justify-center gap-8 py-24 text-center sm:flex-row sm:text-left">
            <div>
                <h1 class="text-4xl font-bold text-slate-900 sm:text-5xl">404</h1>
                <p class="mt-3 text-lg text-slate-600">Vous vous trouvez au mauvais endroit&nbsp;!</p>
                <div class="mt-8 flex justify-center gap-3 sm:justify-start">
                    <a routerLink="/" class="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600">
                        Accueil
                    </a>
                    <a routerLink="/" fragment="contact" class="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                        Contact
                    </a>
                </div>
            </div>
            <img src="/img/404.jpg" alt="" class="w-full max-w-sm rounded-2xl" />
        </section>
    `,
})
export class NotFound implements OnInit {
    private titleService = inject(Title);

    ngOnInit() {
        this.titleService.setTitle('404 Page Not Found');
    }
}
