"use client";

import Image from "next/image";
import Button from "@/app/components/ui/Button";

interface CardHor {
  image: string;
  title: string;
  description: string;
  link?: string;
}

interface CardsHorProps {
  sectionTitle?: string;
  cards: CardHor[];
}

export default function CardsHor({ sectionTitle, cards }: CardsHorProps) {
  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        {sectionTitle && (
          <div className="mb-12">
            <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
                {sectionTitle}
              </span>
            </div>
            <div className="border-t border-gray-500 w-full mb-4" />
            <h2 className="text-5xl font-bold text-white text-left mt-12">
              {sectionTitle}
            </h2>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="relative w-full md:h-[420px] rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
              <div className="z-20 flex flex-col p-6 text-white bg-black md:w-1/2 md:p-8 md:justify-center relative">
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                <div className="relative z-20">
                  <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                  <p className="max-w-3xl text-lg font-jura mb-6">{card.description}</p>
                  {card.link ? (
                    <div className="w-full flex justify-end">
                      <Button href={card.link} text="ENQUIRY NOW" colored />
                    </div>
                  ) : (
                    <div className="w-full flex justify-center"></div>
                  )}
                </div>
              </div>
              <div className="relative w-full h-[240px] md:h-full md:w-1/2">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover w-full h-full md:w-full md:h-full"
                />
                <div className="md:absolute md:inset-0 md:bg-gradient-to-r md:from-black md:to-transparent md:z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}