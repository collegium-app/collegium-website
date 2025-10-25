import React, {useEffect, useState} from "react";
import {Lock, ArrowRight, Moon, Sun} from "lucide-react";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [lastY, setLastY] = useState(0);
    const [dark, setDark] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y > 40 && y > lastY) setShow(true);
            if (y < lastY) setShow(false);
            setLastY(y);
        };
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, [lastY]);

    return (
        <nav
            className={`fixed top-0 left-0 z-50 w-full px-4 py-3 transition-all duration-300 ${
                show ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="mx-auto max-w-7xl">
                <div
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl px-4 py-2">
                    <div className="text-lg tracking-[0.25em] text-white font-semibold select-none">COLLEGIUM</div>
                    <div className="flex items-center gap-3">
                        <span
                            className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">
                        <Lock size={14}/> Invite‑only
                        </span>
                        <a
                            href="#apply"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-white/90"
                        >
                            Apply now <ArrowRight size={16}/>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
