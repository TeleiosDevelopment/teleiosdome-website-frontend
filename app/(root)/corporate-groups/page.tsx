import type {Metadata} from "next";
import Hero from "@/app/components/ui/GlobalHero";
import ShowcaseCarousel from "@/app/components/ui/ShowcaseCarousel";
import Testimonial from "@/app/components/ui/TestimonialSection";
import GeneralCards from "@/app/components/ui/GeneralCards";

export const metadata: Metadata = {
  title: "Corporate Events & Private Group Bookings | Teleios Dome Dubai",
  description:
    "Host unforgettable corporate events, team building activities, or private parties at Teleios Dome Dubai. Unique sim racing experiences tailored for groups. Inquire today!",
  keywords: [
    "Corporate events Dubai",
    "team building Dubai",
    "private party venue Dubai",
    "group activities Teleios Dome",
    "simracing event Dubai",
    "Bachelor party venue Dubai",
    "birthday party ideas Dubai",
    "client entertainment Dubai",
    "staff party Dubai"
  ],
  openGraph: {
    title: "Corporate Events & Private Group Bookings | Teleios Dome Dubai",
    description:
      "Host unforgettable corporate events, team building activities, or private parties at Teleios Dome Dubai. Unique sim racing experiences tailored for groups. Inquire today!",
    url: "https://www.teleiosdome.com/corporate-groups",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/corporate/corporate1.webp",
        width: 1200,
        height: 630,
        alt: "Corporate Events at Teleios Dome Dubai",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Events & Private Group Bookings | Teleios Dome Dubai",
    description:
      "Host unforgettable corporate events, team building activities, or private parties at Teleios Dome Dubai. Unique sim racing experiences tailored for groups. Inquire today!",
    images: ["https://www.teleiosdome.com/corporate/corporate1.webp"],
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
const eventCards = [
  {
    image: "/education/education3.webp",
    title: "Corporate Events",
    description: "Energize your team, impress your clients, or launch your next product in style. Our sim racing events are designed to foster team cohesion, friendly competition, communication, and provide a unique stress-relief activity. We tailor every corporate package to meet your specific objectives and budget",
    link: "/corporate-groups/corporate",
    buttonText: "Explore our Corporate Events"
  },
  {
    image: "/events/private1.webp",
    title: "Private Events",
    description: "Looking for a unique birthday party idea, an exciting bachelor/bachelorette send-off, or just a memorable day out with friends? Teleios Dome offers a high-energy, fun-filled experience for private groups of all sizes and skill levels. Get ready for some friendly competition and lasting memories!",
    link: "/corporate-groups/private",
    buttonText: "Explore our Private Events"
  },

];

export default function Page() {
  return (
    <>
      <Hero
        height="third"
        title="Corporate & Private"
        applyBlur={false}
        subtitle="The perfect Dubai venue for corporate team building, unique private celebrations, and memorable group gatherings."
        imageSrc="/corporate/corporate1.webp"
        strokeTitle={false}
      />
      <GeneralCards
          sectionTitle=" "
          showPrice={false}
          cards={eventCards}
      />

      <ShowcaseCarousel
        sectionTitle="Facilities to Enhance Your Event"
        slides={facilitySlides}
      />
      <Testimonial />

    </>
  );
}
