import React, { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { smoothScrollTo } from '../lib/smoothScroll'

export default function Navbar(){
    const [show, setShow] = useState(false)
    const [lastY, setLastY] = useState(0)

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            if (y > 40 && y > lastY) setShow(true)
            if (y < lastY) setShow(false)
            setLastY(y)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [lastY])

    return (
        <header className="fixed top-0 left-0 right-0 z-40">
            <div className="mx-auto max-w-7xl px-4 pt-4">
                <nav className={`glass rounded-2xl px-4 py-2 flex items-center justify-between transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-100'}`}>
                    <div className="text-lg tracking-[0.25em] font-semibold select-none">COLLEGIUM</div>
                    <div className="hidden sm:flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 rounded-full capsule px-3 py-1 text-xs text-white/80">
              <Lock className="w-3.5 h-3.5" /> Invite‑only
            </span>
                        <button onClick={() => smoothScrollTo('apply', 900)} className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-white/90">
                            Join Waitlist
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}
