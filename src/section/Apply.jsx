import React, { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

const Apply = () => {
    const [email, setEmail] = useState("");
    const [uni, setUni] = useState("");
    const [sent, setSent] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        // TODO: Connect API endpoint
        setSent(true);
    };

    return (
        <section id="apply" className="bg-[#0b0b0f] px-6 pb-24">
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="mb-6 flex items-center gap-2 text-white/80">
                    <Lock size={16} />
                    <span className="text-sm">Invite‑only • Students only</span>
                </div>
                {!sent ? (
                    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                        <input
                            type="text"
                            value={uni}
                            onChange={(e) => setUni(e.target.value)}
                            placeholder="University"
                            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-white/90"
                        >
                            Request access <ArrowRight size={18} />
                        </button>
                    </form>
                ) : (
                    <p className="text-center text-sm text-white/80">
                        Thanks. We’ll review and email you if a spot opens at your campus.
                    </p>
                )}
            </div>
        </section>
    );
};

export default Apply;
