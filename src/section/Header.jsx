import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import logoG from "/collegium-website-logo.png";

const Header = () => {
    return (
        <header className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#5C4DFF]/20 to-[#0b0b0f] text-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(92,77,255,0.25),rgba(0,0,0,0))]" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                        <Sparkles size={14} /> Students only • Limited spots per campus
                    </div>

                    <h1 className="select-none flex items-center justify-center text-5xl font-extrabold tracking-[-0.02em] md:text-7xl leading-none text-white">
                        <span>COLLE</span>
                        <img
                            src={logoG}
                            alt="G Logo"
                            className="inline-block h-[1em] md:h-[1.1em] -mx-[0.15em] object-contain align-baseline"
                            draggable="false"
                        />
                        <span>IUM</span>
                    </h1>

                    <p className="mt-3 text-sm text-white/60 md:text-base">by students, for students</p>

                    <p className="mt-10 max-w-2xl text-balance text-lg text-white/80">
                        The campus network for real life: posts, events, and groups that actually matter.
                        Not everyone gets in—those who do, don’t miss out.
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                        <a
                            href="#apply"
                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
                        >
                            Join Email Waiting List<ArrowRight size={16} />
                        </a>
                        <a
                            href="#learn"
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 hover:bg-white/10"
                        >
                            See how it works
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
