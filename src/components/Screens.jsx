import React from 'react'
import screen1 from '../assets/screen1.png'
import screen2 from '../assets/screen2.png'
import screen3 from '../assets/screen3.png'

const screens = [screen1, screen2, screen3]

export default function Screens(){
    return (
        <section className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center">Screens</h2>
                <p className="text-center text-white/70 mt-2">Consistent device frames, high-res exports.</p>
                <div className="mt-10 grid md:grid-cols-3 gap-6 items-start">
                    {screens.map((src, i) => {
                        const label = `screen${i+1}`
                        return (
                            <figure key={label} className="mx-auto">
                                <div className="phone w-[260px] md:w-[300px]">
                                    <img src={src} alt={label} className="rounded-[28px] block w-full h-auto" loading="lazy" decoding="async" />
                                </div>
                                <figcaption className="mt-2 text-center text-sm text-white/60 select-none">{label}</figcaption>
                            </figure>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
