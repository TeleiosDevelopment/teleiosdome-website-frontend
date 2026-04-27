import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
// import Cards from "@/app/components/ui/Cards";
import FaqSection from "@/app/components/ui/FAQSection";
import Testimonial from "@/app/components/ui/TestimonialSection";
import Button from "@/app/components/ui/Button";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
import CoachForm from "@/app/components/ui/forms/coachForm";

export const metadata: Metadata = {
  title: "Professional Sim Racing Driver Training & Coaching Dubai | Teleios Dome",
  description:
    "Unlock your racing potential with professional driver training at Teleios Dome Dubai. Personalized 1-to-1 coaching from expert sim racing coaches to improve lap times and technique.",
  keywords: [
    "Simracing training Dubai",
    "professional sim racing coach Dubai",
    "driving simulator lessons Dubai",
    "race driving training Dubai",
    "Teleios Dome coaching",
    "Improve lap times sim racing",
    "sim racing setup coaching Dubai",
    "advanced driving techniques simulator",
  ],
  openGraph: {
    title: "Professional Sim Racing Driver Training & Coaching Dubai | Teleios Dome",
    description:
      "Unlock your racing potential with professional driver training at Teleios Dome Dubai. Personalized 1-to-1 coaching from expert sim racing coaches to improve lap times and technique.",
    url: "https://www.teleiosdome.com/education/driving-training",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "driving training - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Sim Racing Driver Training & Coaching Dubai | Teleios Dome",
    description:
      "Unlock your racing potential with professional driver training at Teleios Dome Dubai. Personalized 1-to-1 coaching from expert sim racing coaches to improve lap times and technique.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};
//
// const trainingCards = [
//   {
//     title: "Beginner & Foundation Training",
//     description: "Perfect for new sim racers. Learn core driving principles: proper steering and pedal control, understanding weight transfer, basic racing lines, and simulator familiarization.",
//     duration: "1-hour or 2-hour session options",
//     focus: "Building confidence and correct habits from the start.",
//     link: "/form?package=foundation",
//     image: "/experience/session_20m.webp",
//   },
//   {
//     title: "Advanced Technique & Race Craft",
//     description: "For experienced racers. Deep dive into advanced cornering techniques, trail braking, tire management, overtaking and defending strategies, and mental preparation for competition.",
//     duration: "2-hour sessions, multi-session packages",
//     focus: "Refining skills, consistency, and strategic thinking.",
//     link: "/form?package=advanced",
//     image: "/experience/session_40m.webp",
//   },
//   {
//     title: "Telemetry & Basic Car Setup Coaching",
//     description: "Learn to interpret basic telemetry data to identify areas for improvement. Understand fundamental car setup adjustments and how they impact handling.",
//     duration: "2-hour session",
//     focus: "Data-driven improvement and understanding vehicle dynamics.",
//     link: "/form?package=telemetry",
//     image: "/experience/session_60m.webp",
//   },
//   {
//     title: "Personalized Training Plans",
//     description: "Have specific goals or areas you want to work on? We can create a custom training plan tailored to your individual needs and aspirations. Contact us to discuss.",
//     link: "/form?package=custom",
//     image: "/images/training/training_hero_coaching.jpg",
//   },
// ];

const faqs = [
  {
    question: "Who is the training suitable for?",
    answer: "Our training programs cater to all levels, from absolute beginners to experienced racers looking to compete at a higher level.",
  },
  {
    question: "What do I need to bring?",
    answer: "Just yourself and a willingness to learn! We provide all the necessary simulator equipment. Comfortable clothing is recommended.",
  },
  {
    question: "How are sessions structured?",
    answer: "Sessions are typically 1-to-1 and involve a mix of on-track practice, live coaching, and (for advanced sessions) data review. The structure is adapted to your specific needs.",
  },
  {
    question: "What are the costs for training sessions?",
    answer: "Prices vary depending on the program duration and type. Please see our program descriptions above for specific pricing or contact us for custom package quotes.",
  },
];


export default function Page() {
  return (
      <>
      <section id="education-hero">
        <GlobalHero
            title=" Professional Sim Racing Driver Training"
            subtitle="Unlock Your Potential: Professional Simracing Training & Coaching at Teleios Dome"
            imageSrc="/education/educationhero.webp"
            height="third"
            strokeTitle={false}
            applyBlur={true}
        />
      </section>



        {/*<div className="bg-[#0a0023] pt-12">*/}
        {/*  <h2 className="text-4xl font-bold mb-4 text-center">Tailored Coaching for Every Driver</h2>*/}
        {/*  <p className="text-center mb-12 max-w-3xl mx-auto">*/}
        {/*    We offer a range of training options designed to suit different skill levels and objectives.*/}
        {/*    All sessions are conducted 1-to-1 with a dedicated professional coach.*/}
        {/*  </p>*/}

        {/*</div>*/}



        <TextSquareImage
            sectionTitle="The Training Experience / What to Expect Section"
            title="Your Personalized Path to Improvement"
            description="Our training sessions are intensive but rewarding:"
            bullets={[
              "Initial Assessment: We start by understanding your current skill level and goals.",
              "Focused Drills: Targeted exercises on our simulators to work on specific techniques.",
              "Live Feedback: Real-time guidance and instruction from your coach.",
              "Data Review (for advanced): Analysis of telemetry to pinpoint improvement areas.",
              "Actionable Takeaways: Clear advice and practice plans to continue your development.",
            ]}
            imageSrc="/experience/session_40m.webp"
        />

        <section id="booking-training" className="bg-transparent text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Improve Your Lap Times?</h2>
            <p className="text-lg font-jura mb-4 max-w-2xl mx-auto">
              Investing in professional coaching is the fastest way to unlock your sim racing potential. Choose a program that suits you or contact us for a personalized consultation.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <Button
                href="#form"
                text="Book a Training Session Now"
                colored={true}
                small={false}
              />
            </div>
          </div>
        </section>


        <Testimonial />


        <FaqSection
            id="faqs"
            subtitle="Camp - Frequently Asked Questions"
            textColor="text-white"
            faqs={faqs}
        />
        <section id="form">
        <CoachForm/>
        </section>

    </>
  );
}
