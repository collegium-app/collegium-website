import React, { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import logoG from "/collegium-website-logo.png";

const taglines = [
    "One home for parties, events, and connections that actually matter. Exclusive access, unforgettable nights.",
    "Everything you need to party, connect, and belong in one place. The catch? Only a few get in.",
    "The party doesn’t start without us, and it won’t start with you unless you’re in.",
    "Get in or miss everything.",
    "Not everyone’s invited. Are you?",
    "Access granted. To the nights that matter.",
    "Inside is where it happens. Outside is where you’ll wish you were.",
    "Campus life has a center. You’re either in it or invisible.",
    "Every party, every event, every friend—in one app.",
    "Your hub for nights out, new friends, and endless memories.",
    "One app. Every party, every event, every moment that matters. Get in—or miss out.",
];

function smoothScrollTo(elementId, duration = 1000) {
    const target = document.getElementById(elementId);
    if (!target) return;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const diff = targetY - startY;
    let start;

    function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);

        window.scrollTo(0, startY + diff * percent);

        if (time < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}


const Header = () => {
    const tagline = useMemo(() => {
        return taglines[Math.floor(Math.random() * taglines.length)];
    }, []);



    return (
        <header className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#5C4DFF]/20 to-[#0b0b0f] text-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(92,77,255,0.25),rgba(0,0,0,0))]" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center">
                    {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                        <Sparkles size={14} /> Students only • Limited spots per campus
                    </div>
                    */}

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
                        {tagline}
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                smoothScrollTo("apply", 1500);
                            }}
                            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 cursor-pointer"
                        >
                            Join Email Waiting List <ArrowRight size={16} />
                        </a>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                smoothScrollTo("learn", 1200);
                            }}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 hover:bg-white/10 cursor-pointer"
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
