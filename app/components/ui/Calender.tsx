// components/ui/CalendarSection.tsx
"use client";

import React, {useState} from "react";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import ArrowControl from "@/app/components/ui/ArrowControl";

function getCountryCode(country: string) {
  const map: Record<string, string> = {
    "Saudi Arabia": "SA",
    "Qatar": "QA",
    "UAE": "AE",
    "China": "CN",
    "Canada": "CA",
    "Spain": "ES",
    "Bahrain": "BH",
  };
  return map[country] ?? "";
}

// --------------------
//  Type Definitions
// --------------------

type TeleiosRound = {
    round: string;
    dateRange: string;
    country: string;
    city: string;
    flagSrc: string; // Path to flag image (e.g. "/flags/saudi_arabia.svg")
    link?: string;   // detail page
};

type VirtualRound = {
    round: string;
    date: string;
    link?: string;   // detail page
};

type CalendarPage = {
    teleios: TeleiosRound[];
    virtual: VirtualRound[];
};

// --------------------
//  Sample Data (You can move this to a JSON/DB as needed)
// --------------------

const calendarPages: CalendarPage[] = [
    {
        teleios: [
            {
                round: "R1",
                dateRange: "29 Jun – 15 Jul",
                country: "Saudi Arabia",
                city: "Jeddah",
                flagSrc: "/images/flags/saudi_arabia.svg",
                link: "/teleios-events/virtual-racing-series/saudi-arabia",
            },
            {
                round: "R2",
                dateRange: "29 Jun – 15 Jul",
                country: "Qatar",
                city: "Doha",
                flagSrc: "/images/flags/qatar.svg",
                link: "/teleios-events/virtual-gp/qatar",
            },
            {
                round: "R3",
                dateRange: "29 Jun – 15 Jul",
                country: "UAE",
                city: "Abu Dhabi",
                flagSrc: "/images/flags/uae.svg",
            },
            {
                round: "R4",
                dateRange: "29 Jun – 15 Jul",
                country: "China",
                city: "Shanghai",
                flagSrc: "/images/flags/china.svg",
            },
            {
                round: "R5",
                dateRange: "29 Jun – 15 Jul",
                country: "Canada",
                city: "Montreal",
                flagSrc: "/images/flags/canada.svg",
            },
            {
                round: "R6",
                dateRange: "29 Jun – 15 Jul",
                country: "Spain",
                city: "Barcelona",
                flagSrc: "/images/flags/spain.svg",
            },
            {
                round: "R7",
                dateRange: "29 Jun – 15 Jul",
                country: "Bahrain",
                city: "Sakhir",
                flagSrc: "/images/flags/bahrain.svg",
            },
        ],
        virtual: [
            { round: "R1", date: "18 July 2025", link: "/teleios-events/virtual-gp/r1" },
            { round: "R2", date: "25 July 2025", link: "/teleios-events/virtual-gp/r2" },
            { round: "R3", date: "11 August 2025", link: "/teleios-events/virtual-gp/r3" },
            { round: "R4", date: "19 September 2025", link: "/teleios-events/virtual-gp/r4" },
            { round: "R5", date: "14 October 2025", link: "/teleios-events/virtual-gp/r5" },
            { round: "R6", date: "24 October 2025", link: "/teleios-events/virtual-gp/r6" },
            { round: "R7", date: "21 November 2025", link: "/teleios-events/virtual-gp/r7" },
        ],
    },
    // You can duplicate or modify the next objects as “Page 2”, “Page 3”, etc.
    // { teleios: [...], virtual: [...] },
];

// --------------------
//  CalendarSection
// --------------------

export default function CalendarSection() {
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = calendarPages.length;
    const teleiosRounds = calendarPages[currentPage].teleios;
    const virtualRounds = calendarPages[currentPage].virtual;

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };
    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    return (
        <section className="w-full bg-[#0a0023] py-16 px-4 text-white">
            {/* Section Heading */}
            <div className="container mx-auto px-4">

                    <div className="mb-12 mt-0">
                        <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
              Teleios Calender
              </span>
                        </div>
                        <div className="border-t border-gray-500 w-full mb-4" />
                        <h2 className="text-5xl font-bold text-white text-center mt-12">
                            Teleios Calender                        </h2>
                    </div>
            </div>


            <div className="max-w-7xl mx-auto mb-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <h3 className="text-2xl font-semibold uppercase">Teleios 2025</h3>
              <h3 className="text-2xl font-semibold uppercase">Virtual Racing Series</h3>
            </div>

            {/* Combined Paired Rows */}
            <div className="max-w-7xl mx-auto space-y-2">
              {teleiosRounds.map((round, idx) => (
                <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Teleios cell */}
                  <Link href={round.link || '#'} className="block">
                    <div className="h-full grid grid-cols-[60px_1fr] items-stretch bg-[#2C1864]/80 rounded overflow-hidden hover:bg-[#38207d]/80 transition">
                      <div className="bg-[#7e61f8] flex items-center justify-center text-xl font-bold">
                        {round.round}
                      </div>
                      <div className="flex items-center space-x-4 px-4 py-3">
                        <ReactCountryFlag
                          countryCode={getCountryCode(round.country)}
                          svg
                          style={{ width: "32px", height: "24px", borderRadius: "2px" }}
                          aria-label={round.country}
                        />
                        <div>
                          <div className="text-sm text-gray-300">{round.dateRange}</div>
                          <div className="text-lg font-medium">{round.country}</div>
                          <div className="text-gray-400">{round.city}</div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Virtual cell */}
                  {virtualRounds[idx] ? (
                    <Link href={virtualRounds[idx].link || '#'} className="block">
                      <div className="h-full grid grid-cols-[60px_1fr] items-stretch bg-[#2C1864]/80 rounded overflow-hidden hover:bg-[#38207d]/80 transition">
                        <div className="bg-[#d007a6] flex items-center justify-center text-xl font-bold">
                          {virtualRounds[idx].round}
                        </div>
                        <div className="flex items-center px-4 py-3">
                          <div className="text-lg font-medium">{virtualRounds[idx].date}</div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex justify-center items-center space-x-4">
                {/* Previous Button */}
                <ArrowControl
                  direction="left"
                  onClick={handlePrev}
                  disabled={totalPages <= 1}
                />

                {/* Page Numbers */}
                <nav aria-label="Page navigation">
                    <ul className="inline-flex space-x-2">
                        {calendarPages.map((_, idx) => (
                            <li key={idx}>
                                <button
                                  onClick={() => setCurrentPage(idx)}
                                  className={`!w-8 !h-8 md:!w-10 md:!h-10 !p-0 !rounded-full ${
                                    idx === currentPage
                                      ? "bg-[#7e61f8] text-white"
                                      : "bg-[#2C1864]/50 text-gray-300 hover:bg-[#2C1864]/80"
                                  }`}
                                  aria-current={idx === currentPage ? "page" : undefined}
                                  aria-label={`Go to page ${idx + 1}`}
                                >
                                  {idx + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Next Button */}
                <ArrowControl
                  direction="right"
                  onClick={handleNext}
                  disabled={totalPages <= 1}
                />
            </div>
        </section>
    );
}