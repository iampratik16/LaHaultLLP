"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";

import { InteractiveGallery } from "@/components/ui/InteractiveGallery";

export function About() {
    return (
        <section id="about" className="py-32 md:py-48 px-6 md:px-12 bg-off-white text-charcoal">
            <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">

                {/* Text Section Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-10"
                >
                    <div className="max-w-2xl">
                        <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-8">
                            The Philosophy
                        </span>
                        <SplitTextReveal
                            text="A sanctuary crafted<br/>for the senses."
                            className="font-serif text-4xl md:text-5xl lg:text-7xl mb-8 text-charcoal"
                        />
                    </div>
                    <div className="max-w-md pb-4">
                        <p className="text-charcoal/70 leading-relaxed text-sm md:text-base mb-8">
                            Every detail at Lahault is meticulously designed to create an atmosphere of profound serenity and cinematic elegance. We redefine hospitality through the lens of art and uncompromised luxury.
                        </p>
                        <button className="self-start uppercase tracking-widest text-xs font-semibold border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors">
                            Discover Our Story
                        </button>
                    </div>
                </motion.div>

                {/* Interactive Dynamic Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-[50vh] md:h-[70vh] shadow-2xl"
                >
                    <InteractiveGallery />
                </motion.div>

            </div>
        </section>
    );
}
