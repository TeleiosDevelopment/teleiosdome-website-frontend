"use client";

import React, {useState} from "react";

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    /** The HTML id for this section */
    id: string;
    /** Subtitle text to appear next to the section number */
    subtitle: string;
    /** Background color utility classes (e.g. "bg-white" or "bg-black") */
    bgColor?: string;
    /** Text color utility classes (e.g. "text-black" or "text-white") */
    textColor?: string;
    /** The array of FAQ items */
    faqs: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({
                                                   id,
                                                   subtitle,
                                                   bgColor = "bg-transparent",
                                                   textColor = "text-white",
                                                   faqs,
                                               }) => {
    // Track open FAQ indexes.
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);
    const toggle = (index: number) => {
        setOpenIndexes((prev) =>
            prev.includes(index) ? [] : [index]
        );
    };

    return (
        <section id={id} className={`${bgColor} ${textColor} py-16`}>
            <div className="container mx-auto px-4">
                <div className="mb-12 mt-0">
                    <div className="flex justify-end mb-2">
                        <span className="text-sm text-white uppercase tracking-wider">
                            {subtitle}
                        </span>
                    </div>
                    <div className="border-t border-gray-500 w-full mb-4" />
                    <h2 className="text-5xl font-bold text-white text-left mt-12">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndexes.includes(index);
                        return (
                            <div key={index} className="border-b border-gray-300 py-4">
                                <button
                                    type="button"
                                    className="flex justify-between items-center w-full text-left focus:outline-none"
                                    onClick={() => toggle(index)}
                                >
                                    <span className="font-semibold text-2xl block w-full">{faq.question}</span>
                                    <span
                                        className={`ml-2 faq-toggle-btn ${isOpen ? "open" : ""}`}
                                    />
                                </button>
                                <div
                                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                                    style={{ maxHeight: isOpen ? "400px" : "0" }}
                                >
                                    <p className="mt-3 text-lg leading-relaxed font-jura font-semibold">{faq.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
        .faq-toggle-btn {
          display: inline-block;
          transition: transform 0.25s, opacity 0.25s;
          opacity: 0.7;
          cursor: pointer;
          font-size: 1.5em;
          font-family: serif;
          line-height: 1;
        }
        .faq-toggle-btn:before {
          content: "+";
        }
        .faq-toggle-btn.open {
          transform: rotate(45deg);
          opacity: 1;
        }
      `}</style>

        </section>
    );
};

export default FaqSection;