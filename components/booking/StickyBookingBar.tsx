"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function StickyBookingBar() {
    const { checkIn, checkOut, totalPrice, adults, children } = useBookingStore();
    const [isVisible, setIsVisible] = useState(false);

    // Show only when scrolled past hero
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 800);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-charcoal/10 shadow-start p-4 md:p-6 flex items-center justify-between md:justify-center md:gap-12"
                >
                    <div className="hidden md:flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-charcoal/60">Dates</span>
                        <span className="text-sm font-semibold">
                            {checkIn && checkOut
                                ? `${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d')}`
                                : "Select Dates"
                            }
                        </span>
                    </div>

                    <div className="hidden md:flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-charcoal/60">Guests</span>
                        <span className="text-sm font-semibold">{adults + children} Guests</span>
                    </div>

                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-widest text-charcoal/60">Total</span>
                            <span className="text-lg font-serif">
                                {totalPrice ? `€${totalPrice}` : "---"}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                if (!checkIn || !checkOut) { alert("Please select dates first."); return; }
                                useBookingStore.getState().setModalOpen(true);
                            }}
                            className="bg-charcoal text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-black transition-colors shrink-0"
                        >
                            Book
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
