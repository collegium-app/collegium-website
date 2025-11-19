import React from 'react'

export default function Features(){
    const items = [
        ['Plan your events easily','Create and share events with a click. As easy as a few taps.'],
        ['Live Momentum', 'Watch events rise, groups form, and nights unfold. Everything updates the moment it happens.'],
        ['Built for nightlife', 'Designed for the real weekend energy — not endless scrolling, but actual experiences.'],
    ]
    return (
        <section id="features" className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center">Why it’s different</h2>
                <p className="text-center text-white/70 mt-2">Three traits that shape the product.</p>
                <div className="mt-10 grid md:grid-cols-3 gap-4">
                    {items.map(([h,p]) => (
                        <div key={h} className="glass rounded-2xl p-6 shadow-card">
                            <h3 className="font-semibold">{h}</h3>
                            <p className="text-white/70 mt-1 text-sm">{p}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
