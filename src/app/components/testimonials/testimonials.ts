import { Component } from '@angular/core';
import { testimonials } from '../../data/testimonials';

@Component({
    selector: 'app-testimonials',
    template: `
        <div class="grid gap-6 md:grid-cols-3">
            @for (item of testimonials; track item.author) {
                <figure class="flex h-full flex-col justify-between rounded-2xl bg-slate-50 p-6">
                    <blockquote class="text-sm leading-relaxed text-slate-700">
                        <span class="mb-2 block text-3xl leading-none text-brand-300">&ldquo;</span>
                        {{ item.quote }}
                    </blockquote>
                    <figcaption class="mt-6 text-sm font-semibold text-slate-500">{{ item.author }}</figcaption>
                </figure>
            }
        </div>
    `,
})
export class Testimonials {
    testimonials = testimonials;
}
