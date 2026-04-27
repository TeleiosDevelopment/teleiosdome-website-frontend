import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
import ShowcaseCarousel from "@/app/components/ui/ShowcaseCarousel";
import IconGrid from "@/app/components/ui/IconGrid";
import {faComments, faGamepad, faIndustry, faMugHot} from "@fortawesome/free-solid-svg-icons";
import FaqSection from "@/app/components/ui/FAQSection";
import Button from "@/app/components/ui/Button";
import TourForm from "@/app/components/ui/forms/tourForm";

const faqs = [
  {
    question: "Where is the simulator factory located?",
    answer: "Our factory is located in Dubai Production City, a few meter away from Teleios Dome",
  },
  {
    question: "How long does the entire tour package last?",
    answer: "The factory tour itself is approximately 1 hour. With the experience at Teleios Dome, allow approximately 2–3 hours for the entire package.",
  },
  {
    question: "What is the minimum/maximum group size for a private tour?",
    answer: "For private tours, we typically require a minimum of 8 participants and can accommodate up to 60. Please contact us for larger groups.",
  },
];

const tourPackageItems = [
  {
    icon: faIndustry,
    title: "Factory Tour",
    description: "Guided tour of the Teleios simulator factory",
  },
  {
    icon: faGamepad,
    title: "Sim Racing Session",
    description: "Dedicated sim racing session at Teleios Dome",
  },
  {
    icon: faComments,
    title: "Expert Q&A",
    description: "Q&A session with our venue experts or factory representatives",
  },
  {
    icon: faMugHot,
    title: "Welcome Drink",
    description: "Complimentary welcome drink at the Teleios Dome barista.",
  },
];


export const metadata: Metadata = {
  title: "Simulator Factory Tour & Race Experience Dubai | Teleios Dome",
  description: "Go behind the scenes with Teleios Dome's exclusive simulator factory tour in Dubai, combined with a thrilling race experience. Book your unique tech tour today!",
  keywords: [
    "Simracing factory tour Dubai",
    "simulator factory visit Dubai",
    "Teleios Dome tour package",
    "build a race simulator tour Dubai",
    "technology tour Dubai",
    "Engineering tour Dubai",
    "behind the scenes sim racing",
    "Dubai tech experiences"
  ],
  openGraph: {
    title: "Simulator Factory Tour & Race Experience Dubai | Teleios Dome",
    description: "Go behind the scenes with Teleios Dome's exclusive simulator factory tour in Dubai, combined with a thrilling race experience. Book your unique tech tour today!",
    url: "https://www.teleiosdome.com/education/factory-tour-package",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "factory tour package - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulator Factory Tour & Race Experience Dubai | Teleios Dome",
    description: "Go behind the scenes with Teleios Dome's exclusive simulator factory tour in Dubai, combined with a thrilling race experience. Book your unique tech tour today!",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

const facilitySlides = [
  {
    title: "Design & Engineering",
    description: "Witness the design and engineering process behind our simulators.",
    imageSrc: "/education/Factory008.webp",
  },
  {
    title: "Precision Manufacturing",
    description: "See how high-quality components are manufactured and assembled.",
    imageSrc: "/education/Factory007.webp",
  },
  {
    title: "Immersive Technology",
    description: "Learn about the advanced technology that creates an immersive racing feel.",
    imageSrc: "/education/Factory005.webp",
  },
  {
    title: "Meet the Team",
    description: "Get to know the skilled engineers and technicians behind our simulators.",
    imageSrc: "/education/Factory006.webp",
  },
  {
    title: "Simulation Insights",
    description: "Gain a deeper understanding of the world of professional simulation.",
    imageSrc: "/education/Factory004.webp",
  },
];


export default function Page() {
  return (
    <>
      <GlobalHero
        title="Simulator Factory Tour & Race Experience"
        subtitle="Go Behind the Scenes: The Ultimate Teleios Simulator Factory Tour & Race Package!"
        imageSrc="/education/Factory002.webp"
        height="third"
        strokeTitle={true}
        applyBlur={true}
      />


      <ShowcaseCarousel
          sectionTitle="Step Inside the Heart of Simulation Technology"
          slides={facilitySlides}
      />


      <IconGrid
        title="Your Complete Teleios Tech & Thrill Experience"
        subtitle="The Teleios Tour Package is more than just a factory visit. It includes:"
        items={tourPackageItems}
        showButton={false}
      />

      <TextSquareImage
        sectionTitle="Ideal For..."
        title="Who Is This Tour For?"
        description="This unique package is perfect for:"
        bullets={[
          "Schools and educational groups looking for an inspiring STEM outing.",
          "Sim racing and motorsport enthusiasts eager to see behind the curtain.",
          "Technology and engineering students or professionals.",
          "Corporate teams seeking a unique and insightful group activity.",
          "Anyone curious about the high-tech world of simulation!"
        ]}
        imageSrc="/events/tour2.webp"
      />

      <section id="booking-tour" className="bg-transparent text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Book Your Teleios Factory Tour Package</h2>
          <p className="text-lg font-jura mb-4 max-w-2xl mx-auto">
            Experience the art and science of sim racing from creation to cockpit. Tours are available for individuals (on scheduled dates) and private groups.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <Button
              href="#form"
              text="Check Tour Availability"
              colored={true}
            />

          </div>
        </div>
      </section>
      <FaqSection
        id="faqs"
        subtitle="Tour Package - Frequently Asked Questions"
        textColor="text-white"
        faqs={faqs}
      />
      <section id="form">
      <TourForm />
      </section>

    </>
  );
}
