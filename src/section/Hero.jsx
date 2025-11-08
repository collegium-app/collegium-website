import React, { useMemo } from 'react'
import { smoothScrollTo } from '../lib/smoothScroll'
import logoG from '/collegium-website-logo.png'

const taglines = [
    'One home for parties, events, and connections that actually matter. Exclusive access, unforgettable nights.',
    'Everything you need to party, connect, and belong in one place. The catch? Only a few get in.',
    'The party doesn’t start without us, and it won’t start with you unless you’re in.',
    'Get in or miss everything.',
    'Not everyone’s invited. Are you?',
    'Access granted. To the nights that matter.',
    'Inside is where it happens. Outside is where you’ll wish you were.',
    'Campus life has a center. You’re either in it or invisible.',
    'Every party, every event, every friend—in one app.',
    'Your hub for nights out, new friends, and endless memories.',
    'One app. Every party, every event, every moment that matters. Get in—or miss out.',
]

export default function Hero(){
    const tagline = useMemo(() => taglines[Math.floor(Math.random()*taglines.length)],[])
    return (
        <section className="relative min-h-[88vh] flex items-center justify-center grad">
            <div className="grow-glow"></div>
            <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
                    The exclusive campus network for parties, events, and real connections
                </h1>
                <p className="mt-4 text-white/70">We open a limited number of spots per campus.</p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <button onClick={()=>smoothScrollTo('proof',900)} className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90">Why trust this</button>
                    <button onClick={()=>smoothScrollTo('features',900)} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 hover:bg-white/10">See features</button>
                </div>

                <div className="mt-14 grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1 text-left">
                        <h2 className="text-3xl md:text-4xl font-bold">Your city, unfiltered</h2>
                        <p className="mt-3 text-white/70">Explore trending posts, see what’s on tonight, meet your people.</p>
                        <ul className="mt-5 space-y-2 text-white/70">
                            <li>• Verified students only</li>
                            <li>• Host-grade events with announcements</li>
                            <li>• Global, regional, and city chats</li>
                        </ul>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="phone w-[300px] md:w-[360px] mx-auto">
                            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=640&auto=format&fit=crop" alt="App feed preview" className="block w-full h-auto rounded-[28px]" loading="eager" decoding="async" />
                        </div>
                    </div>
                </div>

                <p className="mt-10 max-w-2xl mx-auto text-balance text-lg text-white/80">{tagline}</p>
                <div className="mt-8">
                    <button onClick={()=>smoothScrollTo('apply',1200)} className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90">Join Email Waiting List</button>
                </div>
            </div>
        </section>
    )
}
