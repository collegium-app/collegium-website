import React, { useEffect, useMemo, useRef, useState } from "react";
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase.js";

const MAX_NAME_LEN = 80;
const MAX_UNI_LEN = 100;

const DISPOSABLE_DOMAINS = new Set([
    "mailinator.com","10minutemail.com","guerrillamail.com","yopmail.com",
    "tempmail.com","discard.email","trashmail.com"
]);

const EMAIL_RE =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

const SCRIPTY_RE = /(javascript:|<\s*script|onerror\s*=|onload\s*=|<\s*img[^>]*>)/i;
const URL_RE = /\bhttps?:\/\/|www\./i;

function stripControls(s) {
    // remove control chars except \n \r \t
    return s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}
function collapseSpace(s) {
    return s.replace(/\s+/g, " ").trim();
}
function sanitizeText(s, maxLen) {
    return collapseSpace(stripControls(String(s || "")).normalize("NFKC")).slice(0, maxLen);
}
function getDomain(email) {
    const at = email.lastIndexOf("@");
    if (at === -1) return "";
    return email.slice(at + 1).toLowerCase();
}

export default function Apply() {
    const [email, setEmail] = useState("");
    const [nameAndSurname, setNameAndSurname] = useState("");
    const [uni, setUni] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [honeypot, setHoneypot] = useState("");

    // anti-bot: require a few seconds on page
    const mountedAtRef = useRef(Date.now());
    const minSecondsOnPage = 3;

    // anti-replay: simple local rate limiter
    const RATE_LIMIT_KEY = "waitlist_last_submit_at";
    const RATE_WINDOW_MS = 60 * 1000;

    // precompute basic “safety” on current inputs (for early hints)
    const dangerHint = useMemo(() => {
        const n = nameAndSurname;
        const u = uni;
        if (SCRIPTY_RE.test(n) || SCRIPTY_RE.test(u)) return "Suspicious content detected.";
        if (URL_RE.test(n) || URL_RE.test(u)) return "Links are not allowed in these fields.";
        return null;
    }, [nameAndSurname, uni]);

    useEffect(() => {
        // small UX: clear global error when user edits inputs
        if (err) {
            const t = setTimeout(() => setErr(null), 1500);
            return () => clearTimeout(t);
        }
    }, [email, nameAndSurname, uni]);

    const submit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setErr(null);

        if (honeypot.trim().length > 0) return;

        const secondsHere = (Date.now() - mountedAtRef.current) / 1000;
        if (secondsHere < minSecondsOnPage) {
            setErr("Please take a moment to fill the form carefully, then try again.");
            return;
        }

        const last = Number(localStorage.getItem(RATE_LIMIT_KEY) || "0");
        if (Date.now() - last < RATE_WINDOW_MS) {
            setErr("You just submitted. Please wait a minute before trying again.");
            return;
        }

        if (!email || !nameAndSurname || !uni) {
            setErr("Please fill all fields.");
            return;
        }

        const cleanName = sanitizeText(nameAndSurname, MAX_NAME_LEN);
        const cleanUni  = sanitizeText(uni, MAX_UNI_LEN);
        const cleanEmail = sanitizeText(email, 254);

        if (!EMAIL_RE.test(cleanEmail)) {
            setErr("Enter a valid email address.");
            return;
        }
        const domain = getDomain(cleanEmail);
        if (DISPOSABLE_DOMAINS.has(domain)) {
            setErr("Disposable email domains are not allowed. Please use a real email.");
            return;
        }
        if (SCRIPTY_RE.test(cleanName) || SCRIPTY_RE.test(cleanUni)) {
            setErr("Suspicious content detected. Please remove any scripts or event handlers.");
            return;
        }
        if (URL_RE.test(cleanName) || URL_RE.test(cleanUni)) {
            setErr("Please don’t include links in your name or university.");
            return;
        }
        if (cleanName.length < 3) {
            setErr("Please enter your full name.");
            return;
        }
        if (cleanUni.length < 2) {
            setErr("Please enter your university.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: cleanName,
                email: cleanEmail,
                university: cleanUni,
                source: typeof window !== "undefined" ? window.location.href : null,
                user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
            };

            const { error } = await supabase
                .from("waitlist_submissions")
                .insert(payload, { returning: "minimal" });

            if (error) throw error;

            localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
            setSent(true);
            setEmail("");
            setNameAndSurname("");
            setUni("");
        } catch (e) {
            const msg = String(e?.message || "").toLowerCase();
            if (msg.includes("duplicate")) {
                setErr("You’re already on the list—watch your inbox!");
            } else if (msg.includes("policy") || msg.includes("rls")) {
                setErr("Submission blocked by security policy. If this is a mistake, contact support.");
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
                        {(err || dangerHint) && (
                            <div className={`mb-4 flex items-start gap-2 rounded-xl border p-3 ${
                                err
                                    ? "border-red-500/30 bg-red-500/10 text-red-200"
                                    : "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                            }`}>
                                <AlertCircle className="mt-0.5" size={18} />
                                <p className="text-sm">{err || dangerHint}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {/* Honeypot */}
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
                                    inputMode="text"
                                    autoComplete="name"
                                    maxLength={MAX_NAME_LEN}
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
                                    placeholder="Email"
                                    inputMode="email"
                                    autoComplete="email"
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
                                    inputMode="text"
                                    autoComplete="organization"
                                    maxLength={MAX_UNI_LEN}
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
                    </div>
                )}
            </div>
        </section>
    );
}
