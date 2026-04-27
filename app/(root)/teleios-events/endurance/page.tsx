import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
import IconGrid from "@/app/components/ui/IconGrid";
import {faCarSide, faClock, faExchangeAlt, faGasPump, faUsers} from "@fortawesome/free-solid-svg-icons";
import UpcomingEvents from "@/app/components/ui/UpcomingEvents";
import FaqSection from "@/app/components/ui/FAQSection";
import Testimonial from "@/app/components/ui/TestimonialSection";

export const metadata: Metadata = {
  title: "Teleios Endurance Sim Racing Series | Endurance Events Dubai",
  description: "Join the Teleios Endurance sim racing series in Dubai! Form a team and compete in challenging long-distance races requiring strategy, teamwork, and driver swaps at Teleios Dome.",
  keywords: [
    "Endurance sim racing Dubai",
    "team endurance race Dubai",
    "simracing endurance championship Dubai",
    "Teleios Endurance",
    "long distance sim race Dubai",
    "Pit stops sim racing Dubai",
    "sim racing strategy",
    "multi-driver sim race Dubai",
    "Teleios Dome team events"
  ],
  openGraph: {
    title: "Teleios Endurance Sim Racing Series | Endurance Events Dubai",
    description: "Join the Teleios Endurance sim racing series in Dubai! Form a team and compete in challenging long-distance races requiring strategy, teamwork, and driver swaps at Teleios Dome.",
    url: "https://www.teleiosdome.com/teleios-events/endurance",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "endurance - Teleios Dome"
      }
    ],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleios Endurance Sim Racing Series | Endurance Events Dubai",
    description: "Join the Teleios Endurance sim racing series in Dubai! Form a team and compete in challenging long-distance races requiring strategy, teamwork, and driver swaps at Teleios Dome.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"]
  }
};

const tourPackageItems = [
  {
    icon: faClock,
    title: "Race Durations",
    description: "Events typically last 3 hours, offering a variety of challenges. Specific durations for each event will be detailed in the calendar.",
  },
  {
    icon: faUsers,
    title: "Team Requirements",
    description: "Teams consist of 2 drivers. All team members must be registered.",
  },
  {
    icon: faExchangeAlt,
    title: "Driver Swaps & Stint Times",
    description: "Mandatory driver swaps are a key feature. Each driver must complete a minimum and maximum stint time. The number of required swaps depends on race length and team size.",
  },
  {
    icon: faGasPump,
    title: "Pit Stops & Strategy",
    description: "Strategic pit stops for driver changes, fuel, and tire changes are critical. Teams must manage their strategy effectively throughout the race.",
  },
  {
    icon: faCarSide,
    title: "Car Classes",
    description: "Events feature single-class racing (GT3).",
  },
];

const faqs = [
  {
    question: "How do we register a team?",
    answer: "Team registration details can be found in the registration section. Please refer to that area for full instructions.",
  },
  {
    question: "What's the minimum/maximum team size?",
    answer: "Typically 2 to 4 drivers per team. Check specific event details for exact requirements.",
  },
  {
    question: "How do driver swaps and pit stops work?",
    answer: "Driver swaps occur in designated pit windows. Our race marshals will guide teams through the pit stop procedure during the briefing. Detailed rules are in the event regulations.",
  },
  {
    question: "Do all team members need prior sim racing experience?",
    answer: "While experience helps, teams can have a mix of skill levels. The key is teamwork and consistency. Practice sessions are recommended.",
  },
  {
    question: "What sim software is used for endurance races?",
    answer: "Our endurance races utilize [], allowing for robust multi-driver functionality.",
  },
];

export default function Page() {
  return (
   <>
     <GlobalHero
         title="Endurace Racing Series"
         subtitle="Test Your Limits: Teleios Endurance Racing Series"
         imageSrc="/corporate/DOME5.webp"
         height="third"
         strokeTitle={false}
     />



     <IconGrid
         title="Understanding the Endurance Challenge"
         subtitle="Our endurance events are designed to replicate the strategic complexities and shared effort of real-world long-distance motorsport."
         items={tourPackageItems}
         showButton={false}
     />

     <section id="upcoming-events"  className="bg-[#0a0023]">
       <UpcomingEvents />
     </section>

     <Testimonial />

     <FaqSection
         id="faqs"
         subtitle="Endurance Racing - Frequently Asked Questions"
         textColor="text-white"
         faqs={faqs}
     />

   </>
  );
}
