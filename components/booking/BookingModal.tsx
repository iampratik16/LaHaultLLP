"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { X, CheckCircle } from "lucide-react";
import { useEffect } from "react";

export function BookingModal() {
    const { isModalOpen, setModalOpen, checkIn, checkOut, adults, children, totalPrice, clearBooking } = useBookingStore();

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-white text-charcoal w-full max-w-lg shadow-2xl overflow-hidden relative"
                >
                    <button
                        onClick={() => setModalOpen(false)}
                        className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="p-8 md:p-12 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="w-8 h-8 text-gold" />
                        </div>

                        <h2 className="font-serif text-3xl mb-2">Reservation Confirmed</h2>
                        <p className="text-charcoal/60 text-sm mb-8">
                            Thank you for choosing Lahault. Your request has been securely placed. We look forward to welcoming you.
                        </p>

                        <div className="w-full bg-off-white border border-charcoal/10 p-6 text-left flex flex-col gap-4 mb-8">
                            <div className="flex justify-between items-center pb-4 border-b border-charcoal/10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Check In</span>
                                    <span className="font-semibold">{checkIn ? format(checkIn, 'MMM d, yyyy') : '--'}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Check Out</span>
                                    <span className="font-semibold">{checkOut ? format(checkOut, 'MMM d, yyyy') : '--'}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Guests</span>
                                    <span className="text-sm">{adults + children} Guests</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] uppercase tracking-widest text-charcoal/50">Estimated Total</span>
                                    <span className="font-serif text-2xl text-gold">€{totalPrice || '---'}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setModalOpen(false);
                                clearBooking();
                            }}
                            className="w-full bg-charcoal text-white py-4 uppercase tracking-widest text-xs hover:bg-black transition-colors"
                        >
                            Return to Landing
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
