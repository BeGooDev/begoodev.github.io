import { Component } from '@angular/core';
import { experience } from '../../data/experience';

@Component({
    selector: 'app-timeline',
    template: `
        <ol class="relative ml-5 border-l border-slate-200 pl-10">
            @for (step of experience; track step.year) {
                <li class="mb-10 last:mb-0">
                    <span class="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-brand-500 text-white ring-1 ring-slate-200">
                        <i class="fa {{ step.icon }}" aria-hidden="true"></i>
                    </span>
                    <span class="text-xs font-semibold uppercase tracking-widest text-brand-600">{{ step.year }}</span>
                    <h3 class="mt-1 text-lg font-semibold text-slate-900">{{ step.title }}</h3>
                    <p class="text-sm font-medium text-slate-500">{{ step.place }}</p>
                    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{{ step.description }}</p>
                    @if (step.stack) {
                        <ul class="mt-3 flex max-w-2xl flex-wrap gap-2">
                            @for (tech of step.stack; track tech) {
                                <li class="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">{{ tech }}</li>
                            }
                        </ul>
                    }
                    @if (step.missions) {
                        <ul class="mt-5 max-w-2xl space-y-4">
                            @for (mission of step.missions; track mission.period) {
                                <li class="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                    <div class="flex items-center gap-3">
                                        <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                                            <i class="fa {{ mission.icon }}" aria-hidden="true"></i>
                                        </span>
                                        <div>
                                            <span class="text-xs font-semibold uppercase tracking-wide text-brand-600">{{ mission.period }}</span>
                                            <h4 class="text-sm font-semibold text-slate-900">{{ mission.title }}</h4>
                                        </div>
                                    </div>
                                    <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ mission.description }}</p>
                                    @if (mission.stack) {
                                        <ul class="mt-3 flex flex-wrap gap-2">
                                            @for (tech of mission.stack; track tech) {
                                                <li class="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100">{{ tech }}</li>
                                            }
                                        </ul>
                                    }
                                </li>
                            }
                        </ul>
                    }
                </li>
            }
        </ol>
    `,
})
export class Timeline {
    experience = experience;
}
