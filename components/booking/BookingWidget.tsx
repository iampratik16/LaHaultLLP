"use client";

import { DateCalendar } from "./DateCalendar";
import { GuestSelector } from "./GuestSelector";
import { useBookingStore } from "@/store/useBookingStore";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function BookingWidget() {
    const { totalPrice, checkIn, checkOut, setModalOpen } = useBookingStore();

    const handleBook = () => {
        if (!checkIn || !checkOut) {
            alert("Please select dates first.");
            return;
        }
        setModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl p-6 md:p-8 flex flex-col gap-6 w-full max-w-5xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-end">
                {/* Date Selection */}
                <div className="w-full">
                    <DateCalendar />
                </div>

                {/* Guest Selection */}
                <div className="w-full">
                    <GuestSelector />
                </div>

                {/* CTA & Price Summary */}
                <div className="w-full">
                    <button
                        onClick={handleBook}
                        className="w-full h-full min-h-[60px] bg-charcoal text-white flex items-center justify-between px-6 py-4 hover:bg-black transition-colors group"
                    >
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-xs tracking-widest uppercase text-white/70">
                                {totalPrice ? "Total estimated" : "Select dates"}
                            </span>
                            <span className="text-lg font-serif">
                                {totalPrice ? `€${totalPrice}` : "Book Now"}
                            </span>
                        </div>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
