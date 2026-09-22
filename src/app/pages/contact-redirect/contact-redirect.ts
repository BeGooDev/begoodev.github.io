import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-contact-redirect',
    imports: [RouterLink],
    template: `
        <div class="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-900 px-6 text-center text-white">
            <p>Redirection vers la section contact&nbsp;...</p>
            <a routerLink="/" fragment="contact" class="text-sm font-semibold text-brand-300 underline underline-offset-4">
                Cliquez ici si vous n'êtes pas redirigé
            </a>
        </div>
    `,
})
export class ContactRedirect implements OnInit {
    private titleService = inject(Title);
    private meta = inject(Meta);
    private router = inject(Router);

    ngOnInit() {
        this.titleService.setTitle('BeGooDev - Contactez moi');
        this.meta.updateTag({ 'http-equiv': 'refresh', content: '0;url=/#contact' });
        this.router.navigate(['/'], { fragment: 'contact' });
    }
}
