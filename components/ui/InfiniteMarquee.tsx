"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface InfiniteMarqueeProps {
    text: string;
    speed?: number;
    className?: string;
    direction?: "left" | "right";
}

export function InfiniteMarquee({
    text,
    speed = 20,
    className = "",
    direction = "left",
}: InfiniteMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Create 4 copies of the text to ensure smooth infinite looping across ultrawide monitors
    const content = Array(4).fill(text);

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-hidden flex whitespace-nowrap py-4 items-center ${className}`}
        >
            <motion.div
                className="flex gap-16 pr-16"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {content.map((item, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-16 font-serif uppercase tracking-widest text-4xl md:text-6xl text-gold/30 hover:text-gold transition-colors duration-500"
                    >
                        <span>{item}</span>
                        <span className="text-xl text-charcoal/20">✦</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
