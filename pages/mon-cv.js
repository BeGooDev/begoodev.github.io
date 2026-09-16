import Head from "next/head";
import MainLayout from "../layouts/main";
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import Timeline from "../components/Timeline";

export default function MonCvPage() {
    const propsLayout = {
        header: {
            nav: { active: 'mon-cv' }
        }
    }

    return (
        <>
            <Head>
                <title>BeGooDev - Mon parcours</title>
            </Head>
            <MainLayout {...propsLayout}>
                <section className="bg-slate-900 pt-32 pb-16 text-center text-white">
                    <div className="container-page">
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand-300">Parcours</span>
                        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">13 ans à faire du développement mon métier</h1>
                        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                            De mes débuts en 2009 à mon activité de freelance aujourd'hui, un parcours guidé par la
                            curiosité technique et le goût du travail bien fait.
                        </p>
                    </div>
                </section>

                <section className="container-page py-16">
                    <SectionHeading eyebrow="Étapes clés" title="Mon parcours" center={false} />
                    <div className="mt-12">
                        <Timeline />
                    </div>
                </section>

                <section className="bg-slate-50 py-16 text-center">
                    <div className="container-page">
                        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Envie d'en discuter&nbsp;?</h2>
                        <p className="mx-auto mt-3 max-w-xl text-slate-600">
                            Je suis disponible pour échanger sur votre projet et voir comment je peux vous accompagner.
                        </p>
                        <Link href="/contact" className="mt-8 inline-flex rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600">
                            Me contacter
                        </Link>
                    </div>
                </section>
            </MainLayout>
        </>
    );
}
