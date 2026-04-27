'use client';

import * as React from 'react';
import {motion, useInView} from 'framer-motion';
import type {Swiper as SwiperType} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import ArrowControl from './ArrowControl';
import {FaStar} from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Frederique De Sousa',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'Amazing racing simulator. Very good setup, nice immersion into your race. The staff is friendly and very professional.',
  },
  {
    id: 2,
    name: 'John Earl Valentin',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'If you’re an adrenaline junkie or simply an F1 fan looking for a thrilling experience in Dubai, Teleios Dome should be at the top of your list. This cutting-edge racing simulator venue offers an exhilarating experience for motorsport enthusiasts of all levels. Whether you’re a seasoned racer or a curious first-timer, the Dome has something for everyone.',
  },
  {
    id: 3,
    name: 'Lorenzo Bavelloni',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'The ultimate destination for F1 simulators worldwide. Friendly, welcoming staff and a vibrant community make every visit unforgettable. Enjoy premium drinks while watching your friends race, all set within a stunning interior designed for an exclusive, high-end experience tailored for racing and gaming enthusiasts.',
  },
  {
    id: 4,
    name: '3ain 3osha',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'You can only give this place a high rating. This place for car racing games, new and up to date. The hardware is very advanced. The cleanliness and tidiness of the place is pleasing. The staff is highly professional.',
  },
  {
    id: 5,
    name: 'Ammar Al Tayara',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'Amazing place to enjoy your time, the atmosphere, the food and the experience are great. You can drive your favorite Formula 1 car on your favorite track. Also you can enjoy watching F1 events.',
  },
  {
    id: 6,
    name: 'Alaa Tarawneh',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'One of the best places in UAE if not the whole world for real Sim Racing enthusiasts.',
  },
  {
    id: 7,
    name: 'Tony Taylor',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'Awesome place.. Very friendly staff.. well worth the cost.',
  },
  {
    id: 8,
    name: 'Scarlet 17',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'A must-do if you’re a Formula1 fan!! My daughter loved it.. she’s a big Lewis Hamilton fan and took the Silverstone track. Will be back!',
  },
  {
    id: 9,
    name: 'Abdulhamid Alhamwi',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'Great experience and amazing staff! Whether you\'re an F1 fan or not, this is the place for you.',
  },
  {
    id: 10,
    name: 'Yahia Al Ayat',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'The perfect racing simulation in UAE.',
  },
  {
    id: 11,
    name: 'George Machairas',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'I highly recommend this to anyone looking for a fun and immersive racing experience! The atmosphere was perfect, amazing simulators, dim lighting, top-notch facilities.',
  },
  {
    id: 12,
    name: 'Hakeem Al Hawary',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'First time I try these amazing simulators, and what an amazing experience. I would highly recommend all those who are into car racing. This place I could give it a 10 star if I can.',
  },
  {
    id: 13,
    name: 'Sam Caward',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'Amazing place, great atmosphere and the simulators were so fun. Would definitely recommend for a day out with friends.',
  },
  {
    id: 14,
    name: 'Mike Maina',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'It is an amazing spot. Beautiful and great to hang out.',
  },
  {
    id: 15,
    name: 'Sone Leh',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'Amazing experience can’t wait to be back again 👊👊👊💯',
  },
  {
    id: 16,
    name: 'Mirko Popovic',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'What a fantastic place to spend time and try an insanely real racing simulator. GT races were so good.',
  },
  {
    id: 17,
    name: 'JADH BIN',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'THE BEST SIMULATION EXPERIENCE. YOU CAN FEEL THE RACE. THIS PLACE IS WORTH ON MONEY. THE STAFFS ARE VERY FRIENDLY.',
  },
  {
    id: 18,
    name: 'Alois Vieujot',
    image: 'profile.jpg',
    rating: 5,
    feedback: 'Incredible place to spend countless hours with friends and family! Absolutely loved it!',
  }
];

const CustomerTestimonials: React.FC = () => {
  const swiperRef = React.useRef<SwiperType | null>(null);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Only include names with available images; others will use 'profile.jpg'
  const hasImage = ['john', 'lorenzo', 'alaa', 'ammar', 'yahia', 'george', 'hakeem' , 'jadh', 'alois','3ain', 'tony', 'mike'];
  const getImageSrc = (name: string) => {
    const firstName = name.split(' ')[0].toLowerCase();
    return hasImage.includes(firstName)
      ? `/reviews/${firstName}-profile.png`
      : '/profile.jpg';
  };
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 bg-transparent">
      <div className="mb-12 mt-0">
        <div className="flex justify-end mb-2">
                        <span className="text-sm text-white uppercase tracking-wider">
                            Customers Testimonies
                        </span>
        </div>

        <div className="border-t border-gray-500 w-full mb-4" />
        <h2 className="text-5xl font-bold text-white text-left mt-12">
          WHAT PEOPLE SAY ABOUT US
        </h2>


      <div className="flex justify-end mb-4 gap-4">
        <ArrowControl direction="left" onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowControl direction="right" onClick={() => swiperRef.current?.slideNext()} />
      </div>
      </div>
      <div ref={containerRef} className="relative min-h-[360px] md:min-h-[400px] lg:min-h-[420px]">
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Swiper
              onSwiper={(swiper: SwiperType) => {
                swiperRef.current = swiper;
              }}
              loop={true}
              spaceBetween={8}
              slidesPerView={1}
              breakpoints={{
                320: { slidesPerView: 1.15, spaceBetween: 10 },
                480: { slidesPerView: 1.3, spaceBetween: 12 },
                640: { slidesPerView: 1.5, spaceBetween: 12 },
                768: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 4.7, spaceBetween: 20 },
                1440: { slidesPerView: 5.2, spaceBetween: 20 },
                1920: { slidesPerView: 6.2, spaceBetween: 28 },
              }}
            >
              {testimonials.map(({ id, name, rating, feedback }) => (
                <SwiperSlide key={id}>
                  <div className="w-full h-full border border-gray-500 p-3 sm:p-4 rounded-lg flex flex-col justify-between min-h-[360px] sm:min-h-[420px]">
                    {/* Image + Name + Stars/Rating */}
                    <div className="flex items-center mb-2 min-h-[100px]">
                        <Image
                          src={getImageSrc(name)}
                          alt={name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />

                        <div className="w-full">
                          <h4 className="text-white font-bold text-lg leading-tight w-full">{name}</h4>
                          <div className="flex items-center space-x-1 mt-1 w-full">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-500'}`}
                              />
                            ))}
                            <span className="text-sm text-white ml-2">{rating}</span>
                          </div>
                        </div>
                    </div>
                    {/* Feedback text */}
                    <p
                      style={{ height: '350px' }}
                      className="text-white text-base sm:text-lg md:text-lg leading-relaxed font-jura overflow-hidden"
                    >
                      {feedback.length > 220 ? `${feedback.slice(0, 150)}...` : feedback}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default CustomerTestimonials;
