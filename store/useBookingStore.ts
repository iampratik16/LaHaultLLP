import { create } from "zustand";

interface BookingState {
    checkIn: Date | null;
    checkOut: Date | null;
    adults: number;
    children: number;
    totalPrice: number | null;
    isModalOpen: boolean;
    setDates: (checkIn: Date | null, checkOut: Date | null) => void;
    setGuests: (adults: number, children: number) => void;
    setTotalPrice: (price: number | null) => void;
    setModalOpen: (isOpen: boolean) => void;
    clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    totalPrice: null,
    isModalOpen: false,

    setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
    setGuests: (adults, children) => set({ adults, children }),
    setTotalPrice: (price) => set({ totalPrice: price }),
    setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
    clearBooking: () => set({ checkIn: null, checkOut: null, adults: 2, children: 0, totalPrice: null }),
}));
