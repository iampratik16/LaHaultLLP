export interface Property {
    id: string;
    name: string;
    description: string;
    pricePerNight: number;
    imageUrl: string;
    features: string[];
}

export interface DateAvailability {
    date: string; // YYYY-MM-DD
    price: number;
    available: boolean;
}

// Mock Database
const properties: Property[] = [
    {
        id: "prop-1",
        name: "The Grand Suite",
        description: "Experience ultimate luxury with panoramic views.",
        pricePerNight: 850,
        imageUrl: "/grand-suite.jpg",
        features: ["Private Pool", "Butler Service", "Ocean View"],
    },
    {
        id: "prop-2",
        name: "Lake House Retreat",
        description: "A serene hideaway immersed in nature.",
        pricePerNight: 520,
        imageUrl: "/lakehouse-retreat.avif",
        features: ["Lake Access", "Fireplace", "Forest View"],
    }
];

// Helper to generate a month of mock dates
const generateMockCalendar = (year: number, month: number): DateAvailability[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendar: DateAvailability[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        // Randomize availability and surge pricing
        const isWeekend = new Date(year, month, i).getDay() === 0 || new Date(year, month, i).getDay() === 6;
        const basePrice = 500;

        calendar.push({
            date: dateStr,
            price: basePrice + (isWeekend ? 150 : Math.floor(Math.random() * 50)),
            available: Math.random() > 0.15, // 85% availability
        });
    }
    return calendar;
}

export const MockAPI = {
    getProperties: async (): Promise<Property[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(properties), 600);
        });
    },

    getAvailability: async (year: number, month: number): Promise<DateAvailability[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(generateMockCalendar(year, month)), 400);
        });
    }
};
