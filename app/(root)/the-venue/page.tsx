import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
import Location from "@/app/components/ui/Location";
import ShowcaseCarousel from "@/app/components/ui/ShowcaseCarousel";
import CardsHor from "@/app/components/ui/CardsHor";
import FaqSection from "@/app/components/ui/FAQSection";

export const metadata: Metadata = {
  title: "Discover Teleios Dome Dubai: Premier Sim Racing Venue & Facilities",
  description:
    "Explore Teleios Dome, Dubai's ultimate sim racing destination. Discover our advanced simulators, massive event screen, barista, meeting room, and vibrant atmosphere.",
  keywords: [
    "Simracing venue Dubai",
    "Teleios Dome facilities",
    "race simulator location Dubai",
    "event space Dubai",
    "meeting room Teleios Dome",
    "Venue hire Dubai",
    "facility rental Dubai",
    "sim racing center Dubai",
    "Teleios Dome address"
  ],
  openGraph: {
    title: "Discover Teleios Dome Dubai: Premier Sim Racing Venue & Facilities",
    description:
      "Explore Teleios Dome, Dubai's ultimate sim racing destination. Discover our advanced simulators, massive event screen, barista, meeting room, and vibrant atmosphere.",
    url: "https://www.teleiosdome.com/the-venue",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "the venue - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Teleios Dome Dubai: Premier Sim Racing Venue & Facilities",
    description:
      "Explore Teleios Dome, Dubai's ultimate sim racing destination. Discover our advanced simulators, massive event screen, barista, meeting room, and vibrant atmosphere.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

const facilitySlides = [
  {
    title: "Your Brand, Our Venue",
    description: "Beyond our advanced simulators.",
    imageSrc: "/corporate/gallery/1.webp",

  },
  {
    title: "Comfortable Lounge",
    description:
        "Relax and recharge in our stylish lounge equipped with a full-service barista bar—perfect for socializing, watching the action, or hosting a casual toast.",
    imageSrc: "/corporate/gallery/3.webp",
  },
  {
    title: "Private Meeting Room",
    description: "Equipped with AV and presentation tools, perfect for briefings, strategy sessions, or breakout discussions during your event.",
    imageSrc: "/corporate/gallery/4.webp",
  },
  {
    title: "Giant Screen",
    description: "Showcase presentations, display race results, or live-stream your event on our massive venue-wide display screen.",
    imageSrc: "/the-venue/teleios-venue2.webp",
  },
  {
    title: "Flexible Event Layouts",
    description: "From racing-focused layouts to lounge-style setups, we adapt the space to suit your group’s size and purpose.",
    imageSrc: "/corporate/gallery/5.webp",
  },
];
const educationCards = [
  {
    image: "/the-venue/teleios-venue1.webp",
    title: "Cutting-Edge Simulators",
    description:
      "Experience racing like never before in our professionally engineered simulators. Designed with Motorsports drivers and engineers, they deliver unparalleled realism and feedback.",
  },
  {
    image: "/the-venue/teleios-venue2.webp",
    title: "Massive Event Screen",
    description:
      "Our giant 8 meter wide screen is perfect for motorsports watch parties, event branding, presentations, or live broadcasting of in-venue races. Excellent viewing from our lounge area.",
  },
  {
    image: "/the-venue/teleios-venue5.webp",
    title: "Barista Bar & Social Lounge",
    description:
      "Relax, recharge, or debrief your race with premium coffees, specialty teas, refreshing beverages, and delicious snacks from our on-site barista. A perfect spot to socialize and watch the action.",
  },
  {
    image: "/corporate/gallery/4.webp",
    title: "Versatile Meeting Room",
    description:
      "Our private meeting room can accommodate up to 12 people and is equipped with a TV and whiteboard. Ideal for corporate briefings, team strategy sessions, or private discussions.",
  },
];
const faqs = [
  {
    question: "Is there parking available?",
    answer: "Yes, ample free parking is available on-site.",
  },
  {
    question: "Is the venue accessible for people with disabilities?",
    answer:
      "Please contact us in advance if you have specific accessibility needs for simulator use, and we will do our best to accommodate.",
  },
  {
    question: "What is the minimum age to enter the venue / use the simulators?",
    answer: "No minimum age for general simulator use. Minimum height: 110cm required. Kids Camps: Younger children welcome. Spectators: Under supervision. See event/experience details for specifics.",
  },
  {
    question: "Can spectators come and watch?",
    answer:
      "Yes, spectators are welcome! Our lounge area provides good views of the action, and you can enjoy refreshments from our barista.",
  },
  {
    question: "Do you have Wi-Fi?",
    answer: "yes, free Wi-Fi is available for all our guests.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept the following payment methods: Cash, All major credit cards, All major debit cards.",
  },
];


export default function Page() {
  return (
   <>
     <GlobalHero
         title="The Venue"
         subtitle="Discover Teleios Dome Dubai: Premier Sim Racing Venue & Facilities"
         imageSrc="/corporate/DOME5.webp"
         height="third"
         strokeTitle={false}
     />
     <CardsHor
         sectionTitle="Premium Facilities & Amenities"
         cards={educationCards}
     />
     <ShowcaseCarousel
         sectionTitle="Explore Teleios Dome: A Visual Tour"
         slides={facilitySlides}
     />
     <Location />
     <FaqSection
         id="faqs"
         subtitle="Visiting Teleios Dome - Frequently Asked Questions"
         textColor="text-white"
         faqs={faqs}
     />
   </>
  );
}
