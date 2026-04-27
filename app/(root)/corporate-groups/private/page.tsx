import type {Metadata} from "next";
import Hero from "@/app/components/ui/GlobalHero";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
import PrivateForm from "@/app/components/ui/forms/privateForm";

import IconGrid from "@/app/components/ui/IconGrid";
import {
    faBirthdayCake,
    faChampagneGlasses,
    faLock,
    faTrophy,
    faUsersBetweenLines
} from "@fortawesome/free-solid-svg-icons";

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

const privatePartyBenefits = [
    {
        icon: faBirthdayCake,
        title: "Birthday Parties",
        description: "Celebrate all ages with exciting racing sessions, perfect for birthdays. Adult supervision for younger racers ensured.",
    },
    {
        icon: faChampagneGlasses,
        title: "Bachelor & Bachelorette",
        description: "Host unforgettable pre-wedding celebrations with fun, competition, and camaraderie.",
    },
    {
        icon: faUsersBetweenLines,
        title: "Friends & Family",
        description: "Gather your loved ones for thrilling experiences and shared memories on track.",
    },
    {
        icon: faTrophy,
        title: "Custom Tournaments",
        description: "Create your own racing challenges and leaderboards tailored to your group.",
    },
    {
        icon: faLock,
        title: "Exclusive Venue Hire",
        description: "Book the entire venue for a private, premium experience.",
    }
];


export default function Page() {
    return (
        <>
            <Hero
                height="third"
                title="Private Events"
                applyBlur={false}
                subtitle="The perfect Dubai venue for corporate team building, unique private celebrations, and memorable group gatherings."
                imageSrc="/corporate/corporate1.webp"
                strokeTitle={false}
            />

            <div className={"bg-gray-900"}>
                <TextSquareImage
                    sectionTitle="Private Parties"
                    title="Celebrate in Style: Private Parties & Group Fun"
                    description="Looking for a unique birthday party idea, an exciting bachelor/bachelorette send-off, or just a memorable day out with friends? Teleios Dome offers a high-energy, fun-filled experience for private groups of all sizes and skill levels. Get ready for some friendly competition and lasting memories!"
                    imageSrc="/events/party.webp"
                    buttonHref="#form"
                    buttonText="Plan Your Private Event"
                    reverseLayout={true}
                />
                <IconGrid
                    title="Perfect For"
                    subtitle="Ideal Occasions for Private Group Fun"
                    items={privatePartyBenefits}
                    showButton={true}
                    buttonText="Inquire About Private Parties"
                    buttonHref="#form"
                />
                <section id="form">
            <PrivateForm />
                </section>
            </div>


        </>
    );
}
