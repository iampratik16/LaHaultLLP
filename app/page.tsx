import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Properties } from "@/components/sections/Properties";
import { Amenities } from "@/components/sections/Amenities";
import { StickyBookingBar } from "@/components/booking/StickyBookingBar";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      {/* Amrit Palace Inspired Creative Break */}
      <div className="bg-white py-12 md:py-24 overflow-hidden border-y border-charcoal/5">
        <InfiniteMarquee text="Uncompromised Luxury • Immersive Wilderness • Curated Sanctuaries • " speed={25} />
        <InfiniteMarquee text="Elevate Your Senses • Redefine Hospitality • Bespoke Experiences • " speed={35} direction="right" className="mt-8 md:mt-16" />
      </div>

      <Properties />
      <Amenities />

      {/* Global Bottom Sticky Bar for conversion */}
      <StickyBookingBar />
    </>
  );
}
