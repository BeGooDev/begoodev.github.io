import Link from "next/link";
import MainLayout from "../layouts/main";
import { getEmail, getLinkedInUrl, getPhoneNum, getMaltUrl, getTwitterDirectMessageUrl, getTwitterUser, getEmailWithSpaces } from "../config";
import Head from "next/head";

const secondaryMethods = [
    {
        label: "Téléphone",
        icon: "fa-phone",
        badge: "bg-phone/10 text-phone",
        value: getPhoneNum(),
        href: `tel:${getPhoneNum()}`,
        smsHref: `sms:${getPhoneNum()}`,
    },
    {
        label: "Twitter",
        icon: "fa-twitter",
        badge: "bg-twitter/10 text-twitter",
        value: getTwitterUser(),
        href: getTwitterDirectMessageUrl(),
        external: true,
    },
    {
        label: "LinkedIn",
        icon: "fa-linkedin",
        badge: "bg-linkedin/10 text-linkedin",
        value: "Connectons-nous",
        href: getLinkedInUrl(),
        external: true,
    },
    {
        label: "Malt",
        image: "/svg/malt-logo.svg",
        badge: "bg-malt",
        value: "Une mission à proposer",
        href: getMaltUrl(),
        external: true,
    },
];

export default function ContactPage() {
    const propsLayout = {
        header: {
            nav: { active: 'contact' }
        }
    }

    return (
        <>
            <Head>
                <title>BeGooDev - Contactez moi</title>
            </Head>
            <MainLayout {...propsLayout}>
                <section className="bg-slate-900 pt-32 pb-16 text-center text-white">
                    <div className="container-page">
                        <h1 className="text-4xl font-bold sm:text-5xl">Me contacter</h1>
                        <p className="mt-4 text-lg text-slate-300">
                            Vous avez de la chance, je suis <span className="font-semibold text-white">disponible&nbsp;!</span>
                        </p>
                    </div>
                </section>

                <section className="container-page py-16">
                    <div className="mx-auto max-w-2xl space-y-4">
                        <Link
                            href={`mailto:${getEmail()}`}
                            title="Envoyez-moi un email"
                            className="flex flex-col items-center gap-3 rounded-2xl bg-brand-500 p-8 text-center text-white shadow-lg shadow-brand-200 transition-transform hover:-translate-y-1 sm:flex-row sm:text-left"
                        >
                            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                                <i className="fa fa-envelope text-2xl" aria-hidden="true" />
                            </span>
                            <span>
                                <span className="block text-lg font-semibold">Email</span>
                                <span className="block text-sm font-light opacity-90">{getEmailWithSpaces()}</span>
                            </span>
                        </Link>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {secondaryMethods.map((method) => {
                                const content = (
                                    <>
                                        <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${method.badge}`}>
                                            {method.image ? (
                                                <img src={method.image} alt="" className="h-6 w-6" />
                                            ) : (
                                                <i className={`fa ${method.icon} text-xl`} aria-hidden="true" />
                                            )}
                                        </span>
                                        <span>
                                            <span className="block text-base font-semibold text-slate-900">{method.label}</span>
                                            <span className="block text-sm text-slate-500">{method.value}</span>
                                        </span>
                                    </>
                                );

                                if (method.smsHref) {
                                    return (
                                        <div key={method.label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-100">
                                            <div className="flex items-center gap-4">{content}</div>
                                            <div className="flex flex-shrink-0 flex-col items-end gap-1 text-xs font-semibold">
                                                <Link href={method.href} title="Appeler" className="text-brand-600 hover:text-brand-700">Appeler</Link>
                                                <Link href={method.smsHref} title="Envoyer un SMS" className="text-slate-400 hover:text-slate-600">SMS</Link>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={method.label}
                                        href={method.href}
                                        target={method.external ? "_blank" : undefined}
                                        title={`Contactez-moi par ${method.label}`}
                                        className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-100 transition-shadow hover:shadow-lg hover:shadow-slate-200"
                                    >
                                        {content}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
}
