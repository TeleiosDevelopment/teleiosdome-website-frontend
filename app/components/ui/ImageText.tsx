import React from "react";
import Image from "next/image";
import Button from "./Button";

interface ImageTextProps {
  sectionTitle?: string;
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref: string;
}

export default function ImageText({
  sectionTitle,
  title,
  description,
  imageSrc,
  buttonText,
  buttonHref,
}: ImageTextProps) {
  return (
    <section className="relative bg-transparent py-20 px-6 text-white">
      {/* Section title / overline */}
      {sectionTitle && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-end mb-2">
            <span className="text-sm uppercase tracking-wider">{sectionTitle}</span>
          </div>
          <div className="border-t border-gray-500 w-full mb-4" />
        </div>
      )}
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-8">
        {/* Text */}
        <div className="w-full md:w-3/4 text-center mx-auto">
          <h2 className="text-5xl md:text-5xl font-bold uppercase mb-6">
            {title}
          </h2>
          <p className="font-jura max-w-3xl">{description}</p>
        </div>
        {/* Image with geometric decorations */}
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full max-w-5xl mt-8 min-h-[200px]">
            <div
              className="absolute -top-4 sm:-top-5 -left-3 sm:-left-6 w-[40%] h-[40%] z-10 shadow-xl pointer-events-none opacity-60"
              style={{
                clipPath: 'inset(0 0 0 0)',
                background: 'linear-gradient(135deg, #b935a3, #7e61f8)'
              }}
            />
            <div
              className="absolute -bottom-4 sm:-bottom-5 -right-4 sm:-right-8 w-[45%] h-[45%] z-10 shadow-xl pointer-events-none opacity-70"
              style={{
                clipPath: 'inset(0 0 0 0)',
                background: 'linear-gradient(135deg, #702c6b, #d007a6)'
              }}
            />
            <div className="relative z-10 rounded w-full aspect-[18/9] overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          {/* Outline Button below image, centered */}
          <div className="mt-8 flex justify-center w-full">
            <Button href={buttonHref} text={buttonText} colored={false} />
          </div>
        </div>
      </div>
    </section>
  );
}