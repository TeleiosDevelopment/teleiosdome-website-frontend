"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import SlidingText from "@/app/components/ui/SlidingText";
import {faFacebookF, faInstagram, faTiktok, faYoutube,} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#4B1870] text-white px-6 py-12 font-orbitron">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 text-sm">
        {/* Brand and Description */}
        <div className="space-y-4">
          <Image src="/logo-dome.png" alt="Teleios Dome" width={120}
                 height={60} />
          <p className="font-jura">
            Experience the thrill of speed at Teleios Dome, offering dynamic group races and exclusive VIP experiences.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/people/Teleios-Dome/61561142146663/"
              target="_blank"
              rel="noreferrer"
              aria-label="Teleios Dome on Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} className="h-5 w-5 hover:text-[#1877f2]" />
            </a>
            <a
              href="https://www.instagram.com/teleios_dome/"
              target="_blank"
              rel="noreferrer"
              aria-label="Teleios Dome on Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 hover:text-[#e1306c]" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCr06C0u6WQdVO_kYi38W_4A"
              target="_blank"
              rel="noreferrer"
              aria-label="Teleios Dome on YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} className="h-5 w-5 hover:text-[#ff0000]" />
            </a>
            <a
              href="https://www.tiktok.com/@teleiosdome.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Teleios Dome on TikTok"
            >
              <FontAwesomeIcon icon={faTiktok} className="h-5 w-5 hover:text-white" />
            </a>
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g295424-d28054157-Reviews-Teleios_Dome-Dubai_Emirate_of_Dubai.html"
              target="_blank"
              rel="noreferrer"
              aria-label="Teleios Dome on TripAdvisor"
            >
              <Image src="/brand/tripadvisor.svg" alt="TripAdvisor" width={20} height={20} className="hover:opacity-80" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <Link href="/" className="hover:underline font-jura">Home</Link>
          <Link href="/experiences" className="hover:underline font-jura">Experiences</Link>
          <Link href="/teleios-events" className="hover:underline font-jura">Teleios Events</Link>
          <Link href="/education" className="hover:underline font-jura">Education</Link>
          <Link href="/the-venue" className="hover:underline font-jura">The Venue</Link>
          <Link href="/contacts" className="hover:underline font-jura">Contacts</Link>
        </div>

        {/* Location and Time */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Location & Time</h3>
          <p className="font-jura">
            <strong>Address:</strong><br />
            <a href="https://maps.app.goo.gl/RoqZPSTB114rvRfE9" target="_blank" rel="noreferrer">
              D-65 - Dubai Production City - Dubai, UAE
            </a>
          </p>
          <p className="font-jura">
            <strong>Timing:</strong><br />
            Tuesday – Sunday, 2PM to 11PM
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Get in Touch</h3>
          <p className="font-jura">
            <strong>Phone:</strong><br />
            <a href="tel:+971504804408" className="hover:underline">+971 50 480 4408</a>
          </p>
          <p className="font-jura">
            <strong>Email:</strong><br />
            <a href="mailto:info@teleios.ae" className="hover:underline">info@teleios.ae</a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
        <p className="font-jura">© {year} Teleios Dome. All Rights Reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms-conditions" className="hover:underline">Terms & Conditions</Link>
        </div>
      </div>
      <SlidingText text="Experience the thrill of speed at Teleios Dome, offering dynamic group races and exclusive VIP experiences." textSize="text-8xl" strokeColor = "#FFFF" />
    </footer>
  );
}