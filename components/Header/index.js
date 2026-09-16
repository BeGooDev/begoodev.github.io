import Link from 'next/link';
import classNames from "classnames";
import { useState } from 'react';

const navLinks = [
    { href: '/development', label: 'Développement', key: 'development' },
    { href: '/mon-cv', label: 'Mon parcours', key: 'mon-cv' },
    { href: '/contact', label: 'Contact', key: 'contact' },
];

export default function Header({ nav = {} }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
            <nav className="container-page flex h-16 items-center justify-between" aria-label="Navigation principale">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <img src="/img/logo_begoodev_black.png" alt="BeGooDev" width={160} height={26} className="h-7 w-auto" />
                </Link>

                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            href={link.href}
                            className={classNames(
                                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                nav.active === link.key
                                    ? "bg-brand-50 text-brand-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="ml-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-200 transition-colors hover:bg-brand-600"
                    >
                        Me contacter
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label="Ouvrir le menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full hover:bg-slate-100 md:hidden"
                >
                    <span className={classNames("block h-0.5 w-5 bg-slate-700 transition-transform", open && "translate-y-2 rotate-45")} />
                    <span className={classNames("block h-0.5 w-5 bg-slate-700 transition-opacity", open && "opacity-0")} />
                    <span className={classNames("block h-0.5 w-5 bg-slate-700 transition-transform", open && "-translate-y-2 -rotate-45")} />
                </button>
            </nav>

            <div className={classNames("overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden", open ? "max-h-72" : "max-h-0 border-t-0")}>
                <div className="container-page flex flex-col gap-1 py-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={classNames(
                                "rounded-xl px-4 py-3 text-sm font-medium",
                                nav.active === link.key ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="mt-1 rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                        Me contacter
                    </Link>
                </div>
            </div>
        </header>
    )
}
