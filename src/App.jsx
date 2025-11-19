import React from 'react'
import Navbar from './components/Navbar'
import Hero from './section/Hero'
import Proof from './components/Proof'
import Features from './components/Features'
import Screens from './components/Screens'
import Waitlist from './components/Waitlist'
import Footer from './section/Footer'

export default function App() {
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
    )
}
