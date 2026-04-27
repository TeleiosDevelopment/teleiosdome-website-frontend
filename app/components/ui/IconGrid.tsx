"use client";

import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "./Button";

interface IconGridItem {
    icon: IconDefinition;
    title: string;
    description: string;
}

interface IconGridProps {
    items: IconGridItem[];
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonHref?: string;
    showButton?: boolean;
}

const IconGrid: React.FC<IconGridProps> = ({ items, title, subtitle, buttonText, buttonHref, showButton }) => {
    return (
        <section id="driver-development" className="bg-transparent text-white py-16">
            <div className="container mx-auto px-4 text-center">
                {title && (
                    <div className="mb-12 mt-0">
                        <div className="flex justify-end mb-2">
                            <span className="text-sm text-white uppercase tracking-wider">
                                {title}
                            </span>
                        </div>
                        <div className="border-t border-gray-500 w-full mb-4" />
                        <h2 className="text-5xl font-bold text-white text-left mt-12">
                            {title}
                        </h2>
                        <p className="text-lg text-gray-400 mt-2 text-left">{subtitle}</p>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 justify-items-center">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`group p-6 border-gray-700 rounded-md transition flex flex-col items-center text-center ${
                                items.length % 2 === 1 && index === items.length - 1 ? 'md:col-span-2 md:w-1/2' : ''
                            }`}
                        >
                            <div className="mb-4 flex flex-col items-center group">
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    size="2x"
                                    className="text-white transition duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-300 font-jura">{item.description}</p>
                        </div>
                    ))}
                </div>
                {showButton && buttonHref && buttonText && (
                    <div className="mt-12 flex justify-center">
                        <div className="w-auto">
                            <Button href={buttonHref} text={buttonText} colored={true} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default IconGrid;