"use client";

import React from "react";
import {Orbitron} from "next/font/google";

// Load Orbitron Bold 800
const orbitronBold = Orbitron({ weight: "800", subsets: ["latin"] });

export interface SlidingTextProps {
  /** The text to display */
  text: string;
  /** Outline (stroke) color (default: "#c2a063") */
  strokeColor?: string;
  textSize?: string;
  uppercase?: boolean;
}

const SlidingText: React.FC<SlidingTextProps> = ({
  text,
  strokeColor = "#c2a063",
  textSize,
  uppercase,
}) => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div className="flex animate-marquee">
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className={`${textSize ?? "text-6xl"} ${
              uppercase !== false ? "uppercase" : ""
            } px-8 ${orbitronBold.className}`}
            style={{
              WebkitTextStroke: `1px ${strokeColor}`,
              color: "transparent",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SlidingText;