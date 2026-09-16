import testimonials from "../../data/testimonials";

export default function Testimonials() {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, index) => (
                <figure key={index} className="flex h-full flex-col justify-between rounded-2xl bg-slate-50 p-6">
                    <blockquote className="text-sm leading-relaxed text-slate-700">
                        <span className="mb-2 block text-3xl leading-none text-brand-300">“</span>
                        {item.quote}
                    </blockquote>
                    <figcaption className="mt-6 text-sm font-semibold text-slate-500">{item.author}</figcaption>
                </figure>
            ))}
        </div>
    );
}
