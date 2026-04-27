"use client";
import Image from "next/image";
import Button from "@/app/components/ui/Button";

interface Card {
  image: string;
  title: string;
  description: string;
  price?: number;
  link: string;
  buttonText?: string;
}

interface GeneralCardsProps {
  sectionTitle?: string;
  cards: Card[];
  showPrice?: boolean;
}

export default function GeneralCards({ sectionTitle, cards, showPrice = true }: GeneralCardsProps) {
  return (
    <section className="pt-12 pb-12 bg-[#0a0023]">
      <div className="container mx-auto px-4">
        {sectionTitle && (
          <div className="mb-12 mt-0">
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
        <div className="flex justify-center">
          <div className="w-full flex">
            <div
              className={`grid gap-8 w-full ${
                cards.length === 1
                  ? 'grid-cols-1'
                  : cards.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {cards.map((card, idx) => (
                <div key={idx} className="bg-[#2C1864C2] rounded-lg flex flex-col overflow-hidden h-full">
                <div className="card-image">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-60 rounded-t-lg"
                  />
                </div>
                <div className="flex flex-col justify-between h-full p-6">
                  <div className="card-content flex flex-col flex-1 items-center text-center">
                    <div className="min-h-[75px] px-4 py-2 text-center flex items-center justify-center">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-tight break-words">
                        {card.title}
                      </h3>
                    </div>
                    <div className="text-center flex items-center justify-center overflow-hidden sm:h-[150px] sm:overflow-hidden sm:text-ellipsis">
                      <p className="text-gray-300 font-jura whitespace-pre-line px-2">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-white font-bold mt-auto text-center w-full h-[80px] flex flex-col justify-center">
                    {showPrice && card.price !== undefined && (
                      <div className="mb-1">Price:&nbsp;AED&nbsp;{card.price}</div>
                    )}
                    <div className="flex justify-center">
                      <Button href={card.link} text={card.buttonText || "BOOK NOW"} colored />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
