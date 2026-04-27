// import CampSchedule from "@/app/components/ui/CampSchedule";
import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
import IconGrid from "@/app/components/ui/IconGrid";
import {faChalkboardTeacher, faFlagCheckered, faHelmetSafety, faMicrochip,} from "@fortawesome/free-solid-svg-icons";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
import FaqSection from "@/app/components/ui/FAQSection";
import Testimonial from "@/app/components/ui/TestimonialSection";
import CampForm from "@/app/components/ui/forms/campForm";

export const metadata: Metadata = {
  title: "Kids Sim Racing Camps in Dubai | Teleios Dome Youth Programs",
  description:
    "Enroll your child in exciting and educational sim racing camps at Teleios Dome Dubai! Fun-filled programs for ages [X-Y] focusing on driving skills and motorsport basics.",
  keywords: [
    "Simracing camp Dubai",
    "kids driving camp Dubai",
    "youth sim racing program Dubai",
    "Teleios Dome camps",
    "summer camp Dubai",
  ],
  openGraph: {
    title: "Kids Sim Racing Camps in Dubai | Teleios Dome Youth Programs",
    description:
      "Enroll your child in exciting and educational sim racing camps at Teleios Dome Dubai! Fun-filled programs for ages 10+ focusing on driving skills and motorsport basics.",
    url: "https://www.teleiosdome.com/education/camps",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "Camps - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kids Sim Racing Camps in Dubai | Teleios Dome Youth Programs",
    description:
      "Enroll your child in exciting and educational sim racing camps at Teleios Dome Dubai! Fun-filled programs for ages 10+ focusing on driving skills and motorsport basics.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};
// const dummyCampSessions = [
//   {
//     name: "Junior Racer Camp - Summer Edition",
//     dates: "July 10 - July 14, 2024",
//     time: "9:00 AM - 1:00 PM",
//     ageGroup: "8-12 years",
//     price: 1200,
//     status: "Registration Open",
//     link: "/register/junior-racer",
//   },
//   {
//     name: "Teen Speed Academy - August Session",
//     dates: "August 5 - August 9, 2024",
//     time: "10:00 AM - 2:00 PM",
//     ageGroup: "13-16 years",
//     price: 1300,
//     status: "Limited Spots",
//     link: "/register/teen-speed",
//   },
// ];

const curriculumItems = [
  {
    icon: faChalkboardTeacher,
    title: "Teamwork & Fun Challenges",
    description: "Engaging in friendly competitions and team-based activities.",
  },
  {
    icon: faFlagCheckered,
    title: "Driving Fundamentals",
    description: "Basic car control – steering, throttle, braking techniques.",
  },
  {
    icon: faFlagCheckered,
    title: "Understanding the Track",
    description: "Learning racing lines, cornering principles, and track awareness.",
  },
  {
    icon: faChalkboardTeacher,
    title: "Introduction to Race Craft",
    description: "Safe overtaking, defending positions, and understanding race rules/etiquette.",
  },
  {
    icon: faMicrochip,
    title: "Simulator Technology Basics",
    description: "How simulators work and their role in motorsport.",
  },
  {
    icon: faHelmetSafety,
    title: "Safety First",
    description: "Emphasis on safe driving practices and sportsmanship.",
  },
];
const faqs = [
  {
    question: "What should my child bring to the camp?",
    answer: "Comfortable clothing and closed-toe shoes are recommended. We provide all necessary racing equipment.",
  },
  {
    question: "Is lunch/food provided?",
    answer: "Snacks and drinks are available for purchase at our barista. For full-day camps, please check if lunch is included or if campers should bring a packed lunch.",
  },
  {
    question: "What is the instructor-to-camper ratio?",
    answer: "We maintain a low ratio of approximately 1 instructor per 5-6 campers to ensure quality supervision and attention.",
  },
  {
    question: "My child has no prior experience. Is that okay?",
    answer: "Absolutely! Our camps are designed for all skill levels, especially beginners. We focus on building fundamentals in a supportive environment.",
  },
];

export default function Page() {
  return (
      <>

        <GlobalHero
            title="Teleios Dome Simracing Camps"
            subtitle="Where Young Racers Learn & Play!"
            imageSrc="/education/educationhero.webp"
            height="third"
            strokeTitle={false}
            applyBlur={false}
        />

        <section id="education-reasons" className="bg-[#0a0023]">
          <IconGrid
              items={curriculumItems}
              title="Our Camp Curriculum"
              subtitle="Our camp program is structured to be both engaging and informative, building a solid foundation for future racers"
          />
        </section>

        <TextSquareImage
          sectionTitle="Why Choose Our Camps?"
          title="The Teleios Dome Camp Advantage"
          description=""
          bullets={[
            "Expert Instructors: Passionate and experienced instructors with a knack for teaching kids.",
            "Top-Tier Simulators: Safe, age-appropriate use of our professional-grade simulators.",
            "Safe & Supervised: A secure and constantly supervised environment.",
            "Small Group Sizes: Ensuring personalized attention for each camper.",
            "Focus on Fun: Learning through engaging activities and positive reinforcement.",
            "Certificate of Participation: A sense of achievement for every camper.",
          ]}
          imageSrc="/events/camp2.webp"
        />
        {/*<CampSchedule*/}
        {/*  sectionTitle="Upcoming Camp Sessions & Enrollment"*/}
        {/*  sessions={dummyCampSessions}*/}
        {/*/>*/}
        <Testimonial />

        <FaqSection
            id="faqs"
            subtitle="Camp - Frequently Asked Questions"
            textColor="text-white"
            faqs={faqs}
        />

        <CampForm />

      </>


  );
}
