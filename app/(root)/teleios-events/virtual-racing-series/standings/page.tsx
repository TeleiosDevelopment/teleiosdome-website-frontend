import Standings from "@/app/components/ui/Standings";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Virtual Racing Series Standings | Teleios Dome",
  description:
    "Check out the latest standings for the Teleios Dome Virtual Racing Series. Track your position, race results, and championship points in real time.",
  keywords: [
    "Virtual Racing Series standings",
    "Teleios Dome leaderboard",
    "sim racing results",
    "simulator championship Dubai",
    "race simulator leaderboard",
    "virtual motorsport",
    "Teleios GP rankings",
    "simracing scores Dubai",
  ],
  openGraph: {
    title: "Virtual Racing Series Standings | Teleios Dome",
    description:
      "Check out the latest standings for the Teleios Dome Virtual Racing Series. Track your position, race results, and championship points in real time.",
    url: "https://www.teleiosdome.com/standings",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/events/leaderboard.jpg",
        width: 1200,
        height: 630,
        alt: "Virtual GP leaderboard - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Racing Series Standings | Teleios Dome",
    description:
      "Check out the latest standings for the Teleios Dome Virtual Racing Series. Track your position, race results, and championship points in real time.",
    images: ["https://www.teleiosdome.com/images/events/leaderboard.jpg"],
  },
};

const sampleDrivers = [
  {
    position: 1,
    name: "Ali Rashid",
    raceResults: [25, 18, 15, 12, 10],
    points: 80,
  },
  {
    position: 2,
    name: "Omar Al-Farsi",
    raceResults: [18, 15, 25, 10, 12],
    points: 80,
  },
  {
    position: 3,
    name: "Zara Khalid",
    raceResults: [10, 12, 18, 15, 25],
    points: 80,
  },
];


export default function StandingsPage() {
  return (
    <main>
      <Standings drivers={sampleDrivers}  nextRace="Canada - June 14th" />
    </main>
  );
}
