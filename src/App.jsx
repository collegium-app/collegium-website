import React from 'react';
import Layout from "./Layout.jsx";
import PasswordReset from "./pages/PasswordReset.jsx";

export default function App() {
    const path = window.location.pathname;
    const hash = window.location.hash;

    const isRecovery =
        path === "/reset-password" &&
        hash.includes("access_token") &&
        hash.includes("type=recovery");

    if (isRecovery) {
        return <PasswordReset />;
    }

    if (path === "/reset-password") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050814] text-white">
                <div className="max-w-md text-center p-4">
                    <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
                    <p className="text-slate-400">
                        This page can only be accessed through the secure password reset link
                        sent to your email.
                    </p>
                </div>
            </div>
        );
    }

    return <Layout />;
}
