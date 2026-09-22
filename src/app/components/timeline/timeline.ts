import { Component } from '@angular/core';
import { experience } from '../../data/experience';

@Component({
    selector: 'app-timeline',
    template: `
        <ol class="relative border-l border-slate-200 pl-8">
            @for (step of experience; track step.year) {
                <li class="mb-10 last:mb-0">
                    <span class="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-4 border-white bg-brand-500 ring-1 ring-slate-200"></span>
                    <span class="text-xs font-semibold uppercase tracking-widest text-brand-600">{{ step.year }}</span>
                    <h3 class="mt-1 text-lg font-semibold text-slate-900">{{ step.title }}</h3>
                    <p class="text-sm font-medium text-slate-500">{{ step.place }}</p>
                    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{{ step.description }}</p>
                </li>
            }
        </ol>
    `,
})
export class Timeline {
    experience = experience;
}
