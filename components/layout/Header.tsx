"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/store/useBookingStore";

const links = [
    { name: "Residences", href: "#residences" },
    { name: "Experiences", href: "#experiences" },
    { name: "About", href: "#about" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const setModalOpen = useBookingStore((state) => state.setModalOpen);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[0.22,1,0.36,1] px-6 md:px-12",
                    isScrolled
                        ? "py-4 bg-charcoal/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
                        : "py-6 bg-gradient-to-b from-black/60 to-transparent border-b border-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="relative w-32 h-16 md:w-36 md:h-20 transition-transform duration-500 hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="La Hault - Your Harbour in the Hills"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/90 hover:text-gold transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-gold/90 backdrop-blur-sm border border-gold/50 text-white px-8 py-2.5 uppercase tracking-widest text-xs font-semibold hover:bg-gold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            Book
                        </button>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 bg-background text-foreground flex flex-col px-6 py-8"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <div className="relative w-32 h-16">
                                <Image src="/logo.png" alt="La Hault" fill className="object-contain object-left invert" />
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Close Menu"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-8 text-center flex-1 justify-center">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-serif text-4xl tracking-wide hover:text-gold transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-8">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setModalOpen(true);
                                    }}
                                    className="bg-charcoal text-white w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] border border-charcoal/20"
                                >
                                    Book Your Stay
                                </button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
