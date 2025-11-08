import React from 'react'

export default function Footer(){
    return (
        <footer className="border-t border-white/10 px-6 py-10 text-center">
            <p className="text-xs text-white/50">© {new Date().getFullYear()} Collegium. All rights reserved.</p>
            <div className="mt-3 text-xs text-white/50">
                <a href="https://www.instagram.com/collegium.eu/" target="_blank" rel="noreferrer" className="hover:text-white/80">Instagram</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-white/80">X</a>
            </div>
        </footer>
    )
}
