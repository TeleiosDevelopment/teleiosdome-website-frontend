import GlobalHero from "@/app/components/ui/GlobalHero";
import CardsHor from "@/app/components/ui/CardsHor";
import IconGrid from "@/app/components/ui/IconGrid";
import {faChalkboardTeacher, faFlagCheckered, faHelmetSafety, faMicrochip} from "@fortawesome/free-solid-svg-icons";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Sim Racing Education & Training Programs in Dubai | Teleios Dome",
  description: "Explore sim racing education at Teleios Dome Dubai. We offer kids' camps, unique simulator factory tours, and professional driver training to enhance your skills.",
  keywords: [
    "Simracing education Dubai",
    "driving training simulator Dubai",
    "simracing camp Dubai",
    "simulator factory tour Dubai",
    "Teleios Dome education",
    "Learn sim racing Dubai",
    "improve driving skills Dubai",
    "kids racing programs Dubai",
    "advanced sim training Dubai"
  ],
  openGraph: {
    title: "Sim Racing Education & Training Programs in Dubai | Teleios Dome",
    description: "Explore sim racing education at Teleios Dome Dubai. We offer kids' camps, unique simulator factory tours, and professional driver training to enhance your skills.",
    url: "https://www.teleiosdome.com/education",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "education - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sim Racing Education & Training Programs in Dubai | Teleios Dome",
    description: "Explore sim racing education at Teleios Dome Dubai. We offer kids' camps, unique simulator factory tours, and professional driver training to enhance your skills.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

export default function Page() {
  const educationCards = [
    {
      image: "/events/camp1.webp",
      title: "Simracing Camps (Ages +10)",
      description:
        "Fun, engaging, and educational! Our sim racing camps provide a safe and exciting introduction to motorsport fundamentals, race craft, and simulator technology for young aspiring drivers.",
      link: "/education/camps",
    },
    {
      image: "/events/tour.webp",
      title: "Exclusive Simulator Factory Tour",
      description:
        "Go behind the scenes with our unique tour package! Visit the factory where our state-of-the-art simulators are designed and built, followed by an experience at the Teleios Dome venue.",
      link: "/education/factory-tour-package",
    },
    {
      image: "/education/coaching3.webp",
      title: "Professional Driving Training",
      description:
        "Sharpen your competitive edge. Receive personalized 1-to-1 coaching from professional racing drivers to refine your technique, master race craft, and understand car setup.",
      link: "/education/driving-training",
    },
  ];

  const educationReasons = [
    {
      icon: faMicrochip,
      title: "Cutting-Edge Simulators",
      description: "State-of-the-art simulators built in our own factory.",
    },
    {
      icon: faChalkboardTeacher,
      title: "Expert Coaching",
      description: "Experienced and qualified instructors and professional racing coaches.",
    },
    {
      icon: faHelmetSafety,
      title: "Safe & Effective",
      description: "Curriculums designed to be engaging, effective, and safe.",
    },
    {
      icon: faFlagCheckered,
      title: "Motorsport Insight",
      description: "A unique insight into the world of motorsport and simulation technology.",
    },
  ];

  return (
    <>
      <section id="education-hero">
        <GlobalHero
          title="Teleios Dome Education"
          subtitle="Level Up Your Skills & Insights: Teleios Dome Education Programs"
          imageSrc="/education/educationhero.webp"
          height="third"
          strokeTitle={false}
          applyBlur={false}
        />
      </section>

      <section id="education-cards" className="bg-[#0a0023]">
        <CardsHor
          sectionTitle="Explore Our Diverse Educational Programs"
          cards={educationCards}
        />
      </section>

      <section id="education-reasons" className="bg-[#0a0023]">
        <IconGrid
          items={educationReasons}
          title="Learn from the Best, with the Best"
          subtitle="Our educational programs leverage:"
        />
      </section>

      <section id="education-cta" className="bg-[#0a0023] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 mt-0 text-center">
            <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
                Begin Your Learning Journey Today
              </span>
            </div>
            <div className="border-t border-gray-500 w-full mb-4" />
            <h2 className="text-5xl font-bold text-white mt-12 text-center">
              Begin Your Learning Journey Today
            </h2>
            <p className="text-lg text-gray-400 mt-4 font-jura max-w-3xl mx-auto text-center">
              Whether you&#39;re looking to introduce your child to racing, gain a unique industrial insight, or take your own driving skills to the next level, Teleios Dome has an educational path for you. Explore our programs and get in touch to learn more.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
