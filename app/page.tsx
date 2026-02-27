import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Properties } from "@/components/sections/Properties";
import { Amenities } from "@/components/sections/Amenities";
import { StickyBookingBar } from "@/components/booking/StickyBookingBar";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Properties />
      <Amenities />

      {/* Global Bottom Sticky Bar for conversion */}
      <StickyBookingBar />
    </>
  );
}
