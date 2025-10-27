import React, { useState } from "react";
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase.js";

export default function Apply() {
    const [email, setEmail] = useState("");
    const [nameAndSurname, setNameAndSurname] = useState("");
    const [uni, setUni] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [honeypot, setHoneypot] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setErr(null);

        if (honeypot.trim().length > 0) return;

        if (!email || !nameAndSurname || !uni) {
            setErr("Please fill all fields.");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from("waitlist_submissions").insert({
                name: nameAndSurname.trim(),
                email: email.trim(),
                university: uni.trim(),
                source: typeof window !== "undefined" ? window.location.href : null,
                user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
            });

            if (error) throw error;

            setSent(true);
            setEmail("");
            setNameAndSurname("");
            setUni("");
        } catch (e) {
            const msg = String(e?.message || "").toLowerCase();
            if (msg.includes("duplicate")) {
                setErr("You’re already on the list—watch your inbox!");
            } else {
                setErr("Something went wrong. Please try again in a moment.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="apply" className="bg-[#0b0b0f] px-4 py-16 sm:px-6">
            <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-2 text-white/80">
                    <Lock size={16} />
                    <span className="text-sm">Invite-only • Students only</span>
                </div>

                {!sent ? (
                    <>
                        {err && (
                            <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-200">
                                <AlertCircle className="mt-0.5" size={18} />
                                <p className="text-sm">{err}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <input
                                type="text"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                                className="hidden"
                                aria-hidden="true"
                            />

                            <div className="flex flex-col">
                                <label htmlFor="name" className="sr-only">
                                    Name and surname
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={nameAndSurname}
                                    onChange={(e) => setNameAndSurname(e.target.value)}
                                    placeholder="Name and surname"
                                    className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email (use your university email if possible)"
                                    className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>

                            <div className="flex flex-col sm:col-span-2">
                                <label htmlFor="university" className="sr-only">
                                    University
                                </label>
                                <input
                                    id="university"
                                    type="text"
                                    required
                                    value={uni}
                                    onChange={(e) => setUni(e.target.value)}
                                    placeholder="University"
                                    className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>

                            <div className="sm:col-span-2 mt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? "Submitting..." : "Request access"}
                                    {!loading && <ArrowRight size={18} />}
                                </button>
                                <p className="mt-2 text-center text-xs text-white/50">
                                    We only use this to contact you about early access. No spam, ever.
                                </p>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 py-6 text-white">
                        <CheckCircle2 size={28} className="text-emerald-400" />
                        <p className="text-center text-base">
                            Thanks! You’re on the list. We’ll email you if a spot opens at your campus.
                        </p>
                        <button
                            onClick={() => setSent(false)}
                            className="mt-2 text-sm text-white/70 underline underline-offset-4 hover:text-white"
                        >
                            Submit another response
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
