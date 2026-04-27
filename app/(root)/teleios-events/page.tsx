import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
import GeneralCards from "@/app/components/ui/GeneralCards2";
import UpcomingEvents from "@/app/components/ui/UpcomingEvents";
// import CalendarSection from "@/app/components/ui/Calender";
import EventCalendar from '@/app/components/ui/EventCalendar'

export const metadata: Metadata = {
  title: "Teleios Events: Sim Racing Championships & F1 Watch Parties in Dubai",
  description: "Join the action at Teleios Dome! Compete in our Virtual RS and Endurance sim racing championships, or experience motorsports watch parties on our giant screen in Dubai.",
  keywords: [
      "Simracing events Dubai",
    "Teleios Events",
    "virtual racing championship Dubai",
    "endurance sim racing Dubai",
    "F1 watch party venue Dubai",
    "Teleios Virtual VP",
    "Teleios Endurance",
    "watch F1 big screen Dubai",
    "motorsport events Dubai"
  ],
  openGraph: {
    title: "Teleios Events: Sim Racing Championships & Watch Parties in Dubai",
    description: "Join the action at Teleios Dome! Compete in our Virtual GP and Endurance sim racing championships, or experience Motorsports watch parties on our giant screen in Dubai.",
    url: "https://www.teleiosdome.com/teleios-events",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "teleios events - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleios Events: Sim Racing Championships & Motorsports Watch Parties in Dubai",
    description: "Join the action at Teleios Dome! Compete in our Virtual GP and Endurance sim racing championships, or experience Motorsports watch parties on our giant screen in Dubai.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

const eventCards = [
  {
    image: "/events/vgp3.webp",
    title: "Teleios Virtual RS Championship",
    description: "Compete wheel-to-wheel in our seasonal sprint championship series following the calendar. Test your skill, consistency, and race craft across all the circuits. Are you Dubai's next virtual champion?",
    link: "/teleios-events/virtual-racing-series",
    buttonText: "Learn About Virtual RS"
  },
  {
    image: "/events/endurance1.webp",
    title: "Teleios Endurance Racing",
    description: "Push your limits and test your teamwork in our challenging long-distance endurance races. Strategy, driver swaps, and consistent pace are key to conquering these ultimate sim racing marathons.",
    link: "/teleios-events/endurance",
    buttonText: "Explore Endurance Races"
  }
  // , {
  //   image: "/events/group4.webp",
  //   title: "Live Watch Parties",
  //   description: "Experience the roar of motorsports on our massive screen with fellow fans! Unbeatable atmosphere, great company, and live racing action as it happens.",
  //   link: "/teleios-events/watch-parties",
  //   buttonText: "Join a Watch Party"
  // }
];
const events = [

  {
    id: 1,
    image: "/VRS.png",
    headline: "VRS - Silverstone",
    description: "Join our Motorsports racing night open to all skill levels",
    date: "2025-07-03",
    whatsapp: "Hi, I’m interested in booking a slot for the Silverstone VRS",
  },

  {
    id: 2,
    image: "/VRS.png",
    headline: "VRS - SPA sprint round",
    description: "Join our Motorsports racing night open to all skill levels",
    date: "2025-07-24",
    whatsapp: "Hi, I’m interested in booking a slot for the SPA VRS",
  },

  {
    id: 3,
    image: "/VRS.png",
    headline: "VRS - Hungaroring",
    description: "Join our Motorsports racing night open to all skill levels",
    date: "2025-07-31",
    whatsapp: "Hi, I’m interested in booking a slot for the Hungaroring VRS",
  },

  {
    id: 4,
    image: "/events/event4.webp",
    headline: "3H Endurance - Interlagos",
    description: "Join our endurance racing night, TEAM UP AND COMPETE, open to all skill levels.",
    date: "2025-08-06",
    whatsapp: "Hi, I’m interested in booking a slot for the Hungaroring VRS",
  },
];

export default function Page() {
  return (
    <>
      <section id="hero">
        <GlobalHero
            title="Teleios Events"
          subtitle="Teleios Events: Experience the Pinnacle of Simracing Competition & Spectacle"
          imageSrc="/events/home-look.webp"
          textColor="white"
          applyBlur={false}
          height="third"
          strokeTitle={false}
          overlay="dark"
        />
      </section>

      {/*<div className=" py-12 px-4 md:px-12 text-center text-white font mx-auto">*/}
      {/*  <h1 className=" text-4xl font-bold max-w-5xl mx-auto mb-4">*/}
      {/*    Teleios Events: Experience the Pinnacle of Simracing Competition & Spectacle*/}
      {/*  </h1>*/}
      {/*  <p className="font-jura text-xl max-w-5xl mx-auto">*/}
      {/*  Welcome to Teleios Events, the heart of competitive sim racing and motorsport fandom at Teleios Dome. Whether you&#39;re looking to test your skills in our structured championships or soak in the electrifying atmosphere of live F1 races with fellow fans, our events deliver unmatched excitement and community spirit.*/}
      {/*  </p>*/}
      {/*  </div>*/}
      <section id="main-events">
        <GeneralCards
          sectionTitle="Our Main Events"
          showPrice={false}
          cards={eventCards}
        />
      </section>

      <section id="calendar">
        {/*<CalendarSection />*/}
        <EventCalendar events={events} />

      </section>

      <section id="upcoming-events"  className="bg-[#0a0023]">
        <UpcomingEvents />
      </section>




      {/* Call to Action */}
      <section id="join-the-action" className="bg-[#0a0023] py-16 px-4 md:px-12 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6">
            Ready to Join the Action?
          </h2>
          <p className="text-lg font-jura mb-8">
            Explore our individual event pages to find detailed information on formats,
            schedules, registration, and how to book your spot for watch parties.
            We look forward to seeing you at Teleios Dome!
          </p>

        </div>
      </section>

    </>
  );
}
// pages/index.tsx
