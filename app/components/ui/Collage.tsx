// components/ui/CollageRow.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface CollageItem {
    /** URL or path to the background image (from /public or an external URL) */
    imageSrc: string;
    /** The label to display below the icon */
    title: string;
    /** A React node for the icon (e.g. <FaUsers /> or any other icon) */
    icon: React.ReactNode;
    /** Optional: if provided, the entire tile becomes a clickable Link */
    href?: string;
}

interface CollageRowProps {
    items: CollageItem[];
    className?: string;
    sectionTitle?: string;
    subtitle?: string;
    description?: string;
}

export default function CollageRow({
    items,
    className = "",
    sectionTitle,
    subtitle,
    description
}: CollageRowProps) {
    return (
        <div className={`w-full pb-20 ${className}`}>
            <div className="container mx-auto px-4">
                {(sectionTitle || subtitle || description) && (
                    <div className="mb-12 mt-0">
                        {sectionTitle && (
                            <>
                                <div className="flex justify-end mb-2">
                                    <span className="text-sm text-white uppercase tracking-wider">
                                        {subtitle}
                                    </span>
                                </div>
                                <div className="border-t border-gray-500 w-full mb-4" />
                                <h2 className="text-5xl font-bold text-white text-left mt-12">
                                    {sectionTitle}
                                </h2>
                            </>
                        )}

                        {description && (
                            <p className="text-lg text-gray-200 mt-2 font-jura max-w-3xl">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full">
                {items.map((item, idx) => {
                    const Content = (
                        <div className="relative w-full h-64 overflow-hidden rounded-none shadow-lg m-0 p-0">
                            <Image
                                src={item.imageSrc}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center space-y-2">
                                <div className="text-4xl text-[#7e61f8]">
                                    {item.icon}
                                </div>
                                <span className="text-xl text-white font-semibold">
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    );

                    if (item.href) {
                        return (
                            <Link key={idx} href={item.href} className="block">
                                {Content}
                            </Link>
                        );
                    }

                    return <div key={idx}>{Content}</div>;
                })}
            </div>
        </div>
    );
}