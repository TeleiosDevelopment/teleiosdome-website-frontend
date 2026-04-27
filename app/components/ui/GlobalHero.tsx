"use client";

import React from "react";
import Image from "next/image";
import Button from "@/app/components/ui/Button";


export interface HeroSectionProps {
    imageSrc?: string;
    videoSrc?: string;
    title: string;
    subtitle?: string;
    height?: "full" | "half" | "custom" | "third";
    customHeight?: string;
    overlay?: "dark" | "light";
    blurIntensity?: string;
    /**
     * Sets the text color for the hero content.
     * Example: "text-white" or "text-black"
     */
    textColor?: string;
    /**
     * If false, no blur effect is applied to the overlay.
     */
    applyBlur?: boolean;
    /**
     * If true, apply stroked transparent style to the title text.
     */
    strokeTitle?: boolean;
    showButton?: boolean;
}

export default function GlobalHero({
                                       imageSrc,
                                       videoSrc,
                                       title,
                                       subtitle,
                                       height = "full",
                                       customHeight = "h-[75vh]",
                                       overlay = "dark",
                                       blurIntensity = "backdrop-blur-md",
                                       textColor = "text-white",
                                       applyBlur = true,
                                       strokeTitle = true,
                                       showButton,
                                   }: HeroSectionProps) {
    // Determine height class based on prop
    const heightClass =
        height === "full"
          ? "h-screen"
          : height === "half"
          ? "h-[50vh]"
          : height === "third"
          ? "h-[30vh]"
          : customHeight;

    // Determine overlay background based on prop
    const overlayBg = overlay === "dark" ? "bg-black/60" : "bg-white/40";


    return (
        <section className={`relative w-full ${heightClass} flex items-center justify-center`}>
            {/* Background Video or Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {videoSrc ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover pointer-events-none"
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    imageSrc ? (
                        <Image src={imageSrc} alt="Hero Background" fill className="object-cover" priority />
                    ) : null
                )}
                <div className={`absolute inset-0 ${overlayBg} ${applyBlur ? blurIntensity : ""}`}></div>
            </div>

            {/* Content */}
            <div
                className={`relative text-center z-10 px-6 ${
                  height === "half" || height === "third" ? "mt-8 md:mt-12" : "mt-48"
                } ${textColor}`}
            >
                <h1
                  className={`${
                    height === "half" || height === "third"
                      ? "text-2xl md:text-5xl"
                      : "text-4xl md:text-7xl"
                  } font-extrabold uppercase tracking-widest`}
                  style={strokeTitle ? { WebkitTextStroke: "1.5px white", color: "transparent" } : undefined}
                >
                  {title}
                </h1>
                {subtitle && (
                    <div className="mt-4 flex flex-col items-center justify-center gap-4">
                        <p className="text-sm md:text-xl text-white font-jura font-semibold tracking-wide text-center max-w-3xl">
                            {subtitle}
                        </p>
                        {showButton && (
                            <Button
                                href="/experiences"
                                text="Explore Experiences"
                                colored

                            />
                        )}
                    </div>
                )}
            </div>
            <div
                className="absolute inset-0 pointer-events-none opacity-90"
                style={{
                    backgroundImage: `repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 2px
          )`,
                    backgroundSize: "100% 2px",
                    animation: "scanlines 0.8s steps(2, end) infinite",
                }}
            />
            {/* style jsx for fill-anim removed */}
        </section>
    );
}