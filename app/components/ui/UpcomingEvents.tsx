'use client';

import * as React from 'react';
import type {Swiper as SwiperType} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import ArrowControl from './ArrowControl';
import Button from './Button';
import Image from 'next/image';

const events: EventType[] = [



  {
    id: 1,
    image: "/dome_placeholder.png",
    headline: (
      <>
        VRS
        <br />
        SPA
      </>
    ),
    description: "Join our virtual racing series night open to all skill levels",
    date: "24th July 2025",
    whatsapp: "Hi, I’m interested in booking a slot for the SPA VRS",
  },

  {
    id: 2,
    image: "/dome_placeholder.png",
    headline: (
      <>
        VRS
        <br />
        Hungaroring
      </>
    ),
    description: "Join our virtual racing series night open to all skill levels",
    date: "31st July 2025",
    whatsapp: "Hi, I’m interested in booking a slot for the Hungaroring VRS",
  },

  {
    id: 3,
    image: "/events/event4.webp",
    headline: (
      <>
        Endurance
        <br />
        Interlagos
      </>
    ),
    description: "TEAM UP & COMPETE with our endurance racing, open to all skill levels.",
    date: "6th August 2025",
    whatsapp: "Hi, I’m interested in booking a slot for the Interlagos Endurance",
  },
];

type EventType = {
  id: number;
  image: string;
  headline: React.ReactNode;
  description: string;
  date: string;
  whatsapp?: string;
};

interface UpcomingEventsProps {
  title?: string;
  whatsappPhone?: string;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ title, whatsappPhone = '971504804408' }) => {
    const swiperRef = React.useRef<SwiperType | null>(null);

    const [mounted, setMounted] = React.useState(false);
    const [expandedCardId, setExpandedCardId] = React.useState<number | null>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="container mx-auto px-4 py-16 bg-transparent">
            <div className="mb-12 mt-0">
                <div className="flex justify-end mb-2">
                        <span className="text-sm text-white uppercase tracking-wider">
                            Events Preview
                        </span>
                </div>
                <div className="border-t border-gray-500 w-full mb-4" />
                <h2 className="text-5xl font-bold text-white text-left mt-12">
                    {title ?? 'UPCOMING EVENTS'}
                </h2>

                <div className="flex justify-end mb-4 gap-4">
                    <ArrowControl direction="left" onClick={() => swiperRef.current?.slidePrev()} />
                    <ArrowControl direction="right" onClick={() => swiperRef.current?.slideNext()} />
                </div>
            </div>
            {mounted && (
                <Swiper
                    onSwiper={(swiper: SwiperType) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView={1}
                    centeredSlides={false}
                    spaceBetween={12}
                    loop={true}
                    breakpoints={{
                        0:    { slidesPerView: 1.2, spaceBetween: 12 },
                        480:  { slidesPerView: 1.4, spaceBetween: 12 },
                        640:  { slidesPerView: 1.7, spaceBetween: 12 },
                        768:  { slidesPerView: 3.2, spaceBetween: 12 },
                        1024: { slidesPerView: 4.2, spaceBetween: 12 },
                        1280: { slidesPerView: 4.7, spaceBetween: 12 },
                    }}
                >
                    {events.map((event) => {
                      const { id, image, headline, description, date, whatsapp } = event;
                      const whatsappMessage = whatsapp ? whatsapp : 'Hello, I would like to book this event.';
                      const whatsappLink = `https://api.whatsapp.com/send/?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;
                      return (
                        <SwiperSlide key={id}>
                            <div className="rounded-lg overflow-hidden flex flex-col bg-black/50 text-white min-h-[28rem]">
                                <div className="relative h-40 w-full">
                                  <Image
                                    src={image}
                                    alt="image"
                                    fill
                                    priority
                                    className="object-cover rounded-t-lg"
                                  />
                                </div>
                                <div className="p-6 grid grid-rows-[auto_auto_1fr_auto] gap-2 text-center flex-grow h-full">
                                  <div className="flex items-center justify-center p-2 bg-[#1a0e3a] rounded-lg">
                                    <h3 className="text-white font-bold text-xl">{headline}</h3>
                                  </div>
                                  <div className="w-full h-px bg-pink-500 my-0.5" />
                                  <div className="flex items-center justify-center text-white text-sm gap-2 font-jura p-2 bg-[#1a0e3a] rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                                    </svg>
                                    {date}
                                  </div>
                                  <div className="w-full h-px bg-pink-500 my-0.5" />
                                  <div className="overflow-hidden px-1 text-white text-base leading-relaxed font-jura bg-[#1a0e3a] p-2 h-full min-h-[6rem] rounded-lg">
                                    <p className={expandedCardId === id ? '' : 'line-clamp-4'}>{description}</p>
                                    {description.length > 80 && (
                                      <button
                                        className="text-pink-400 mt-2 underline text-sm"
                                        onClick={() => setExpandedCardId(expandedCardId === id ? null : id)}
                                      >
                                        {expandedCardId === id ? 'Read Less' : 'Read More'}
                                      </button>
                                    )}
                                  </div>
                                  <div className="mt-auto p-0 w-full rounded-none ">
                                    <Button
                                      href={whatsappLink}
                                      text="Book Now"
                                      colored
                                      newTab={true}
                                    />
                                  </div>
                                </div>
                            </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
            )}
        </section>
    );
}

export default UpcomingEvents;
