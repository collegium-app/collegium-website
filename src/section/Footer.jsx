import React from "react";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#0b0b0f] px-6 py-10 text-center">
            <p className="text-xs text-white/50">© {new Date().getFullYear()} Collegium. All rights reserved.</p>
            <div className="mt-3 text-xs text-white/50">
                <a href="https://www.instagram.com/collegium.eu/" target="_blank" className="hover:text-white/80">Instagram</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-white/80">X</a>
            </div>
        </footer>
    );
};

export default Footer;
