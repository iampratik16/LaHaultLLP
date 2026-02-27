"use client";

import { useState, useEffect, useCallback } from "react";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isPast, isBefore, isAfter, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";
import { cn } from "@/lib/utils";
import { MockAPI, DateAvailability } from "@/lib/api";

export function DateCalendar() {
    const { checkIn, checkOut, setDates, setTotalPrice } = useBookingStore();
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
    const [isOpen, setIsOpen] = useState(false);
    const [availabilityMonth1, setAvailabilityMonth1] = useState<DateAvailability[]>([]);
    const [availabilityMonth2, setAvailabilityMonth2] = useState<DateAvailability[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch mock data whenever month changes
    useEffect(() => {
        let active = true;
        const fetchAvailabilities = async () => {
            setIsLoading(true);
            const m1Data = await MockAPI.getAvailability(currentMonth.getFullYear(), currentMonth.getMonth());
            const nextMonth = addMonths(currentMonth, 1);
            const m2Data = await MockAPI.getAvailability(nextMonth.getFullYear(), nextMonth.getMonth());

            if (active) {
                setAvailabilityMonth1(m1Data);
                setAvailabilityMonth2(m2Data);
                setIsLoading(false);
            }
        };

        // Only fetch if calendar is open to save mocked requests (optional optimization)
        if (isOpen) {
            fetchAvailabilities();
        }

        return () => { active = false; };
    }, [currentMonth, isOpen]);

    // Handle calculating pricing whenever dates change or data is loaded
    useEffect(() => {
        if (checkIn && checkOut && availabilityMonth1.length > 0) {
            // Very basic mock calculation: sum up prices between checkIn and checkOut
            // In a real app we'd query the backend with specific date ranges for exact prices.
            const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Let's just mock an average rate of 650
            setTotalPrice(diffDays * 650);
        } else {
            setTotalPrice(null);
        }
    }, [checkIn, checkOut, setTotalPrice, availabilityMonth1]);

    const handleDateClick = (date: Date) => {
        if (isPast(date) && !isSameDay(date, new Date())) return;

        if (!checkIn) {
            setDates(date, null);
        } else if (checkIn && !checkOut) {
            if (isBefore(date, checkIn)) {
                setDates(date, null); // Reset start date if clicked before
            } else {
                setDates(checkIn, date);
            }
        } else if (checkIn && checkOut) {
            // Reset if both selected
            setDates(date, null);
        }
    };

    const isDateSelected = (date: Date) => {
        if (checkIn && isSameDay(date, checkIn)) return true;
        if (checkOut && isSameDay(date, checkOut)) return true;
        return false;
    };

    const isDateInRange = (date: Date) => {
        if (checkIn && checkOut) {
            return isAfter(date, checkIn) && isBefore(date, checkOut);
        }
        return false;
    };

    const getPriceForDate = (date: Date, m1: DateAvailability[], m2: DateAvailability[]) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const allPrices = [...m1, ...m2];
        const match = allPrices.find(d => d.date === dateStr);
        return match ? match.price : null;
    };

    const renderMonth = (monthDate: Date, availability: DateAvailability[]) => {
        const monthStart = startOfMonth(monthDate);
        const monthEnd = endOfMonth(monthStart);
        const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

        // Day headers
        const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        // Padding days for first week (start day of month)
        const paddingDays = Array.from({ length: monthStart.getDay() }).map((_, i) => i);

        return (
            <div className="w-full">
                <div className="text-center font-serif text-lg mb-6 text-charcoal">
                    {format(monthStart, 'MMMM yyyy')}
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-xs text-charcoal/50 uppercase tracking-widest py-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                    {paddingDays.map(p => (
                        <div key={`pad-${p}`} className="h-12" />
                    ))}
                    {days.map((day) => {
                        const past = isPast(day) && !isSameDay(day, new Date());
                        const selected = isDateSelected(day);
                        const inRange = isDateInRange(day);
                        // In a real app we verify availability, for now, fake some unavailable dates arbitrarily
                        const isUnavailable = past || (day.getDate() === 15 && monthDate.getMonth() % 2 === 0);
                        const price = getPriceForDate(day, availabilityMonth1, availabilityMonth2);

                        return (
                            <button
                                key={day.toISOString()}
                                disabled={isUnavailable}
                                onClick={() => handleDateClick(day)}
                                className={cn(
                                    "relative h-14 flex flex-col items-center justify-center transition-all",
                                    "text-sm",
                                    past ? "text-charcoal/20 cursor-not-allowed" : "cursor-pointer hover:bg-gold/10",
                                    selected ? "bg-charcoal text-white rounded-full font-semibold outline outline-2 outline-offset-2 outline-charcoal/30" : "",
                                    inRange ? "bg-charcoal/5" : "",
                                    isUnavailable && !past ? "line-through text-charcoal/30" : "text-charcoal",
                                    // if in range, round full on ends, bg square between
                                )}
                            >
                                <span className="z-10">{format(day, 'd')}</span>
                                {(price && !isUnavailable && !past) && (
                                    <span className={cn("text-[8px] mt-0.5", selected ? "text-white/80" : "text-charcoal/50")}>€{price}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

    const formatDisplayDate = (date: Date | null) => date ? format(date, 'MMM d') : "Add date";

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 border border-beige/30 hover:border-gold transition-colors bg-white/5 backdrop-blur-sm"
            >
                <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gold" />
                    <div className="text-left flex flex-col">
                        <span className="text-xs tracking-wider uppercase text-charcoal/60">Dates</span>
                        <span className="text-sm font-semibold text-charcoal">
                            {formatDisplayDate(checkIn)} - {formatDisplayDate(checkOut)}
                        </span>
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 left-0 md:left-auto md:w-[700px] mt-2 bg-white border border-charcoal/10 shadow-2xl z-50 p-6 md:p-8 rounded-sm"
                    >
                        <div className="flex justify-between items-center w-full mb-8">
                            <button onClick={prevMonth} className="p-2 hover:bg-black/5 rounded-full transition-colors hidden md:block">
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col md:flex-row gap-8 w-full">
                                {renderMonth(currentMonth, availabilityMonth1)}
                                <div className="hidden md:block w-px bg-charcoal/10" />
                                <div className="hidden md:block w-full">
                                    {renderMonth(addMonths(currentMonth, 1), availabilityMonth2)}
                                </div>
                            </div>

                            <button onClick={nextMonth} className="p-2 hover:bg-black/5 rounded-full transition-colors hidden md:block">
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Mobile next/prev controls */}
                            <div className="md:hidden flex gap-4 absolute top-8 right-6">
                                <button onClick={prevMonth} className="p-2 hover:bg-black/5 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
                                <button onClick={nextMonth} className="p-2 hover:bg-black/5 rounded-full"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-charcoal/10">
                            <button onClick={() => setDates(null, null)} className="text-xs uppercase tracking-widest text-charcoal/60 hover:text-charcoal underline underline-offset-4">
                                Clear Dates
                            </button>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-charcoal text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-black transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
