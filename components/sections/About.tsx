"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";

export function About() {
    return (
        <section id="about" className="py-32 md:py-48 px-6 md:px-12 bg-off-white text-charcoal">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">

                {/* Text Column */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="md:col-span-5 flex flex-col justify-center"
                >
                    <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-8">
                        The Philosophy
                    </span>
                    <SplitTextReveal
                        text="A sanctuary crafted<br/>for the senses."
                        className="font-serif text-4xl md:text-5xl lg:text-7xl mb-8 text-charcoal"
                    />
                    <p className="text-charcoal/70 leading-relaxed text-sm md:text-base mb-12 max-w-md">
                        Every detail at Lahault is meticulously designed to create an atmosphere of profound serenity and cinematic elegance. We redefine hospitality through the lens of art and uncompromised luxury.
                    </p>
                    <button className="self-start uppercase tracking-widest text-xs font-semibold border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors">
                        Discover Our Story
                    </button>
                </motion.div>

                {/* Image Grid Column (Asymmetric) */}
                <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-8 h-[600px] md:h-[800px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full bg-charcoal/5 flex items-center justify-center relative overflow-hidden mt-12 md:mt-24 shadow-2xl"
                    >
                        <Image src="/about_asymmetric_1_1772187135701.png" alt="Lifestyle" fill className="object-cover" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full bg-charcoal/10 flex items-center justify-center relative overflow-hidden mb-12 md:mb-24 shadow-2xl"
                    >
                        <Image src="/about_asymmetric_2_1772187149887.png" alt="Architecture" fill className="object-cover" />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
