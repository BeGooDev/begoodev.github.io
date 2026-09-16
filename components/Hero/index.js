import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { slogans } from "../../config";

const accentStyles = {
    blue: { blob: "bg-accent-blue", text: "text-accent-blue" },
    navy: { blob: "bg-accent-navy", text: "text-accent-navy" },
    pink: { blob: "bg-accent-pink", text: "text-accent-pink" },
    green: { blob: "bg-accent-green", text: "text-accent-green" },
    orange: { blob: "bg-accent-orange", text: "text-accent-orange" },
};

export default function Hero() {
    const [slogan, setSlogan] = useState(slogans[0]);

    const shuffle = useCallback(() => {
        setSlogan((current) => {
            const others = slogans.filter((s) => s !== current);
            return others[Math.floor(Math.random() * others.length)];
        });
    }, []);

    useEffect(() => {
        const intervalID = setInterval(shuffle, 5000);
        return () => clearInterval(intervalID);
    }, [shuffle]);

    const accent = accentStyles[slogan.accent];

    return (
        <section className="relative overflow-hidden bg-slate-900 pt-32 pb-24 text-white">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
            <div className={`pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full ${accent.blob} opacity-20 blur-3xl transition-colors duration-1000`} />

            <div className="container-page relative flex flex-col items-center text-center">
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-slate-300">
                    Développeur freelance · Rennes &amp; alentours
                </span>

                <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">
                    <span className="bg-gradient-to-r from-brand-300 to-accent-blue bg-clip-text text-transparent">BeGooDev</span>
                </h1>

                <p key={slogan.text} className={`mt-6 max-w-2xl text-lg font-medium transition-colors duration-700 sm:text-xl ${accent.text}`}>
                    {slogan.text}
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact" className="rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400">
                        Prendre contact
                    </Link>
                    <Link href="/development" className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                        Découvrir mes compétences
                    </Link>
                </div>
            </div>
        </section>
    );
}
