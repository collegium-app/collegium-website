import React from 'react'

export default function Features(){
    const items = [
        ['Verified students only','Invite system and checks to keep rooms clean.'],
        ['Host-grade events','Capacity, join requests, announcements, photos.'],
        ['Multi-tier chats','Global, regional, and city rooms plus majors.'],
        ['Real-time presence','Push notifications and presence signals.'],
        ['Safety by design','Policies and guardrails to deter spam and abuse.'],
        ['Built for nights','The center of campus life, not another feed.'],
    ]
    return (
        <section id="features" className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center">Why it’s different</h2>
                <p className="text-center text-white/70 mt-2">Six traits that shape the product.</p>
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
