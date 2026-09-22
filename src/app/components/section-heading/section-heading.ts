import { Component, input } from '@angular/core';

@Component({
    selector: 'app-section-heading',
    template: `
        <div [class]="center() ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
            @if (eyebrow()) {
                <span class="text-xs font-semibold uppercase tracking-widest text-brand-600">{{ eyebrow() }}</span>
            }
            <h2 class="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{{ title() }}</h2>
            @if (subtitle()) {
                <p class="mt-4 text-base leading-relaxed text-slate-600">{{ subtitle() }}</p>
            }
        </div>
    `,
})
export class SectionHeading {
    eyebrow = input<string>();
    title = input.required<string>();
    subtitle = input<string>();
    center = input(true);
}
