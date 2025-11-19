import React, { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { smoothScrollTo } from '../lib/smoothScroll'

export default function Navbar() {
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
        <header className="fixed inset-x-0 top-0 z-40">
            {/* shared page container: full width on mobile, max-w on larger screens */}
            <div className="mx-auto w-full max-w-[430px] sm:max-w-6xl px-3 sm:px-4 pt-3 sm:pt-4">
                <nav
                    className={`
            glass w-full
            rounded-2xl px-4 py-2
            flex items-center justify-between
            transition-opacity duration-300
            ${show ? 'opacity-100' : 'opacity-100'}
          `}
                >
                    {/* Brand – centered on mobile */}
                    <div className="flex flex-1 justify-center sm:justify-start">
            <span className="text-[12px] sm:text-xs md:text-sm tracking-[0.30em] md:tracking-[0.25em] font-semibold select-none whitespace-nowrap">
              COLLEGIUM
            </span>
                    </div>

                    {/* Actions – hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 rounded-full capsule px-3 py-1 text-xs text-white/80">
              <Lock className="w-3.5 h-3.5" /> Invite-only
            </span>
                        <button
                            onClick={() => smoothScrollTo('apply', 900)}
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-white/90"
                        >
                            Join Waitlist
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}
