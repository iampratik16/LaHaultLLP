"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Waves, Wine, Leaf, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const experiences = [
    { icon: Leaf, title: "Holistic Wellness", desc: "A sanctuary for mind, body, and spirit featuring world-class spa facilities." },
    { icon: UtensilsCrossed, title: "Michelin Dining", desc: "Culinary masterpieces curated by globally recognized executive chefs." },
    { icon: Wine, title: "Curated Cellars", desc: "Exclusive tastings of rare vintages in our subterranean vaults." },
    { icon: Waves, title: "Private Shores", desc: "Uninterrupted access to secluded beaches with dedicated cabana service." },
];

export function Amenities() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax logic: left image moves up quicker, right image moves down
    const yLeft = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const yRight = useTransform(scrollYProgress, [0, 1], [-50, 100]);
    // Zoom logic: Images slowly scale up as you scroll past
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    return (
        <section ref={containerRef} id="experiences" className="py-24 md:py-32 bg-charcoal text-off-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

                {/* Typographic Left Block */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-8">
                        Curated Experiences
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.1] mb-12">
                        Immerse yourself in extraordinary moments.
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {experiences.map((exp, i) => (
                            <div key={exp.title} className="flex flex-col gap-4">
                                <exp.icon className="w-8 h-8 text-gold stroke-[1.5]" />
                                <h3 className="uppercase tracking-widest text-sm font-semibold">{exp.title}</h3>
                                <p className="text-white/50 text-xs leading-relaxed">{exp.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 h-[600px] md:h-[800px]">
                    <motion.div
                        style={{ y: yLeft }}
                        className="w-full h-[80%] bg-white/5 mt-16 md:mt-32 relative overflow-hidden"
                    >
                        <motion.div style={{ scale }} className="absolute inset-0 origin-center">
                            <Image src="/amenities_dining_1772187560893.png" alt="Michelin Dining" fill className="object-cover" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        style={{ y: yRight }}
                        className="w-full h-[80%] bg-white/10 mb-16 md:mb-32 relative overflow-hidden"
                    >
                        <motion.div style={{ scale }} className="absolute inset-0 origin-center">
                            <Image src="/amenities_spa_1772187575426.png" alt="Tranquil Spa" fill className="object-cover" />
                        </motion.div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
