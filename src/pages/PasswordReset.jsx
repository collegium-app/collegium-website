import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

function PasswordReset() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canReset, setCanReset] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY' && session) {
                setCanReset(true);
            }
        });

        supabase.auth.getSession().then(({ data }) => {
            if (data?.session) {
                setCanReset(true);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');

        if (!canReset) {
            setMessageType('error');
            setMessage('This reset link is invalid or has expired. Please request a new one.');
            return;
        }

        if (!newPassword || !confirmPassword) {
            setMessageType('error');
            setMessage('Please fill in both password fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessageType('error');
            setMessage('Passwords do not match.');
            return;
        }

        try {
            setIsSubmitting(true);
            const { data, error } = await supabase.auth.updateUser({ password: newPassword });

            if (error) {
                console.error('Password update error:', error);
                setMessageType('error');
                setMessage(error.message || 'There was an error updating your password.');
                return;
            }

            if (data) {
                setMessageType('success');
                setMessage('Your password has been updated. You can now log in to Collegium.');

                setNewPassword('');
                setConfirmPassword('');

                setTimeout(() => {
                    window.location.href = 'https://collegiumapp.com';
                }, 2500);
            }
        } catch (err) {
            console.error('Unexpected error updating password:', err);
            setMessageType('error');
            setMessage('Unexpected error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050814] bg-gradient-to-br from-[#050814] via-[#050814] to-[#15162b] px-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="text-xl uppercase tracking-[0.4em] text-white font-extrabold">
                        COLLEGIUM
                    </div>
                    <h1 className="mt-4 text-3xl font-semibold text-white">
                        Reset your password
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Choose a new password to secure your account.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-black/40">
                    {!canReset && (
                        <p className="mb-4 text-xs text-center text-amber-300">
                            Waiting for a valid recovery session. Make sure you opened this page from the password reset email link.
                        </p>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-200">
                                New password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter a strong password"
                                className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5C4DFF] focus:border-[#5C4DFF]"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-200">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                placeholder="Re-enter your password"
                                className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5C4DFF] focus:border-[#5C4DFF]"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !canReset}
                            className={`mt-2 inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#5C4DFF]/40 transition
                                ${isSubmitting || !canReset
                                ? 'bg-[#5C4DFF]/40 cursor-not-allowed'
                                : 'bg-[#5C4DFF] hover:bg-[#4b3de6]'
                            }
                            `}
                        >
                            {isSubmitting ? 'Updating…' : 'Reset password'}
                        </button>
                    </form>

                    {message && (
                        <p
                            className={`mt-4 text-center text-xs ${
                                messageType === 'success' ? 'text-emerald-300' : 'text-rose-300'
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    <p className="mt-4 text-center text-[11px] text-slate-500">
                        If you didn’t request a password reset, you can safely close this page.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
