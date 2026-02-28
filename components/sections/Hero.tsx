"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BookingWidget } from "@/components/booking/BookingWidget";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
    const ref = useRef(null);
    const { scrollY } = useScroll();

    // Parallax & Zoom Effects
    const y = useTransform(scrollY, [0, 1000], [0, 300]);
    const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
    const opacity = useTransform(scrollY, [0, 800], [1, 0]);

    return (
        <section ref={ref} className="relative h-[100svh] w-full flex items-center justify-center">
            {/* Background Media Container with overflow hidden */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                <motion.div
                    style={{ y, scale }}
                    className="absolute inset-0 origin-top"
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <Image
                        src="/heroimage.jpg"
                        alt="Cinematic Villa"
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
                style={{ opacity, y: useTransform(scrollY, [0, 500], [0, 100]) }}
                className="relative z-20 flex flex-col items-center justify-center w-full px-6 text-center mt-24"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest max-w-5xl leading-tight">
                        THE ART OF <br className="hidden md:block" /> ELEVATED LIVING
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="text-beige/80 mt-6 text-sm md:text-base tracking-[0.2em] uppercase max-w-xl"
                >
                    Cinematic beauty meets uncompromised luxury
                </motion.p>
            </motion.div>

            {/* Floating Booking Widget (Allowed to overflow safely) */}
            <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-[40%] md:translate-y-1/2 px-6 pb-6 md:pb-0 pointer-events-none">
                <div className="pointer-events-auto flex items-center justify-center">
                    <BookingWidget />
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
            >
                <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
}
