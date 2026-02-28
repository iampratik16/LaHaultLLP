"use client";

import { motion } from "framer-motion";

interface SplitTextRevealProps {
    text: string;
    className?: string;
}

export function SplitTextReveal({ text, className = "" }: SplitTextRevealProps) {
    // Split the text into lines (assuming <br /> or newlines)
    const lines = text.split(/<br\s?\/?>|\n/);

    return (
        <div className={className}>
            {lines.map((line, i) => (
                <div key={i} className="overflow-hidden leading-[1.1] pb-2">
                    <motion.div
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1], // Cinematic custom bezier curve
                            delay: i * 0.15, // Stagger effect
                        }}
                    >
                        {line}
                    </motion.div>
                </div>
            ))}
        </div>
    );
}
