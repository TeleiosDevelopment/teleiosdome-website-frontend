"use client";

import React, {useState} from "react";

// Define the structure for each accordion item.
export interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

// Define the props for the MainAccordion component.
export interface MainAccordionProps {
    id: string;
    sectionNumber: number;
    subtitle: string;
    items: AccordionItem[];
    bgColor?: string;   // e.g., "bg-white" or "bg-gray-100"
    textColor?: string; // e.g., "text-black" or "text-gray-800"
}

/**
 * A separate component for a single accordion item that manages its own open state.
 * Each item can be opened/closed independently of others.
 */
const AccordionItemComponent: React.FC<{ item: AccordionItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <div className="border border-gray-300 rounded-md transition-colors hover:border-[#d007a6]">
            <button
                onClick={toggle}
                type="button"
                className="w-full px-4 py-3 flex justify-between items-center focus:outline-none"
            >
                <span className="font-semibold">{item.title}</span>
                <span className={`faq-toggle-btn ${isOpen ? "open" : ""}`} />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out px-4 ${
                    isOpen ? "py-3" : "max-h-0 overflow-hidden"
                }`}
            >
                <div className="mt-3 text-sm leading-relaxed">{item.content}</div>
            </div>
        </div>
    );
};

// MainAccordion renders a single column of accordion items.
const MainAccordion: React.FC<MainAccordionProps> = ({
                                                         id,
                                                         subtitle,
                                                         items,
                                                         bgColor = "bg-white",
                                                         textColor = "text-black",
                                                     }) => {
    return (
        <section id={id} className={`${bgColor} ${textColor} py-16`}>
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                {subtitle && (
                    <div className="mb-12 mt-0">
                        <div className="flex justify-end mb-2">
                            <span className="text-sm text-white uppercase tracking-wider">
                                {subtitle}
                            </span>
                        </div>
                        <div className="border-t border-gray-500 w-full mb-4" />
                        <h2 className="text-5xl font-bold text-white text-left mt-12">
                            {subtitle}
                        </h2>
                    </div>
                )}
                {/* Accordion Items: Each item is rendered using its own internal state */}
                <div className="space-y-4  font-jura">
                    {items.map((item, idx) => (
                        <AccordionItemComponent key={idx} item={item} />
                    ))}
                </div>
            </div>

            <style jsx>{`
        .faq-toggle-btn {
          position: relative;
          display: inline-block;
          width: 1em;
          height: 1em;
          text-align: center;
          line-height: 1;
          font-family: serif;
          font-size: 1.5em;
          transition: transform 0.25s ease, opacity 0.25s ease;
          opacity: 0.7;
          cursor: pointer;
        }
        .faq-toggle-btn:before {
          content: "+";
          display: block;
        }
        .faq-toggle-btn.open {
          transform: rotate(45deg);
          opacity: 1;
        }
        .faq-toggle-btn:hover {
          opacity: 1;
        }
      `}</style>
        </section>
    );
};

export default MainAccordion;