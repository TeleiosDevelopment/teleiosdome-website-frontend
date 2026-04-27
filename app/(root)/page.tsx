// Importing required components and icons for the homepage
import type {Metadata} from "next";
import Hero from "@/app/components/ui/GlobalHero";
import Cards from "@/app/components/ui/Cards";
import FaqSection from "@/app/components/ui/FAQSection";
import Location from "@/app/components/ui/Location";
import Testimonial from "@/app/components/ui/TestimonialSection";
import IconGrid from "@/app/components/ui/IconGrid";
import UpcomingEvents from "@/app/components/ui/UpcomingEvents";
// import GradFeatured from "@/app/components/ui/GradFeatured";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
// import ImageText from "@/app/components/ui/ImageText";
import {faCar, faFlagCheckered, faMugHot, faUsers} from "@fortawesome/free-solid-svg-icons";

// SEO metadata for the page
export const metadata: Metadata = {
  title: "Teleios Dome Dubai | Ultimate Simracing Experience & Events Venue",
  description: "Experience the thrill of simracing at Teleios Dome, Dubai! State-of-the-art simulators, corporate events, motorsports watch parties, championships. Book now!",
  keywords: ["Simracing Dubai", "sim racing venue Dubai", "Teleios Dome Dubai", "race simulator Dubai", "Motorsports watch party Dubai", "Corporate events Dubai", "team building Dubai", "virtual racing championship Dubai", "driving training simulator Dubai", "kids sim racing camp Dubai"],
  openGraph: {
    title: "Teleios Dome Dubai | Ultimate Simracing Experience & Events Venue",
    description: "Experience the thrill of simracing at Teleios Dome, Dubai! State-of-the-art simulators, corporate events, F1 watch parties, championships. Book now!",
    url: "https://www.teleiosdome.com/",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "Home - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleios Dome Dubai | Ultimate Simracing Experience & Events Venue",
    description: "Experience the thrill of simracing at Teleios Dome, Dubai! State-of-the-art simulators, corporate events, F1 watch parties, championships. Book now!",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

// Main Home Page Component
export default function Page() {
  const whyChooseUs = [
    {
      icon: faCar,
      title: "18 State-of-the-Art Simulators",
      description: "Experience unparalleled realism with our extensive range of cutting-edge racing simulators, precision-engineered and built in our own factory.",
    },
    {
      icon: faUsers,
      title: "Versatile Event Space",
      description: "Our large, adaptable venue boasts a massive screen, dedicated meeting room, and comfortable lounge, perfect for any private or corporate event.",
    },
    {
      icon: faMugHot,
      title: "Premium Barista & Lounge",
      description: "Relax and refuel with expertly crafted coffee, refreshing drinks, and delicious snacks in our stylish and comfortable lounge area while you watch the action.",
    },
    {
      icon: faFlagCheckered,
      title: "Vibrant Racing Community",
      description: "Join our regular championships, popular motorsports watch parties, and connect with a passionate community of fellow motorsport enthusiasts in Dubai.",
    },
  ];
  // Frequently Asked Questions
  const faqs = [
    {
      question: "Do I need any sim racing experience?",
      answer:
          "Not at all! Our simulators cater to all levels, from complete beginners to seasoned pros. Our friendly staff will guide you through the basics to get you racing in no time.",
    },
    {
      question: "What is the minimum age to race?",
      answer:
          "There is no minimum age requirement, but a minimum height of 110 cm is required to enjoy the experience. We also offer specialized Kids Camps for younger racers. Please check the Camps page for details.",
    },
    {
      question: "Is booking in advance required?",
      answer:
          "While walk-ins are welcome subject to availability, we highly recommend booking your session in advance, especially for groups and during peak hours, to guarantee your spot on the grid.",
    },
  ];

  // Cards displaying available sim racing experiences
  const experienceCards = [
    {
      image: "/experience/session_20m.webp",
      title: "20-Minute Sprint",
      description: "Ideal for a quick thrill or a first-time sim racing experience. Set your best lap and feel the speed!",
      price: 120,
      link: "/booking/experiences?duration=20",
    },
    {
      image: "/experience/session_40m.webp",
      title: "40-Minute Race",
      description: "Extra track time to find your limits. Go for pure hot laps or battle friends (or AI) in a qualifying and race session.",
      price: 200,
      link: "/booking/experiences?duration=40",
    },
    {
      image: "/experience/session_60m.webp",
      title: "60-Minute Race",
      description: "the full racing experience. Perfect every corner, or go wheel-to-wheel in a complete qualifying and extended race session.",
      price: 280,
      link: "/booking/experiences?duration=60",
    },
  ];

  // List of upcoming events at Teleios Dome
  // const events = [
  //   {
  //     id: 1,
  //     image: "/events/event1.webp",
  //     headline: (
  //       <>
  //         F1 Watch Party
  //         <br />
  //         Austria
  //       </>
  //     ),
  //     description: "Relax with likeminded F1 fans and enjoy the action live on our Cinema screen",
  //     date: "29th June 2025",
  //     whatsapp: "Hi, I’m interested in booking one table for the Austria F1 watch party",
  //   },
  //   {
  //     id: 2,
  //     image: "/events/event2.webp",
  //     headline: (
  //       <>
  //         VGP
  //         <br />
  //         Silverstone
  //       </>
  //     ),
  //     description: "Join our Formula 1 racing night open to all skill levels",
  //     date: "3rd July 2025",
  //     whatsapp: "Hi, I’m interested in booking a slot for the Silverstone VGP",
  //   },
  //   {
  //     id: 3,
  //     image: "/events/event3.webp",
  //     headline: (
  //       <>
  //         F1 Watch Party
  //         <br />
  //         Silverstone
  //       </>
  //     ),
  //     description: "Relax with likeminded F1 fans and enjoy the action live on our Cinema screen",
  //     date: "6th July 2025",
  //     whatsapp: "Hi, I’m interested in booking one table for the Silverstone F1 watch party",
  //   },
  //   {
  //     id: 4,
  //     image: "/events/event4.webp",
  //     headline: (
  //       <>
  //         VGP
  //         <br />
  //         SPA
  //       </>
  //     ),
  //     description: "Join our Formula 1 racing night open to all skill levels",
  //     date: "24th July 2025",
  //     whatsapp: "Hi, I’m interested in booking a slot for the SPA VGP",
  //   },
  //   {
  //     id: 5,
  //     image: "/events/event5.webp",
  //     headline: (
  //       <>
  //         F1 Watch Party
  //         <br />
  //         SPA
  //       </>
  //     ),
  //     description: "Relax with likeminded F1 fans and enjoy the action live on our Cinema screen",
  //     date: "27th July 2025",
  //     whatsapp: "Hi, I’m interested in booking one table for the SPA F1 watch party",
  //   },
  //   {
  //     id: 6,
  //     image: "/events/event1.webp",
  //     headline: (
  //       <>
  //         VGP
  //         <br />
  //         Hungaroring
  //       </>
  //     ),
  //     description: "Join our Formula 1 racing night open to all skill levels",
  //     date: "31st July 2025",
  //     whatsapp: "Hi, I’m interested in booking a slot for the Hungaroring VGP",
  //   },
  //   {
  //     id: 7,
  //     image: "/events/event3.webp",
  //     headline: (
  //       <>
  //         F1 Watch Party
  //         <br />
  //         Hugaroring
  //       </>
  //     ),
  //     description: "Relax with likeminded F1 fans and enjoy the action live on our Cinema screen",
  //     date: "3rd August 2025",
  //     whatsapp: "Hi, I’m interested in booking one table for the Hungaroring F1 watch party",
  //   },
  //   {
  //     id: 8,
  //     image: "/events/event4.webp",
  //     headline: (
  //       <>
  //         3H Endurance
  //         <br />
  //         Interlagos
  //       </>
  //     ),
  //     description: "TEAM UP & COMPETE with our endurance racing, open to all skill levels.",
  //     date: "6th August 2025",
  //     whatsapp: "Hi, I’m interested in booking a slot for the Hungaroring VGP",
  //   },
  // ];

  return (
      <div className="relative w-full text-white">
        {/* Hero Section with Video Background */}
        <div className="w-full h-screen">
          <Hero
              title="Experience the Thrill of Simracing at Teleios Dome"
              subtitle="Unleash your inner racer, host unforgettable events, and join the community."
              videoSrc="/videodome.webm"
              textColor="white"
              applyBlur={false}
              height="full"
              showButton={true}
              overlay="dark"
          />
        </div>

        {/* Experience Options Section */}
        <div className="w-full pt-0">
          <Cards sectionTitle="Race Experiences" cards={experienceCards} />
        </div>

        {/* Corporate & Group Events Section */}

        <TextSquareImage
            sectionTitle="Private Events"
            title="Corporate & Private Events"
            description="Host unique team-building, private parties, or conferences. Customizable packages available for unforgettable events."
            imageSrc="/education/corp10.webp"
            buttonHref="/corporate-groups"
            buttonText="Plan Your Event"
        />


        <TextSquareImage
            sectionTitle="Our Events"
            title="Teleios Events"
            description="Compete in our Virtual Racing Series & Endurance championships or catch live F1 action at our electrifying Watch Parties."
            imageSrc="/events/home-look.webp"
            buttonHref="/teleios-events"
            reverseLayout={true}
            buttonText="See Upcoming Events"
        />

        <TextSquareImage
            sectionTitle="Education & Trainings"
            title="Learn, Improve & Explore"
            description="Sharpen your skills with pro driver training, enroll in our youth camps, or take a unique behind-the-scenes simulator factory tour."
            imageSrc="/education/education-home.webp"
            buttonHref="/education"
            buttonText="Explore Education"
        />
        {/* Education & Trainings Section */}
        {/*<GradFeatured*/}
        {/*    sectionTitle="Education & Trainings"*/}
        {/*    title="Learn, Improve & Explore"*/}
        {/*    description="Sharpen your skills with pro driver training, enroll in our youth camps, or take a unique behind-the-scenes simulator factory tour."*/}
        {/*    buttonHref="/education"*/}
        {/*    buttonText="Explore Education"*/}
        {/*    imageSrc="/education/education1.webp"*/}
        {/*    imageAlt="Coach instructing student in simulator"*/}
        {/*/>*/}

        {/* Why Choose Us Section with Icon Grid */}
        <IconGrid title="Why Choose Us?" subtitle="Why Teleios Dome Stands Out" items={whyChooseUs} />

        {/* Testimonial Section */}
        <Testimonial />
        {/* Upcoming Events Carousel Section */}
        <UpcomingEvents  title="Upcoming Events" />
        {/* FAQ Section */}
        <FaqSection
            id="faqs"
            subtitle="FAQs"
            textColor="text-white"
            faqs={faqs}
        />
        {/* Location / Contact Information Section */}
        <Location />
      </div>
  );
}
