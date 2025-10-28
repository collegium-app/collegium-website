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
                        <h2 className="text-3xl font-bold text-white md:text-4xl">Your city, unfiltered.</h2>
                        <p className="mt-4 text-white/70">
                            Explore trending posts, and see what’s going on tonight.
                        </p>
                        <ul className="mt-6 space-y-2 text-white/70">
                            <li>• Real names. Real students.</li>
                            <li>• Find out what’s popping around you.</li>
                            <li>• Meet your people. Make new memories.</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                        className="order-1 md:order-2"
                    >
                        <img
                            src={headerImg1}
                            alt="Collegium feed"
                            className="mx-auto w-[400px] md:w-[460px] shadow-2xl"
                        />
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
                        <img
                            src={headerImg2}
                            alt="Collegium events"
                            className="mx-auto w-[400px] md:w-[460px] shadow-2xl"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                        className="order-2"
                    >
                        <h2 className="text-3xl font-bold text-white md:text-4xl">Plan. Post. Pull up.</h2>
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
