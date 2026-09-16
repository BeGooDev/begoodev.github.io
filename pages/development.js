import Head from "next/head";
import MainLayout from "../layouts/main";
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import skills from "../data/skills";

export default function StackPage() {
    const propsLayout = {
        header: {
            nav: { active: 'development' }
        }
    }

    return (
        <>
            <Head>
                <title>BeGooDev - Mes compétences en développement</title>
                <meta name="keywords" content="php,java,angular,javascript"/>
            </Head>
            <MainLayout {...propsLayout}>
                <section className="bg-slate-900 pt-32 pb-16 text-center text-white">
                    <div className="container-page">
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand-300">Développement d'applications</span>
                        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Les compétences que j'ai à vous offrir</h1>
                    </div>
                </section>

                <section className="container-page py-16">
                    <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-[1fr_220px]">
                        <div className="space-y-4 text-base leading-relaxed text-slate-600">
                            <p>
                                Développeur depuis 2009, j'ai travaillé dans des environnements variés, le plus souvent
                                dans des équipes de petite taille, où il a toujours fallu s'adapter en fonction des
                                besoins, développer de nouvelles compétences et apprendre de nouvelles choses.
                            </p>
                            <p>
                                Mon profil polyvalent et mes capacités d'adaptation me permettent de m'acclimater à
                                l'environnement de travail de votre équipe. Je suis également un excellent intermédiaire
                                technique pour faciliter les échanges entre les différentes spécialités qui composent
                                votre entreprise.
                            </p>
                        </div>
                        <img src="/svg/undraw_Developer_activity_re_39tg.svg" alt="Mes compétences" className="mx-auto h-48 w-48" />
                    </div>
                </section>

                <section className="bg-slate-50 py-16">
                    <div className="container-page">
                        <SectionHeading eyebrow="Stack technique" title="Voici les technologies que je maîtrise" />
                        <div className="mt-14 grid gap-6 sm:grid-cols-3">
                            {skills.map((group) => (
                                <div key={group.category} className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-100">
                                    <h3 className="text-lg font-semibold text-slate-900">{group.category}</h3>
                                    <hr className="my-4 border-slate-100" />
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        {group.items.map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container-page py-16 text-center">
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                        J'aime apprendre de nouvelles choses, en fonction de vos besoins mais aussi de mes envies&nbsp;!
                        Savoir s'adapter à de nouveaux langages, de nouveaux frameworks ou de nouveaux outils fait partie
                        de ma philosophie. Je n'hésiterai donc pas à enrichir cette liste.
                    </p>
                    <Link href="/contact" title="Contactez-moi" className="mt-8 inline-flex rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600">
                        Alors, contactez-moi&nbsp;!
                    </Link>
                </section>
            </MainLayout>
        </>
    );
}
