import Head from "next/head";
import Link from "next/link";
import MainLayout from "../layouts/main";


export default function Page404() {
    return (
        <>
            <Head>
                <title>404 Page Not Found</title>
            </Head>
            <MainLayout>
                <section className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-8 py-24 text-center sm:flex-row sm:text-left">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">404</h1>
                        <p className="mt-3 text-lg text-slate-600">Vous vous trouvez au mauvais endroit&nbsp;!</p>
                        <div className="mt-8 flex justify-center gap-3 sm:justify-start">
                            <Link href="/" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600">
                                Accueil
                            </Link>
                            <Link href="/#contact" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <img src="/img/404.jpg" alt="" className="w-full max-w-sm rounded-2xl" />
                </section>
            </MainLayout>
        </>
    );
}
