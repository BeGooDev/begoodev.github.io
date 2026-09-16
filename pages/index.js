import MainLayout from "../layouts/main";
import Link from "next/link";
import Head from "next/head";
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'

export default function Home() {
    return (
        <>
            <Head>
                <title>BeGooDev, Développeur d'applications web et mobiles sur Rennes</title>
            </Head>
            <MainLayout>
                <Hero />

                <section className="container-page py-20">
                    <div className="grid items-center gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
                        <img
                            className="mx-auto h-64 w-64 rounded-3xl object-cover shadow-xl shadow-slate-200 md:h-80 md:w-80"
                            width="580" height="580"
                            src="/img/photo-profil.jpg"
                            alt="Philippe Gibert, développeur freelance"
                        />
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">À propos</span>
                            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Développeur freelance depuis plus de 13 ans</h2>
                            <p className="mt-5 text-base leading-relaxed text-slate-600">
                                Je suis développeur web depuis plus de 13 ans, spécialisé dans les applications complexes à
                                fortes charges et les applications mobiles de qualité.
                            </p>
                            <p className="mt-4 text-base leading-relaxed text-slate-600">
                                Je suis très polyvalent&nbsp;! Je suis capable de prendre en charge votre projet dans son
                                ensemble&nbsp;: de l'analyse de votre besoin à la mise en place de l'architecture applicative,
                                en passant par l'optimisation, les tests et le développement. Je porte une grande attention
                                à la qualité du code et au suivi de vos projets.
                            </p>
                            <Link href="/contact" className="mt-8 inline-flex rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600">
                                Prendre contact
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-20">
                    <div className="container-page">
                        <SectionHeading
                            eyebrow="Ce que je peux faire pour vous"
                            title="Mes compétences"
                        />
                        <div className="mt-14 grid gap-8 sm:grid-cols-3">
                            <div className="text-center">
                                <img src="/svg/undraw_Web_developer_re_h7ie.svg" alt="" className="mx-auto h-32 w-32" />
                                <p className="mt-6 text-sm leading-relaxed text-slate-600">
                                    Je prends en charge le développement de votre application web et mobile en veillant à
                                    concevoir une architecture solide et à soigner la qualité du code.
                                </p>
                            </div>
                            <div className="text-center">
                                <img src="/svg/undraw_Code_thinking_re_gka2.svg" alt="" className="mx-auto h-32 w-32" />
                                <p className="mt-6 text-sm leading-relaxed text-slate-600">
                                    Votre application est lente&nbsp;? J'analyse votre code et vous conseille sur les bonnes
                                    pratiques pour booster vos projets&nbsp;!
                                </p>
                            </div>
                            <div className="text-center">
                                <img src="/svg/undraw_Mobile_apps_re_3wjf.svg" alt="" className="mx-auto h-32 w-32" />
                                <p className="mt-6 text-sm leading-relaxed text-slate-600">
                                    Besoin d'un conseil sur les choix technologiques ou sur les outils à mettre en place
                                    pour un développement de qualité&nbsp;? Je suis là&nbsp;!
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <Link href="/development" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-white">
                                Découvrez ma stack
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="container-page py-20">
                    <SectionHeading
                        eyebrow="Exemples de missions"
                        title="Le type de projets que j'aime mener"
                        subtitle="Quelques exemples représentatifs des missions que je peux prendre en charge — à personnaliser avec tes propres réalisations."
                    />
                    <div className="mt-14">
                        <Projects />
                    </div>
                </section>

                <section className="bg-slate-50 py-20">
                    <div className="container-page">
                        <SectionHeading eyebrow="Retours" title="Ce qu'on dit de mon travail" />
                        <div className="mt-14">
                            <Testimonials />
                        </div>
                    </div>
                </section>

                <section className="container-page py-20 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Un projet en tête&nbsp;?</h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
                        Discutons-en&nbsp; je suis disponible pour vous accompagner sur votre prochaine application.
                    </p>
                    <Link href="/contact" className="mt-8 inline-flex rounded-full bg-brand-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-200 transition-colors hover:bg-brand-600">
                        Prendre contact
                    </Link>
                </section>
            </MainLayout>
        </>
    )
}
