"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryImage {
    id: string;
    url: string;
    title: string;
    subtitle: string;
}

const images: GalleryImage[] = [
    { id: "1", url: "/lahault3.jpeg", title: "The Atrium", subtitle: "Where light meets luxury" },
    { id: "2", url: "/lahault4.avif", title: "The Lounge", subtitle: "Curated comfort" },
    { id: "3", url: "/lahault5.avif", title: "The Cellar", subtitle: "Aged to perfection" },
    { id: "4", url: "/lahault10.jpg", title: "The Grounds", subtitle: "Immersive wilderness" },
];

export function InteractiveGallery() {
    // Open the first image by default, or none if you prefer a completely symmetric start
    const [activeId, setActiveId] = useState<string>("1");

    return (
        <div className="w-full h-full flex gap-2 md:gap-4 overflow-hidden rounded-xl p-2 bg-charcoal/5">
            {images.map((img) => {
                const isActive = activeId === img.id;

                return (
                    <motion.div
                        key={img.id}
                        layout
                        onMouseEnter={() => setActiveId(img.id)}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                            mass: 0.8
                        }}
                        className={cn(
                            "relative overflow-hidden cursor-pointer",
                            // When active it takes up flex point 4, otherwise shrinks to flex point 1
                            isActive ? "flex-[4]" : "flex-[1]"
                        )}
                        style={{ borderRadius: "0.5rem" }}
                    >
                        {/* 
                            We don't use object-cover directly on motion container because layout shift can warp it.
                            Instead, we use a slightly larger image inside that retains aspect ratio via object-cover.
                        */}
                        <div className="absolute inset-x-[-10%] inset-y-0 h-full">
                            <Image
                                unoptimized
                                src={img.url}
                                alt={img.title}
                                fill
                                className="object-cover transition-transform duration-[2s] ease-out hover:scale-105"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-60 mix-blend-multiply" />
                        </div>

                        {/* Text Content - Only beautifully visible when active */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20"
                                >
                                    <h3 className="text-white font-serif text-2xl md:text-4xl mb-2 dropdown-shadow">
                                        {img.title}
                                    </h3>
                                    <p className="text-gold text-xs tracking-widest uppercase font-semibold">
                                        {img.subtitle}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
