const INK = { onDark: '#FFFFFF', onLight: '#101418' };
const ACCENT = '#22C55E';

/**
 * BeGooDev wordmark: "be" + "good" (accent) + "ev" + "_" cursor.
 * variant: 'onDark' (colored/dark backgrounds) | 'onLight' (light backgrounds)
 * accent: false renders the whole wordmark in a single color (for busy/rotating backgrounds)
 */
export default function Logo({ variant = 'onDark', accent = true, height = 28, className }) {
    const ink = INK[variant] ?? INK.onDark;
    const goodColor = accent ? ACCENT : ink;

    return (
        <span
            className={className}
            style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.01em',
                fontSize: height,
                lineHeight: 1,
                color: ink,
                whiteSpace: 'nowrap',
                display: 'inline-block',
            }}
        >
            be<span style={{ color: goodColor }}>good</span>ev<span style={{ color: goodColor }}>_</span>
        </span>
    );
}
