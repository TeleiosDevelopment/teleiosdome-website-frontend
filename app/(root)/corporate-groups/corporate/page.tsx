import type {Metadata} from "next";
import Hero from "@/app/components/ui/GlobalHero";
import TextSquareImage from "@/app/components/ui/TextSquareImage";
import IconGrid from "@/app/components/ui/IconGrid";
import {faChalkboard, faCoffee, faFlagCheckered, faHandshake, faUsers,} from "@fortawesome/free-solid-svg-icons";
import CorporateForm from "@/app/components/ui/forms/corporateForm";

export const metadata: Metadata = {
    title: "Corporate Events Bookings | Teleios Dome Dubai",
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
        title: "Corporate Events Bookings | Teleios Dome Dubai",
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
        title: "Corporate Events Bookings | Teleios Dome Dubai",
        description:
            "Host unforgettable corporate events, team building activities, or private parties at Teleios Dome Dubai. Unique sim racing experiences tailored for groups. Inquire today!",
        images: ["https://www.teleiosdome.com/corporate/corporate1.webp"],
    },
};

const corporateBenefits = [
    {
        icon: faUsers,
        title: "Boost Team Morale",
        description: "Strengthen collaboration and camaraderie among your team members with engaging, adrenaline-filled sessions.",
    },
    {
        icon: faHandshake,
        title: "Impress Clients",
        description: "Deliver a truly memorable and unique entertainment experience for your clients and partners.",
    },
    {
        icon: faFlagCheckered,
        title: "Customized Racing & Branding",
        description: "Tailor race formats, leaderboards, and car liveries to your brand and event goals.",
    },
    {
        icon: faChalkboard,
        title: "Meeting Room Access",
        description: "Use our private meeting room equipped with professional AV facilities for presentations and planning.",
    },
    {
        icon: faCoffee,
        title: "Catering & Barista Options",
        description: "Enjoy high-quality coffee and delicious catering to enhance your event experience.",
    },
];


export default function Page() {
    return (
        <>
            <Hero
                height="third"
                title="Corporate Events"
                applyBlur={false}
                subtitle="The perfect Dubai venue for corporate team building, unique private celebrations, and memorable group gatherings."
                imageSrc="/corporate/corporate1.webp"
                strokeTitle={false}
            />
            <TextSquareImage
                sectionTitle="Corporate Packages"
                title="Corporate Events & Team Building That Inspire"
                description="Energize your team, impress your clients, or launch your next product in style. Our sim racing events are designed to foster team cohesion, friendly competition, communication, and provide a unique stress-relief activity. We tailor every corporate package to meet your specific objectives and budget."
                imageSrc="/events/group2.webp"
                buttonHref="#form"
                buttonText="Plan Your Corporate Event"
            />

            <IconGrid
                title="Key Benefits"
                subtitle="What You Get with Our Corporate Packages"
                items={corporateBenefits}
                showButton={true}
                buttonText="Inquire About Corporate Events"
                buttonHref="#form"
            />
            <section id="form">
            <CorporateForm />
            </section>



        </>
    );
}
