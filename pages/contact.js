import Link from "next/link";
import MainLayout from "../layouts/main";
import { getEmail, getLinkedInUrl, getPhoneNum, getTwitterDirectMessageUrl, getMaltUrl, getTwitterUser, getEmailWithSpaces } from "../config";
import Head from "next/head";

const contactMethods = [
    { href: (p) => `sms:${p}`, useValue: 'phone', icon: 'fa-comment', label: 'SMS', color: 'bg-phone', value: getPhoneNum() },
    { href: (e) => `mailto:${e}`, useValue: 'email', icon: 'fa-envelope', label: 'Email', color: 'bg-mail', value: getEmailWithSpaces() },
    { href: (p) => `tel:${p}`, useValue: 'phone', icon: 'fa-phone', label: 'Téléphone', color: 'bg-phone', value: getPhoneNum() },
    { href: () => getTwitterDirectMessageUrl(), external: true, icon: 'fa-twitter', label: 'Twitter', color: 'bg-twitter', value: getTwitterUser() },
    { href: () => getLinkedInUrl(), external: true, icon: 'fa-linkedin', label: 'LinkedIn', color: 'bg-linkedin', value: 'Connectons-nous' },
    { href: () => getMaltUrl(), external: true, icon: 'fa-8x fa-malt', label: 'Malt', color: 'bg-malt', value: 'Une mission à proposer' },
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
                    <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
                        {contactMethods.map((method) => {
                            const target = method.useValue === 'phone' ? getPhoneNum() : method.useValue === 'email' ? getEmail() : undefined;
                            const href = method.external ? method.href() : method.href(target);

                            return (
                                <Link
                                    key={method.label}
                                    href={href}
                                    target={method.external ? "_blank" : undefined}
                                    title={`Contactez-moi par ${method.label}`}
                                    className={`${method.color} flex flex-col items-center gap-2 rounded-2xl p-6 text-center text-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg`}
                                >
                                    <i className={`fa ${method.icon} text-3xl`} aria-hidden="true" />
                                    <span className="mt-2 text-lg font-semibold">{method.label}</span>
                                    <span className="text-sm font-light opacity-90">{method.value}</span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </MainLayout>
        </>
    );
}
