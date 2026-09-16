import projects from "../../data/projects";

export default function Projects() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <div key={project.title} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100 transition-shadow hover:shadow-lg hover:shadow-slate-200">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
                        <img src={project.icon} alt="" className="h-9 w-9" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900">{project.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">{project.stack}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.description}</p>
                </div>
            ))}
        </div>
    );
}
