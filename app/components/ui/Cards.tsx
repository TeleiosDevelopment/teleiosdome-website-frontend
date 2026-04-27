"use client";
import Image from "next/image";
import Button from "@/app/components/ui/Button";

interface Card {
  image: string;
  title: string;
  description: string;
  price?: number;
  duration?: string;
  link: string;
  focus?: string;
}

interface CardsProps {
  sectionTitle?: string;
  cards: Card[];
}

export default function Cards({ sectionTitle, cards }: CardsProps) {
  return (
    <section className="pt-12 pb-12 bg-[#0a0023]">
      <div className="container mx-auto px-4">
        {sectionTitle && (
          <div className="mb-12 mt-0">
            <div className="flex justify-end mb-2">
              <span className="text-xl text-white uppercase tracking-wider">
                {sectionTitle}
              </span>
            </div>
            <div className="border-t border-gray-500 w-full mb-4" />

          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-[#2C1864C2] rounded-lg flex flex-col overflow-hidden">
              <div className="card-image">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
              </div>
              <div className="flex flex-col justify-between h-full p-6">
                <div className="card-content flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 font-jura flex-1 mb-4">
                    {card.description}
                  </p>
                  {card.focus && (
                    <p className="text-white/80 text-sm italic mb-4">Focus: {card.focus}</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center text-white bg-[#1a0e3a] font-bold px-4 py-3 rounded-lg gap-2">
                  <div className="text-sm text-center sm:text-left w-full sm:w-[200px] break-words">
                    {card.price !== undefined ? (
                      <span>Price:&nbsp;AED&nbsp;{card.price}</span>
                    ) : card.duration ? (
                      <span>Duration:&nbsp;{card.duration}</span>
                    ) : null}
                  </div>
                  <div className="w-full sm:w-[180px]">
                    <Button href={card.link} text="BOOK NOW" colored />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}