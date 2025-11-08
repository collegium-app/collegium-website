import React, { useEffect } from 'react'

function animateCounters(){
    const els = document.querySelectorAll('[data-counter]')
    const run = (el) => {
        const target = parseInt(el.getAttribute('data-counter'),10)
        const duration = 1200
        let start=null; const startVal = 0
        const step = (ts)=>{ if(!start) start=ts; const p=Math.min((ts-start)/duration,1); const val=Math.floor(startVal+(target-startVal)*p); el.textContent = val.toLocaleString(); if(p<1) requestAnimationFrame(step) }
        requestAnimationFrame(step)
    }
    const obs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ run(e.target); obs.unobserve(e.target) } })
    }, { threshold: 0.4 })
    els.forEach(el=>obs.observe(el))
}

export default function Proof(){
    useEffect(()=>{ animateCounters() },[])
    return (
        <section id="proof" className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-white/60 text-sm">Interest from students at</p>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 opacity-80">
                        {['WSB Merito','PUT','AMU','PUEB','UEP'].map((name)=> (
                            <div key={name} className="glass rounded-xl py-3 px-4 text-center text-xs">{name}</div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 grid sm:grid-cols-3 gap-4">
                    <div className="glass rounded-2xl p-6 text-center shadow-card">
                        <div className="text-4xl font-bold tabular-nums"><span data-counter="2300">0</span>+</div>
                        <div className="text-white/60 text-sm mt-1">Waitlist interest (mock)</div>
                    </div>
                    <div className="glass rounded-2xl p-6 text-center shadow-card">
                        <div className="text-4xl font-bold tabular-nums"><span data-counter="9">0</span></div>
                        <div className="text-white/60 text-sm mt-1">Campuses tracking demand</div>
                    </div>
                    <div className="glass rounded-2xl p-6 text-center shadow-card">
                        <div className="text-4xl font-bold tabular-nums"><span data-counter="63">0</span></div>
                        <div className="text-white/60 text-sm mt-1">Avg. RSVPs per featured event</div>
                    </div>
                </div>

                <div className="mt-10 grid md:grid-cols-3 gap-4">
                    {[
                        { q:'“The only app that actually gets people to show up.”', a:'Marta – AMU', img:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=128&auto=format&fit=crop' },
                        { q:'“Events feel curated, not spammy. Real people.”', a:'Piotr – PUT', img:'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=128&auto=format&fit=crop' },
                        { q:'“We filled a house party in 30 minutes.”', a:'Zeynep – PUEB', img:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=128&auto=format&fit=crop' },
                    ].map(({q,a,img})=> (
                        <figure key={a} className="glass rounded-2xl p-6 shadow-card">
                            <blockquote className="text-white/80">{q}</blockquote>
                            <figcaption className="mt-4 flex items-center gap-3">
                                <img className="w-8 h-8 rounded-full object-cover" src={img} alt={a} />
                                <div className="text-xs text-white/60">{a}</div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}
