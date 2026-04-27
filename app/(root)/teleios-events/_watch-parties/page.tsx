import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
import FaqSection from "@/app/components/ui/FAQSection";
import Testimonial from "@/app/components/ui/TestimonialSection";
import Button from "@/app/components/ui/Button";
import UpcomingEvents from "@/app/components/ui/UpcomingEvents";

export const metadata: Metadata = {
  title: "Motorsport Watch Parties in Dubai | Teleios Dome Big Screen Experience",
  description: "Experience live motorsport watch parties at Teleios Dome Dubai! Watch the race on our giant screen with amazing atmosphere, food, and fellow fans. Book your spot!",
  keywords: [
    "F1 watch party Dubai",
    "watch F1 big screen Dubai",
    "motorsport watch party Dubai",
    "Teleios Dome watch party",
    "live F1 screening Dubai",
    "Where to watch F1 near me Dubai",
    "sports bar big screen Dubai",
    "F1 fan zone Dubai"
  ],
  openGraph: {
    title: "Motorsport Watch Parties in Dubai | Teleios Dome Big Screen Experience",
    description: "Experience live motorsport watch parties at Teleios Dome Dubai! Watch the race on our giant screen with amazing atmosphere, food, and fellow fans. Book your spot!",
    url: "https://www.teleiosdome.com/teleios-events/watch-parties",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "watch parties - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motorsport Watch Parties in Dubai | Teleios Dome Big Screen Experience",
    description: "Experience live motorsport watch parties at Teleios Dome Dubai! Watch the race on our giant screen with amazing atmosphere, food, and fellow fans. Book your spot!",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

const faqs = [
  // {
  //   question: "Do I need to book for F1 watch parties?",
  //   answer: "Booking is mandatory as space is limited, especially for popular races.",
  // },
  {
    question: "Is there an entry fee?",
    answer: "There is an entry fee but it is entirely redeemable at the barista.",
  },
  {
    question: "What time should I arrive?",
    answer: "We recommend arriving 20-30 minutes before the race starts to get a good seat and soak in the pre-race atmosphere.",
  },
  {
    question: "Can I bring my own food or drinks?",
    answer: "Outside food and beverages are not permitted. We offer a great selection at our barista bar.",
  },
  // {
  //   question: "Do you show other motorsports besides F1?",
  //   answer: "While F1 is our main focus, we occasionally screen other major motorsport events like WEC races. Check our schedule!",
  // },
];


export default function Page() {
  return (
    <>
      <GlobalHero
        title="Motorsport Watch Parties at Teleios Dome"
        subtitle="Don't just watch the race, LIVE it on our massive screen with fellow fans, incredible sound, and unbeatable atmosphere right here in Dubai!"
        imageSrc="/the-venue/teleios-venue1.webp"
        height="third"
        strokeTitle={false}
      />

      <TextSquareImage
        sectionTitle="The Big Screen Experience"
        title="Immerse Yourself: Our Giant Screen & Sound System"
        description="Witness every overtake, pit stop, and dramatic moment on our 8 meters wide, crystal-clear screen. Complemented by our state-of-the-art surround sound system, you'll feel like you're right there at the track. It's the next best thing to being live at the Circuit!"
        imageSrc="/the-venue/teleios-venue2.webp"


      />

      <TextSquareImage
        sectionTitle="Atmosphere & Community"
        title="The Unbeatable Race Day Atmosphere"
        description="It's more than just watching a screen; it's about sharing the passion! Cheer with fellow fans, debate strategies, and celebrate victories together. Our watch parties create a vibrant, friendly, and electric atmosphere that makes every race an event to remember."
        imageSrc="/events/group4.webp"
        reverseLayout
      />

      <TextSquareImage
        sectionTitle="Food & Drink / Barista"
        title="Fuel Your Race Day: Barista Coffee, Drinks & Bites"
        description="Keep your energy levels up throughout the race! Our on-site barista serves premium coffees, teas, and a selection of refreshing beverages. We also offer a range of delicious snacks and light bites to enjoy while you watch."
        imageSrc="/events/watchparty1.webp"

      />

        <section id="upcoming-events"  className="bg-[#0a0023]">
          
            <UpcomingEvents />
        </section>

        <section id="how-to-participate" className="text-white py-16 px-4">
            <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">How to Join the Race Day Crowd</h2>
          <p className="text-lg font-jura mb-8 max-w-2xl mx-auto">
            To ensure the best experience and secure your spot, booking is necessary.
          </p>
            <Button
              href="https://wa.me/971504804408?text=I'm%20interested%20in%20booking%20a%20spot%20for%20the%20Watch%20Party%20at%20Teleios%20Dome"
              text="Book now!"
              colored
            />
        </div>
      </section>
      <Testimonial />

      <FaqSection
          id="faqs"
          subtitle="Watch Party - Frequently Asked Questions"
          textColor="text-white"
          faqs={faqs}
      />
    </>
  );
}
