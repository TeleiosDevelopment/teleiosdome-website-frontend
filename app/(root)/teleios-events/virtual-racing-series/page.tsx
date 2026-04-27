import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
import Button from "@/app/components/ui/Button";
import FaqSection from "@/app/components/ui/FAQSection";
import IconGrid from "@/app/components/ui/IconGrid";
import {faCalendarCheck, faCarSide, faClock, faTrophy} from "@fortawesome/free-solid-svg-icons";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
import RaceResults from "@/app/components/ui/ResultsSection";

export const metadata: Metadata = {
  title: "Teleios Virtual RS Championship | Sim Racing League Dubai",
  description: "Join the Teleios Virtual RS Championship in Dubai! Compete in our exciting sim racing league, check standings, and register for upcoming races at Teleios Dome.",
  keywords: [
    "Virtual GP championship Dubai",
    "sim racing league Dubai",
    "compete sim racing Dubai",
    "Teleios Virtual GP",
    "join racing series Dubai"
  ],
  openGraph: {
    title: "Teleios Virtual RS Championship | Sim Racing League Dubai",
    description: "Join the Teleios Virtual RS Championship in Dubai! Compete in our exciting sim racing league, check standings, and register for upcoming races at Teleios Dome.",
    url: "https://www.teleiosdome.com/teleios-events/virtual-racing-series",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "virtual gp - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleios Virtual RS Championship | Sim Racing League Dubai",
    description: "Join the Teleios Virtual GP Championship in Dubai! Compete in our exciting sim racing league, check standings, and register for upcoming races at Teleios Dome.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <GlobalHero
        title="Teleios Virtual Racing Series"
        subtitle="Teleios Virtual Racing Series Championship: Your Race to Glory!"
        imageSrc="/corporate/DOME5.webp"
        height="third"
        strokeTitle={false}
      />
      <section id="championship-results" className="bg-[#0a0023] text-white py-16 px-4">




                <RaceResults  />

     </section>

      <IconGrid
        title="The 2025 Season 2 Virtual Racing Series"
        subtitle="Our Virtual Racing Series is designed for competitive fun and close racing."
        items={[
          {
            icon: faCalendarCheck,
            title: "Season Structure",
            description: "The season consists of 24 races, held the Thursday before the Motorsports weekend."
          },
          {
            icon: faClock,
            title: "Race Format",
            description: "Each race event includes: 15-minute qualifying session, and roughly 30-minute race."
          },
          {
            icon: faTrophy,
            title: "Points System",
            description: "Points awarded for top 16 finishers. Bonus points for fastest lap and participant count."
          },
          {
            icon: faCarSide,
            title: "Cars & Tracks",
            description: "All cars have equal performance. The calendar covers all Formula1 circuits."
          }
        ]}
        showButton={false}
      />
      <section id="how-to-participate" className="bg-[#0a0023] text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join the Grid!</h2>
          <p className="text-lg font-jura mb-8 max-w-2xl mx-auto">
            Ready to compete? Registration is easy.
          </p>
          <Button
              href="https://wa.me/971504804408?text=I'm%20interested%20in%20registering%20for%20the%20VirtualRS"
              text="Register for the Virtual RS Now!"
              colored
          />
        </div>
      </section>






      <TextSquareImage
        title="Prizes & Glory"
        description="Compete for more than just bragging rights! The Teleios Virtual RS Champion and top finishers will receive trophies, merchandise, and partner sponsor prizes."
        imageSrc="/events/prize.webp"
        reverseLayout={false}

      />

      <FaqSection
        id="virtual-gp-faqs"
        subtitle="Virtual RS - Frequently Asked Questions"
        faqs={[
          {
            question: "How do I register?",
            answer: "You can register through our WhatsApp link in the 'Join the Grid!' section above.",
          },
          {
            question: "What equipment do I need?",
            answer: "All races are held on our professional simulators at Teleios Dome. You don't need any personal equipment.",
          },
          {
            question: "What are the rules for on-track conduct?",
            answer: "Please refer to our detailed Sporting Code & Regulations document for all on-track rules.",
          },
          {
            question: "Can I practice before a race?",
            answer: "Yes, you can book regular experience sessions at Teleios Dome to practice.",
          },
          {
            question: "What are the entry fees and prizes?",
            answer: "Entry fees and prize details are available in the event details section above.",
          },
        ]}
      />
    </>
  );
}
