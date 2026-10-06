import { Component, computed, input } from '@angular/core';

const INK: Record<string, string> = { onDark: '#FFFFFF', onLight: '#101418' };
const ACCENT = '#22C55E';

/**
 * BeGooDev wordmark: "be" + "good" (accent) + "ev" + "_" cursor.
 * variant: 'onDark' (colored/dark backgrounds) | 'onLight' (light backgrounds)
 * accent: false renders the whole wordmark in a single color (for busy/rotating backgrounds)
 * compact: renders only "b" + "_" (favicon-style mark) for tight spaces
 */
@Component({
    selector: 'app-logo',
    template: `
        <span [style]="wrapperStyle()">
            @if (compact()) {
                b<span [style.color]="goodColor()">_</span>
            } @else {
                be<span [style.color]="goodColor()">good</span>ev<span [style.color]="goodColor()">_</span>
            }
        </span>
    `,
})
export class Logo {
    variant = input<'onDark' | 'onLight'>('onDark');
    accent = input(true);
    compact = input(false);
    height = input(28);

    ink = computed(() => INK[this.variant()] ?? INK['onDark']);
    goodColor = computed(() => (this.accent() ? ACCENT : this.ink()));

    wrapperStyle = computed(() => ({
        'font-family': 'var(--font-logo), sans-serif',
        'font-weight': 700,
        'letter-spacing': '-0.01em',
        'font-size': `${this.height()}px`,
        'line-height': 1,
        color: this.ink(),
        'white-space': 'nowrap',
    }));
}
