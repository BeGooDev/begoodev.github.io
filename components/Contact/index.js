import Link from "next/link";
import { getEmail, getLinkedInUrl, getPhoneNum, getMaltUrl, getTwitterDirectMessageUrl, getTwitterUser, getEmailWithSpaces } from "../../config";

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

export default function Contact() {
    return (
        <section id="contact" className="scroll-mt-20 bg-slate-900 py-20 text-white">
            <div className="container-page text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-300">Me contacter</span>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Un projet en tête&nbsp;?</h2>
                <p className="mx-auto mt-4 max-w-xl text-slate-300">
                    Vous avez de la chance, je suis <span className="font-semibold text-white">disponible&nbsp;!</span>
                </p>
            </div>

            <div className="container-page mt-12">
                <div className="mx-auto max-w-2xl space-y-4">
                    <Link
                        href={`mailto:${getEmail()}`}
                        title="Envoyez-moi un email"
                        className="flex flex-col items-center gap-3 rounded-2xl bg-brand-500 p-8 text-center text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 sm:flex-row sm:text-left"
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
                                        <span className="block text-base font-semibold text-white">{method.label}</span>
                                        <span className="block text-sm text-slate-400">{method.value}</span>
                                    </span>
                                </>
                            );

                            if (method.smsHref) {
                                return (
                                    <div key={method.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                                        <div className="flex items-center gap-4">{content}</div>
                                        <div className="flex flex-shrink-0 flex-col items-end gap-1 text-xs font-semibold">
                                            <Link href={method.href} title="Appeler" className="text-brand-300 hover:text-brand-200">Appeler</Link>
                                            <Link href={method.smsHref} title="Envoyer un SMS" className="text-slate-400 hover:text-slate-200">SMS</Link>
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
                                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                                >
                                    {content}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
