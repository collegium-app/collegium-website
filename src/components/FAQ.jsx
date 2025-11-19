import React from 'react'

export default function FAQ(){
    const items = [
        ['Who can join?','Current bachelor’s or master’s students. We verify before access.'],
        ['How do invites work?','We open limited slots per campus. Priority for university emails.'],
        ['When will my campus open?','We batch openings based on demand signals. Join the list to be counted.'],
        ['Code of conduct','Respectful behavior, zero tolerance for harassment, verified identity.'],
    ]
    return (
        <section className="px-6 py-16">
            <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center">Access and policy</h2>
                <div className="mt-8 space-y-3">
                    {items.map(([q,a]) => (
                        <details key={q} className="glass rounded-2xl p-5 shadow-card">
                            <summary className="cursor-pointer font-semibold">{q}</summary>
                            <p className="text-white/70 mt-2 text-sm">{a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}
