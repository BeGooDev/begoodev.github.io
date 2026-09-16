import experience from "../../data/experience";

export default function Timeline() {
    return (
        <ol className="relative border-l border-slate-200 pl-8">
            {experience.map((step, index) => (
                <li key={index} className="mb-10 last:mb-0">
                    <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-4 border-white bg-brand-500 ring-1 ring-slate-200" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">{step.year}</span>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-sm font-medium text-slate-500">{step.place}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{step.description}</p>
                </li>
            ))}
        </ol>
    );
}
