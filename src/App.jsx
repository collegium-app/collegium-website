import React from 'react'
import Navbar from './components/Navbar'
import Hero from './section/Hero'
import Proof from './components/Proof'
import Features from './components/Features'
import Screens from './components/Screens'
import FAQ from './components/FAQ'
import Waitlist from './components/Waitlist'
import Footer from './section/Footer'

export default function App(){
    return (
        <div className="bg-[#0b0b0f] text-white selection:bg-white/20">
            <Navbar />
            <main>
                <Hero />
                <Proof />
                <Features />
                <Screens />
                <FAQ />
                <Waitlist />
            </main>
            <Footer />
        </div>
    )
}
