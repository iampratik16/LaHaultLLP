import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-charcoal text-off-white px-6 md:px-12 py-16 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-2">
                    <div className="relative w-40 h-24 mb-6">
                        <Image src="/logo.png" alt="La Hault Logo" fill className="object-contain object-left" />
                    </div>
                    <p className="text-sm text-beige/80 max-w-sm leading-relaxed mb-4">
                        Nestled in the heart of nature, our hotel in Sissu, Himachal Pradesh offers a serene escape where luxury meets tranquility.
                    </p>
                    <p className="text-sm text-beige/80 max-w-sm leading-relaxed">
                        A sanctuary where the mountains embrace you and time slows down. Your Himalayan escape awaits.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="uppercase tracking-widest text-sm mb-4 text-gold">Explore</h3>
                    <Link href="#residences" className="text-sm hover:text-gold transition-colors w-fit">Residences</Link>
                    <Link href="#experiences" className="text-sm hover:text-gold transition-colors w-fit">Experiences</Link>
                    <Link href="#about" className="text-sm hover:text-gold transition-colors w-fit">About Us</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="uppercase tracking-widest text-[10px] font-semibold mb-4 text-gold">Contact</h3>
                    <p className="text-sm hover:text-white transition-colors cursor-pointer">bookings@lahault.com</p>
                    <p className="text-sm hover:text-white transition-colors cursor-pointer">+91 62304 14883</p>
                    <p className="text-sm text-beige/60 mt-2">Sissu, Himachal Pradesh</p>
                    <div className="mt-8">
                        <input
                            type="email"
                            placeholder="Subscribe to Newsletter"
                            className="bg-transparent border-b border-beige/30 py-2 w-full text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-beige/50"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-beige/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] text-beige/40 uppercase tracking-[0.2em]">
                    &copy; {new Date().getFullYear()} La Hault. All Rights Reserved.
                </p>
                <div className="flex gap-4">
                    <Link href="#" className="text-xs text-beige/50 hover:text-gold uppercase tracking-wider">Privacy Policy</Link>
                    <Link href="#" className="text-xs text-beige/50 hover:text-gold uppercase tracking-wider">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
