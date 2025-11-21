import React from 'react';
import Navbar from "./components/Navbar.jsx";
import Hero from "./section/Hero.jsx";
import Proof from "./components/Proof.jsx";
import Features from "./components/Features.jsx";
import Screens from "./components/Screens.jsx";
import Waitlist from "./components/Waitlist.jsx";
import Footer from "./section/Footer.jsx";

export default function Layout() {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#0b0b0f] text-white selection:bg-white/20">
            <Navbar />
            <main className="w-full">
                <Hero />
                <Proof />
                <Features />
                <Screens />
                <Waitlist />
            </main>
            <Footer />
        </div>
    );
}
