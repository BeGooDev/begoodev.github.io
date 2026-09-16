import Link from 'next/link';
import { getEmail, getGithubUrl, getLinkedInUrl, getPseudo, getTwitterUrl } from "../../config";
import Logo from '../Logo';

const socials = [
    { href: (email) => `mailto:${email}`, icon: 'fa-envelope', label: 'Email', useEmail: true },
    { href: () => getLinkedInUrl(), icon: 'fa-linkedin', label: 'LinkedIn' },
    { href: () => getGithubUrl(), icon: 'fa-github', label: 'GitHub' },
    { href: () => getTwitterUrl(), icon: 'fa-twitter', label: 'Twitter' },
];

export default function Footer() {
    const email = getEmail();

    return (
        <footer className="mt-24 bg-slate-900 text-slate-300">
            <div className="container-page flex flex-col items-center gap-6 py-14 text-center">
                <Logo variant="onDark" height={22} className="opacity-90" />

                <div className="flex items-center gap-3">
                    {socials.map((s) => (
                        <Link
                            key={s.icon}
                            href={s.useEmail ? s.href(email) : s.href()}
                            target={s.useEmail ? undefined : "_blank"}
                            title={s.label}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-500"
                        >
                            <i className={`fa ${s.icon} text-lg`} aria-hidden="true" />
                        </Link>
                    ))}
                </div>

                <div className="text-sm text-slate-400">
                    <p>
                        Fait avec <span aria-hidden="true">❤️</span> par{' '}
                        <Link href={getTwitterUrl()} target="_blank" className="text-slate-200 underline decoration-slate-600 underline-offset-4 hover:text-white">
                            {getPseudo()}
                        </Link>
                    </p>
                    <p className="mt-1">
                        Illustrations :{' '}
                        <Link href="http://undraw.co" target="_blank" className="text-slate-200 underline decoration-slate-600 underline-offset-4 hover:text-white">
                            undraw.co
                        </Link>
                    </p>
                    <p className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} BeGooDev — Philippe Gibert</p>
                </div>
            </div>
        </footer>
    )
}
