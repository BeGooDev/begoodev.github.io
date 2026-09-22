import { Component } from '@angular/core';
import { projects } from '../../data/projects';

@Component({
    selector: 'app-projects',
    template: `
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (project of projects; track project.title) {
                <div class="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100 transition-shadow hover:shadow-lg hover:shadow-slate-200">
                    <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
                        <img [src]="project.icon" alt="" class="h-9 w-9" />
                    </div>
                    <h3 class="mt-5 text-lg font-semibold text-slate-900">{{ project.title }}</h3>
                    <p class="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">{{ project.stack }}</p>
                    <p class="mt-3 text-sm leading-relaxed text-slate-600">{{ project.description }}</p>
                </div>
            }
        </div>
    `,
})
export class Projects {
    projects = projects;
}
