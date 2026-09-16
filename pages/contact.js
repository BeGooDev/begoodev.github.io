import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ContactRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/#contact');
    }, [router]);

    return (
        <>
            <Head>
                <title>BeGooDev - Contactez moi</title>
                <meta httpEquiv="refresh" content="0;url=/#contact" />
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-900 px-6 text-center text-white">
                <p>Redirection vers la section contact&nbsp;...</p>
                <Link href="/#contact" className="text-sm font-semibold text-brand-300 underline underline-offset-4">
                    Cliquez ici si vous n'êtes pas redirigé
                </Link>
            </div>
        </>
    );
}
