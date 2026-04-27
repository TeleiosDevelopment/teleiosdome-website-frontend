import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Teleios Dome Dubai",
  description: "The page you are looking for does not exist. Return to Teleios Dome Dubai homepage.",
  keywords: ["404 error Dubai", "page not found Teleios Dome"],
  openGraph: {
    title: "Page Not Found | Teleios Dome Dubai",
    description: "The page you are looking for does not exist. Return to Teleios Dome Dubai homepage.",
    url: "https://www.teleiosdome.com/404",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | Teleios Dome Dubai",
    description: "The page you are looking for does not exist. Return to Teleios Dome Dubai homepage.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold pt-48">404</h1>
      <p className="mt-2 text-gray-500">Welcome to the 404 page.</p>
    </div>
  );
}
