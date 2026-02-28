"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealMaskProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    className?: string;
}

export function RevealMask({
    children,
    direction = "up",
    delay = 0,
    className = "",
}: RevealMaskProps) {
    const blockVariants = {
        hidden: { y: "0%", x: "0%" },
        visible: {
            y: direction === "up" ? "-100%" : direction === "down" ? "100%" : "0%",
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : "0%",
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1] as const, // Cinematic easing
                delay: delay,
            },
        },
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* The Solid Curtain Block */}
            <motion.div
                variants={blockVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="absolute inset-0 z-30 bg-[#f4f4f0]" // Off-white luxury curtain
            />

            {/* We apply a slight scale-down effect wrapped around the children for extra premium feel */}
            <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                    duration: 1.6,
                    ease: [0.22, 1, 0.36, 1] as const,
                    delay: delay,
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
