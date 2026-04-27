import type {Metadata} from "next";
import "@/app/globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from '@fortawesome/fontawesome-svg-core';

import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import CookieBanner from "@/app/components/cookies/CookiesConsent";
import GtmOnConsent from "@/app/components/cookies/GTM";

config.autoAddCss = false;



export const metadata: Metadata = {
    title: "Teleios Dome",
    description: "Premium Simracing Experiences in Dubai",
};

export default function TeleiosLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <CookieBanner />
            <GtmOnConsent />
            <Header />
            {children}
            <Footer />
        </div>
    );
}