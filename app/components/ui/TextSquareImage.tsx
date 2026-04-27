import Button from './Button';
import React from "react";
import Image from "next/image";

interface TextSquareImageProps {
  sectionTitle?: string;
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  buttonHref?: string;
  reverseLayout?: boolean;
  bullets?: string[];
}

export default function TextSquareImage({
  sectionTitle,
  title,
  description,
  imageSrc,
  buttonText,
  buttonHref,
  reverseLayout,
  bullets,
}: TextSquareImageProps) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 bg-transparent text-white">
      {sectionTitle && (
        <div className="mb-12 mt-0">
          <div className="flex justify-end mb-2">
            <span className="text-sm text-white uppercase tracking-wider">
              {sectionTitle}
            </span>
          </div>
          <div className="border-t border-gray-500 w-full mb-4" />
        </div>
      )}

      <div className={`max-w-7xl mx-auto flex flex-col md:flex-row ${reverseLayout ? 'md:flex-row-reverse' : ''} items-center gap-12`}>
        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6">{title}</h2>
          {bullets ? (
            <ul className="list-disc pl-5 space-y-2 text-white font-jura max-w-2xl mb-10">
              {bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          ) : (
            <p className="font-jura max-w-2xl mb-10">{description}</p>
          )}
          {buttonText && buttonHref && (
            <div className="flex justify-center md:justify-start mt-10">
              <Button href={buttonHref} text={buttonText} colored={false} />
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-center items-center relative">
          <div className="relative w-full max-w-xl mx-auto ml-[-20px] md:ml-3">
            <div className="absolute top-4 left-4 w-full h-full bg-[#9b1c91] skew-y-3 z-0 rounded" />
            <div className="absolute top-8 left-8 w-full h-full bg-[#511f58] skew-y-3 z-[-1] rounded" />
            <div className="relative z-10 rounded w-full aspect-[16/9] overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}