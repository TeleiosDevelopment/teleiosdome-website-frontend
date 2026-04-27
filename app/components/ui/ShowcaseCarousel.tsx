// Enable client rendering
"use client";

import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectCoverflow, Pagination} from "swiper/modules";
import Image from "next/image";
import Button from "./Button";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export interface ShowcaseSlide {
    title: string;
    description: string;
    imageSrc: string;
    ctaHref?: string;
    ctaText?: string;
    blurDataURL?: string;
}

interface ShowcaseCarouselProps {
    sectionTitle?: string;
    slides: ShowcaseSlide[];
}

const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({ sectionTitle, slides }) => {
    return (
        <section className="container mx-auto px-4 py-24 bg-transparent text-white text-center">
            {sectionTitle && (
                <div className="mb-12 mt-0">
                    <div className="flex justify-end mb-2">
                    <span className="text-sm text-white uppercase tracking-wider">
                        {sectionTitle}
                    </span>
                    </div>
                    <div className="border-t border-gray-500 w-full mb-4" />
                    <h2 className="text-5xl font-bold text-white text-center mt-12">
                        {sectionTitle}
                    </h2>
                </div>
            )}

            <Swiper
                modules={[Pagination, Autoplay, EffectCoverflow]}
                loop
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active"
                }}
                effect="coverflow"
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 200,
                    scale: 0.9,
                    modifier: 1,
                    slideShadows: false,
                }}
                grabCursor
                slidesPerView="auto"
                spaceBetween={40}
                centeredSlides
                className="relative overflow-visible"
                style={{
                    '--swiper-pagination-color': '#ffffff',
                    '--swiper-pagination-bullet-inactive-color': '#ffffff',
                    '--swiper-pagination-bullet-inactive-opacity': '0.3',
                    '--swiper-pagination-bullet-opacity': '1',
                } as React.CSSProperties}
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide
                        key={idx}
                        style={{ width: '70%', minWidth: '300px', transition: 'transform 0.5s' }}
                    >
                        <article
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${idx + 1} of ${slides.length}`}
                            className="flex flex-col items-center max-w-4xl mx-auto px-4"
                        >
                            {/* text block */}
                            <div className="text-center w-full md:max-w-3xl lg:max-w-4xl mx-auto">
                                <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4">
                                    {slide.title}
                                </h3>
                                <p className="text-lg font-jura whitespace-pre-line">{slide.description}</p>
                            </div>
                            {/* image block with adjacent previews */}
                            <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-lg z-0 mt-6">
                                {/* Main image */}
                                <Image
                                    src={slide.imageSrc}
                                    alt={slide.title}
                                    fill
                                    className="object-cover z-10"
                                    priority={idx === 0}
                                />
                            </div>



                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div

                className="swiper-pagination mt-12 w-1/2 mx-auto flex justify-center"
                aria-live="polite"
            ></div>
            {slides[0]?.ctaHref && slides[0]?.ctaText && (
                <div className="mt-6 mx-auto text-center w-1/2">
                    <Button href={slides[0].ctaHref} text={slides[0].ctaText} colored={true} />
                </div>
            )}
            <style jsx global>{`
                .swiper-pagination-bullet-active {
                  opacity: var(--swiper-pagination-bullet-opacity, 1);
                  background: #ff00c4;
                }
                .swiper-pagination {
                  position: static !important;
                }
            `}</style>
        </section>
    );
};

export default ShowcaseCarousel;