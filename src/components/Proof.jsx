import React, { useEffect, useState } from 'react';
import wsbLogo from "../assets/universities/wsb-logo.png";
import putLogo from "../assets/universities/put-logo.png";
import amuLogo from "../assets/universities/amu-logo.png";

import { supabase } from '../lib/supabase.js';

function animateCounters() {
    const els = document.querySelectorAll('[data-counter]');

    const run = (el) => {
        const target = parseInt(el.getAttribute('data-counter') || '0', 10);
        const duration = 1200;
        let start = null;

        const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const val = Math.floor(target * p);
            el.textContent = val.toLocaleString();
            if (p < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    run(e.target);
                    obs.unobserve(e.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    els.forEach((el) => obs.observe(el));
}

const universities = [
    { name: "WSB Merito Poznan", logo: wsbLogo },
    { name: "PUT",               logo: putLogo },
    { name: "AMU",               logo: amuLogo },
];

export default function Proof() {
    const [waitlistCount, setWaitlistCount] = useState(null);
    const [avgRSVPs, setAvgRSVPs] = useState(null);

    useEffect(() => {
        let cancelled = false;

        setAvgRSVPs(62);

        async function fetchWaitlist() {
            try {
                const { data, error } = await supabase
                    .rpc('waitlist_public_count');

                if (error) {
                    console.error('Failed to fetch waitlist count', error.message);
                    return;
                }

                if (!cancelled) {
                    const base = data ?? 0; // data is the integer from the function
                    setWaitlistCount(base + 200);
                }
            } catch (e) {
                console.error('Waitlist count error:', e);
            }
        }

        fetchWaitlist();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (waitlistCount !== null) {
            animateCounters();
        }
    }, [waitlistCount]);


    return (
        <section id="proof" className="px-4 sm:px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-white/60 text-sm">Interest from students at</p>

                    {/* UNIVERSITY ROWS */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 items-stretch">
                        {universities.map((u) => (
                            <div
                                key={u.name}
                                className="flex flex-col items-center w-full max-w-md mx-auto gap-3"
                            >
                                <img
                                    src={u.logo}
                                    alt={u.name}
                                    className="w-16 h-16 md:w-24 md:h-24 object-contain"
                                />
                                <div
                                    className="glass rounded-full w-full max-w-xs mx-auto py-3 px-6 flex items-center justify-center text-lg md:text-xl font-semibold text-white tracking-[0.03em]"
                                >
                                    {u.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* STATS */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="glass rounded-2xl p-6 text-center shadow-card">
                        <div className="text-4xl font-bold tabular-nums">
                            <span data-counter={waitlistCount ?? 0}>0</span>+
                        </div>
                        <div className="text-white/60 text-sm mt-1">Waitlist interest</div>
                    </div>

                    <div className="glass rounded-2xl p-6 text-center shadow-card">
                        <div className="text-4xl font-bold tabular-nums">
                            <span data-counter={avgRSVPs}>0</span>
                        </div>
                        <div className="text-white/60 text-sm mt-1">
                            Avg. RSVPs per featured event
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
