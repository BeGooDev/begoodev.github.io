import { Component, computed, input } from '@angular/core';
import { IconName, icons } from './icons';

/** Decorative inline SVG icon, sized and colored like text (1em high, currentColor). */
@Component({
    selector: 'app-icon',
    host: { class: 'inline-flex' },
    template: `
        <svg
            [attr.viewBox]="'0 0 ' + icon().width + ' 512'"
            class="h-[1em] w-auto fill-current"
            aria-hidden="true"
            focusable="false"
        >
            <path [attr.d]="icon().path" />
        </svg>
    `,
})
export class Icon {
    name = input.required<IconName>();
    icon = computed(() => icons[this.name()]);
}
