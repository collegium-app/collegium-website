import React from "react";
import { motion } from "framer-motion";
import headerImg1 from "../assets/screen1.png";
import headerImg2 from "../assets/screen2.png";

const Body = () => {
    return (
        <section id="learn" className="bg-[#0b0b0f] px-6 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                        className="order-2 md:order-1"
                    >
                        <h2 className="text-3xl font-bold text-white md:text-4xl">Your campus, unfiltered.</h2>
                        <p className="mt-4 text-white/70">
                            Trending posts by major & city. Join private groups. See what’s happening tonight.
                        </p>
                        <ul className="mt-6 space-y-2 text-white/70">
                            <li>• Real names. Real students.</li>
                            <li>• Invite friends into your circle.</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                        className="order-1 md:order-2"
                    >
                        <img src={headerImg1} alt="Collegium feed" className="mx-auto w-full max-w-xs rounded-2xl border border-white/10 shadow-2xl" />
                    </motion.div>
                </div>

                <div className="mt-20 grid items-center gap-10 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                        className="order-1"
                    >
                        <img src={headerImg2} alt="Collegium events" className="mx-auto w-full max-w-xs rounded-2xl border border-white/10 shadow-2xl" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                        className="order-2"
                    >
                        <h2 className="text-3xl font-bold text-white md:text-4xl">Plan. Pull up. Post.</h2>
                        <p className="mt-4 text-white/70">
                            Events without the hassle. You plan it, Collegium makes it real.
                        </p>
                        <p className="mt-2 text-white/60">Miss out? That’s on you.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Body;
