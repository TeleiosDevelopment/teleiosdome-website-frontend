import type {Metadata} from "next";
import Hero from "@/app/components/ui/GlobalHero";
import Cards from "@/app/components/ui/Cards";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
import Journey from "@/app/components/ui/Journey";

export const metadata: Metadata = {
  title: "Sim Racing Experiences & Driver Coaching | Teleios Dome Dubai",
  description: "Book your unforgettable sim racing session at Teleios Dome Dubai! Choose from 20, 40, or 60-minute drives. Professional 1-to-1 driver coaching available to improve your lap times.",
  keywords: ["Sim racing sessions Dubai", "book sim racing Dubai", "race simulator experience Dubai", "sim racing coaching Dubai", "Teleios Dome experiences", "20 min sim race Dubai", "40 min sim race Dubai", "60 min sim race Dubai", "race driver coach Dubai", "private sim racing lessons Dubai"],
  openGraph: {
    title: "Sim Racing Experiences & Driver Coaching | Teleios Dome Dubai",
    description: "Book your unforgettable sim racing session at Teleios Dome Dubai! Choose from 20, 40, or 60-minute drives. Professional 1-to-1 driver coaching available to improve your lap times.",
    url: "https://www.teleiosdome.com/experiences",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "experiences - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sim Racing Experiences & Driver Coaching | Teleios Dome Dubai",
    description: "Book your unforgettable sim racing session at Teleios Dome Dubai! Choose from 20, 40, or 60-minute drives. Professional 1-to-1 driver coaching available to improve your lap times.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

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

export default function Page() {
  return (


    <div >
      <Hero
          title="Experiences"
          subtitle="Get Behind the Wheel: Race Experiences at Teleios Dome"
          imageSrc="/events/eventmain2.webp"
          textColor="white"
          applyBlur={false}
          height="third"
          overlay="dark"
          strokeTitle={false}

      />

      <div className="w-full pt-0">
        <Cards sectionTitle="Race Experiences" cards={experienceCards} />
      </div>


      <TextSquareImage
        sectionTitle="Private Coaching"
        title="Improve Your Skills: Professional 1-to-1 Coaching"
        description="Ready to shave seconds off your lap times? Our professional racing coaches offer personalized 1-to-1 training sessions. Learn advanced driving techniques, racing lines, car setup fundamentals, and data analysis to unlock your true potential on any track, in any car. Suitable for all levels, from beginners seeking solid foundations to experienced racers aiming for the top."
        imageSrc="/education/education-home.webp"
        buttonHref="/education/driving-training"
        buttonText="Inquire About Coaching"
      />
        <Journey/>

    </div>
  );
}
