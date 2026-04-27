import type {Metadata} from "next";
import ContactSection from "@/app/components/ui/forms/contactForm";
import GlobalHero from "@/app/components/ui/GlobalHero";

export const metadata: Metadata = {
  title: "Contact Us | Teleios Dome Dubai",
  description: "Get in touch with Teleios Dome Dubai for bookings, inquiries, and more information.",
  keywords: ["Contact Teleios Dome", "booking Dubai", "sim racing inquiries"],
  openGraph: {
    title: "Contact Us | Teleios Dome Dubai",
    description: "Get in touch with Teleios Dome Dubai for bookings, inquiries, and more information.",
    url: "https://www.teleiosdome.com/contacts",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "contacts - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Teleios Dome Dubai",
    description: "Get in touch with Teleios Dome Dubai for bookings, inquiries, and more information.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

export default function Page() {
  return (
      <>
        <section id="education-hero">
          <GlobalHero
              title="Contact Us"
              imageSrc="/corporate/teleios-venue1.webp"
              height="third"
              strokeTitle={false}
              applyBlur={false}
          />
        </section>

        <ContactSection/>
      </>

  );
}
