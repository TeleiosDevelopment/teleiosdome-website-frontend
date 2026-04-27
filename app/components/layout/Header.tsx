"use client";

import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

// Header-specific navigation item type
interface HeaderNavItem {
    title: string;
    submenus?: HeaderNavItem[];
    subSubmenus?: { title: string; imageSrc?: string, blured? : boolean }[];
    url?: string;
    external?: boolean;
    clickable?: boolean;
    imageSrc?: string;
}

// MobileMenu expects subSubmenus as string[]
interface MobileNavItem {
    title: string;
    submenus?: MobileNavItem[];
    subSubmenus?: string[];
    url?: string;
    external?: boolean;
    imageSrc?: string;
}

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [isTransparent, setIsTransparent] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Updated header navigation
    const headerNavItems: HeaderNavItem[] = [
        { title: "Experiences", url: "/experiences" },
        { title: "Corporate & Private", url: "/corporate-groups",
            submenus: [
                { title: "Corporate Events" , url: "/corporate-groups/corporate" },
                { title: "Private Events", url: "/corporate-groups/private" },
            ],

        },
        {
            title: "Teleios Events", url: "/teleios-events",

            submenus: [
                { title: "Virtual Racing Series", url: "/teleios-events/virtual-racing-series" },
                { title: "Endurance", url: "/teleios-events/endurance" },
                // { title: "Watch Parties", url: "/teleios-events/watch-parties" },
            ],
        },
        {
            title: "Education", url: "/education",

            submenus: [
                { title: "Camps", url: "/education/camps" },
                { title: "Tour Package", url: "/education/factory-tour-package" },
                { title: "Training", url: "/education/driving-training" },
            ],
        },
        { title: "The Venue", url: "/the-venue" },
        { title: "Contacts", url: "/contacts" },
    ];

    // Derive a mobile-friendly version, converting subSubmenus to string[]
    const mobileNavItems: MobileNavItem[] = headerNavItems.map((item) => ({
        title: item.title,
        url: item.clickable === false ? undefined : item.url,
        external: item.external,
        imageSrc: item.imageSrc,
        submenus: item.submenus?.map((sub) => ({
            title: sub.title,
            url: sub.url,
            external: sub.external,
            imageSrc: sub.imageSrc,
            subSubmenus: sub.subSubmenus?.map((ss) => ss.title),
        })),
    }));

    // Handle scroll for hiding/showing the header
    const handleScroll = useCallback((): void => {
        const currentScrollY = window.scrollY;
        setIsScrollingUp(currentScrollY <= lastScrollY || currentScrollY <= 50);
        setIsTransparent(currentScrollY === 0);
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Prevent body scroll when overlay menus are open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    }, [isMobileMenuOpen]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isScrollingUp ? "translate-y-0" : "-translate-y-full"
                    } ${isTransparent
                        ? "bg-gradient-to-b from-black/90 to-transparent"
                        : "bg-black text-white shadow-lg"
                    }`}
            >
                {/* Desktop Header */}
                <div className="hidden lg:flex container mx-auto items-start justify-between px-4 py-4">
                    <div className="flex items-center space-x-10">
                        <div className="transform-none">
                          <Link href="/" aria-label="Home">
                              <Image
                                  src="/logo-dome.png"
                                  alt="Teleios Logo"
                                  priority
                                  width={128}
                                  height={31}
                                  sizes="(max-width: 768px) 120px, 144px"
                                  className="cursor-pointer"
                                  style={{ height: "auto" }}
                              />
                          </Link>
                        </div>
                        <nav className="flex space-x-8" aria-label="Main navigation">
                            {headerNavItems.filter(item => item.title !== "Book Now").map((item, idx) => (
                                <div
                                    key={idx}
                                    className="relative"
                                    onMouseEnter={() => setOpenIndex(idx)}
                                    onMouseLeave={() => setOpenIndex(null)}
                                >
                                    <Link
                                        href={item.url || "#"}
                                        className="text-sm text-white hover:text-[#d007a6] focus:outline-none"
                                    >
                                        <span className="flex items-center gap-1">
                                            {item.title}
                                            {item.submenus && item.submenus.length > 0 && (
                                                <svg className="w-3 h-3 text-white opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                                                </svg>
                                            )}
                                        </span>
                                    </Link>
                                    {item.submenus && item.submenus.length > 0 && (
                                        <div className={`absolute left-0 top-full mt-0 bg-black text-white text-sm rounded shadow-lg w-56 z-50
                                            transition duration-150
                                            ${openIndex === idx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                                            {item.submenus.map((sub, subIdx) => (
                                                <Link
                                                    key={subIdx}
                                                    href={sub.url || "#"}
                                                    className="block px-4 py-2 hover:bg-[#d007a6]"
                                                >
                                                    {sub.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Book Now Button */}
                    <Link
                        href="/booking/experiences/"
                        className="w-[140px] h-[44px] flex items-center justify-center bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white font-semibold text-[16px] leading-[22px] transition duration-300 rounded-tl-[12px] rounded-br-[12px] transform -skew-x-12"
                    >
                        <span className="skew-x-12">Book Now</span>
                    </Link>
                </div>

                {/* Mobile Header */}
                <div className="flex items-center justify-between px-4 py-2 lg:hidden container mx-auto">
                    <div className="w-1/3 flex justify-start">
                        {/* Menu button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                            className="p-2 focus:outline-none"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className="w-1/3 flex justify-center">
                        {/* Logo */}
                        <div className="transform-none">
                          <Link href="/" aria-label="Home">
                              <Image
                                  src="/logo-dome.png"
                                  alt="Teleios Logo"
                                  priority
                                  width={128}
                                  height={31}
                                  sizes="(max-width: 768px) 120px, 144px"
                                  className="cursor-pointer"
                                  style={{ height: "auto" }}
                              />
                          </Link>
                        </div>
                    </div>
                    <div className="w-1/3 flex justify-end">
                        {/* Book Now button */}
                        <Link
                            href="/booking/experiences/"
                            className="w-[100px] h-[36px] flex items-center justify-center bg-gradient-to-r from-[#d007a6] to-[#7e61f8] text-white text-xs font-semibold leading-[20px] transition duration-300 rounded-tl-[10px] rounded-br-[10px] transform -skew-x-12"
                        >
                            <span className="skew-x-12">Book Now</span>
                        </Link>
                    </div>
                </div>
            </header>


            {/* Mobile Menu */}
            {isMobileMenuOpen && <MobileMenu navItems={mobileNavItems} onClose={() => setIsMobileMenuOpen(false)} />}
        </>
    );
};

export default Header;
