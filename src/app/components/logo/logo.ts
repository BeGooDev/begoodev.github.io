import { Component, computed, input } from '@angular/core';

const INK: Record<string, string> = { onDark: '#FFFFFF', onLight: '#101418' };
// Brand green on dark backgrounds; one shade darker on light ones to reach the 3:1 contrast
// required for large bold text (#22C55E on white is only 2.27:1)
const ACCENT: Record<string, string> = { onDark: '#22C55E', onLight: '#16A34A' };

/**
 * BeGooDev wordmark: "be" + "good" (accent) + "ev" + "_" cursor.
 * variant: 'onDark' (colored/dark backgrounds) | 'onLight' (light backgrounds)
 * accent: false renders the whole wordmark in a single color (for busy/rotating backgrounds)
 * blink: true makes the "_" cursor blink a few times like a terminal, then stay solid
 */
@Component({
    selector: 'app-logo',
    template: `
        <span [style]="wrapperStyle()">
            be<span [style.color]="goodColor()">good</span>ev<span [style.color]="goodColor()" [class.animate-cursor-blink]="blink()">_</span>
        </span>
    `,
})
export class Logo {
    variant = input<'onDark' | 'onLight'>('onDark');
    accent = input(true);
    height = input(28);
    blink = input(false);

    ink = computed(() => INK[this.variant()] ?? INK['onDark']);
    goodColor = computed(() => (this.accent() ? (ACCENT[this.variant()] ?? ACCENT['onDark']) : this.ink()));

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
