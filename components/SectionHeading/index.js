export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
    return (
        <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
            {eyebrow && (
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">{eyebrow}</span>
            )}
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-600">{subtitle}</p>}
        </div>
    );
}
