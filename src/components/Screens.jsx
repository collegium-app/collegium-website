import React from 'react'
import eventSecond from '../assets/event_2.2.png';
import postFirst from '../assets/post_1.1.png';
import discover from '../assets/discover_1.1.png';

const screens = [
    { src: eventSecond, label: 'Join Events' },
    { src: postFirst,   label: 'Share Posts' },
    { src: discover,    label: 'Meet With new Friends' },
];

export default function Screens() {
    return (
        <section className="px-6 py-20">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center">Experience the App</h2>
                <p className="text-center text-white/70 mt-2">
                    A glimpse into the polished, seamless Collegium design.
                </p>

                <div className="mt-14 grid md:grid-cols-3 gap-12 place-items-center">
                    {screens.map(({ src, label }, i) => (
                        <figure key={i} className="flex flex-col items-center">

                            {/* Bigger phone images */}
                            <div className="w-[300px] md:w-[360px]">
                                <img
                                    src={src}
                                    alt={label}
                                    className="rounded-[32px] w-full h-auto"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            {/* Centered labels */}
                            <figcaption className="mt-4 text-center text-base text-white/70 select-none">
                                {label}
                            </figcaption>
                        </figure>
                    ))}
                </div>

            </div>
        </section>
    );
}
