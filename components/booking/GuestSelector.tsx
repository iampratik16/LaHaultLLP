"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { Users, Minus, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GuestSelector() {
    const { adults, children, setGuests } = useBookingStore();
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const totalGuests = adults + children;

    const updateGuests = (type: "adults" | "children", operation: "add" | "sub") => {
        let newAdults = adults;
        let newChildren = children;

        if (type === "adults") {
            newAdults = operation === "add" ? Math.min(6, adults + 1) : Math.max(1, adults - 1);
        } else {
            newChildren = operation === "add" ? Math.min(4, children + 1) : Math.max(0, children - 1);
        }

        setGuests(newAdults, newChildren);
    };

    return (
        <div className="relative" ref={selectorRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 border border-beige/30 hover:border-gold transition-colors bg-white/5 backdrop-blur-sm"
            >
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold" />
                    <div className="text-left flex flex-col">
                        <span className="text-xs tracking-wider uppercase text-charcoal/60">Guests</span>
                        <span className="text-sm font-semibold text-charcoal">{totalGuests} Guest{totalGuests > 1 ? "s" : ""}</span>
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-charcoal/10 shadow-2xl z-50 p-6 flex flex-col gap-6"
                    >
                        {/* Adults row */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-charcoal">Adults</span>
                                <span className="text-xs text-charcoal/60">Ages 13 or above</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => updateGuests("adults", "sub")}
                                    disabled={adults <= 1}
                                    className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal disabled:opacity-30 transition-colors hover:border-charcoal/50"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-4 text-center text-charcoal font-medium">{adults}</span>
                                <button
                                    onClick={() => updateGuests("adults", "add")}
                                    disabled={adults >= 6}
                                    className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal disabled:opacity-30 transition-colors hover:border-charcoal/50"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Children row */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-charcoal">Children</span>
                                <span className="text-xs text-charcoal/60">Ages 2-12</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => updateGuests("children", "sub")}
                                    disabled={children <= 0}
                                    className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal disabled:opacity-30 transition-colors hover:border-charcoal/50"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-4 text-center text-charcoal font-medium">{children}</span>
                                <button
                                    onClick={() => updateGuests("children", "add")}
                                    disabled={children >= 4}
                                    className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal disabled:opacity-30 transition-colors hover:border-charcoal/50"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-2 w-full bg-charcoal text-white py-3 text-xs uppercase tracking-widest hover:bg-black transition-colors"
                        >
                            Done
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
