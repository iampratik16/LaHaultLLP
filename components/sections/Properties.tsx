"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { RevealMask } from "@/components/ui/RevealMask";
import { MockAPI, Property } from "@/lib/api";

export function Properties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        MockAPI.getProperties().then((data) => {
            if (active) {
                setProperties(data);
                setLoading(false);
            }
        });
        return () => { active = false; };
    }, []);

    return (
        <section id="residences" className="py-24 md:py-32 bg-white text-charcoal">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-4">
                            Curated Sanctuaries
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl max-w-lg leading-[1.1]">
                            Masterpieces of Living
                        </h2>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="hidden md:block uppercase tracking-widest text-xs border-b border-charcoal/30 pb-1 mt-6 md:mt-0 hover:border-gold hover:text-gold transition-colors"
                    >
                        Explore the Collection
                    </motion.button>
                </div>

                {loading ? (
                    <div className="h-[60vh] flex items-center justify-center">
                        <span className="text-xs uppercase tracking-widest text-charcoal/50 animate-pulse">Loading Residences...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {properties.map((prop, index) => (
                            <motion.div
                                key={prop.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="group cursor-pointer relative"
                            >
                                <RevealMask delay={index * 0.1} className="w-full aspect-[4/5]">
                                    <div className="relative w-full h-full overflow-hidden bg-charcoal/5">
                                        <div className="absolute inset-0 bg-charcoal transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-110 flex items-center justify-center">
                                            <Image src={prop.imageUrl} alt={prop.name} fill className="object-cover" />
                                        </div>

                                        {/* Quick View Overlay */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-start justify-end p-6 pointer-events-none z-10">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 shadow-xl">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </RevealMask>

                                {/* Glassmorphic Text Card */}
                                <div className="relative -mt-16 mx-4 md:mx-6 z-20 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:bg-white/95 group-hover:-translate-y-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-serif text-2xl md:text-3xl leading-tight pr-4">{prop.name}</h3>
                                        <div className="flex flex-col items-end text-right shrink-0">
                                            <span className="text-[9px] uppercase tracking-widest text-charcoal/50 font-semibold mb-1">Starting at</span>
                                            <span className="text-lg font-serif text-gold">€{prop.pricePerNight}</span>
                                        </div>
                                    </div>
                                    <p className="text-charcoal/60 text-sm mb-6 leading-relaxed max-w-sm">{prop.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {prop.features.map(f => (
                                            <span key={f} className="text-[9px] uppercase tracking-widest text-charcoal/80 bg-charcoal/5 border border-charcoal/10 px-3 py-1.5">{f}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
