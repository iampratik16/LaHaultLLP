"use client";

import { MessageCircle, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="flex flex-col gap-3"
                    >
                        {/* WhatsApp Connect */}
                        <a
                            href="https://wa.me/123456789"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-4 bg-white text-charcoal px-5 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase mt-0.5">WhatsApp</span>
                            <div className="bg-green-500 p-2 rounded-full text-white">
                                <Phone className="w-4 h-4" />
                            </div>
                        </a>

                        {/* Chatbot (Mock) */}
                        <button
                            onClick={() => alert("Connecting to Lahault AI Concierge...")}
                            className="flex items-center gap-4 bg-charcoal text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition-transform border border-white/10"
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase mt-0.5">AI Concierge</span>
                            <div className="bg-gold p-2 rounded-full text-white">
                                <MessageCircle className="w-4 h-4" />
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-gold rounded-full shadow-2xl flex items-center justify-center text-white"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
