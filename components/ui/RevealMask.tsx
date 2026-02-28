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
    // Define the mask sweeping animation based on direction
    const variants = {
        hidden: {
            clipPath:
                direction === "up"
                    ? "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
                    : direction === "down"
                        ? "polygon(0 0, 100% 0, 100% 0, 0 0)"
                        : direction === "left"
                            ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
                            : "polygon(0 0, 0 0, 0 100%, 0 100%)",
        },
        visible: {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1] as const, // Cinematic easing
                delay: delay,
            },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className={`relative overflow-hidden ${className}`}
        >
            {/* We apply a slight scale-down effect wrapped around the children for extra premium feel */}
            <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                    duration: 1.6,
                    ease: [0.22, 1, 0.36, 1] as const,
                    delay: delay,
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
