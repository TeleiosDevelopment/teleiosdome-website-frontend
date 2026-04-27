"use client";

import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import Script from "next/script";

export default function GtmOnConsent() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const forceConsent = process.env.NODE_ENV === "development";

  useEffect(() => {

    const cookie = Cookies.get("teleiosCookieConsent");
    console.log("GTM: Found cookie ->", cookie);
    let saved: Record<string, boolean> | null = null;
    if (cookie) {
      try {
        const decoded = decodeURIComponent(cookie);
        const normalized = decoded.replace(/%22/g, '"');
        saved = JSON.parse(normalized);
      } catch {
        // fallback: map legacy "accepted"/"declined" to full preferences
        if (cookie === "accepted") {
          saved = { performance: true, functional: true, targeting: true };
        } else if (cookie === "declined") {
          saved = { performance: false, functional: false, targeting: false };
        } else {
          saved = null;
        }
      }
    }

    if (saved !== null) {
      // Push Consent Mode initialization event to dataLayer
      const adStorage = saved.targeting ? "granted" : "denied";
      const analyticsStorage = saved.performance ? "granted" : "denied";
      window.dataLayer?.push({
        event: "consent_init",
        ad_storage: adStorage,
        analytics_storage: analyticsStorage,
        ad_user_data: adStorage,
        ad_personalization: adStorage,
        performance: saved.performance,
        functional: saved.functional,
        targeting: saved.targeting,
        necessary: true
      });
      window.gtag?.('consent','update',{
        ad_storage: adStorage,
        analytics_storage: analyticsStorage,
        ad_user_data: adStorage,
        ad_personalization: adStorage
      });
      // Determine acceptance based on new schema
      const accepted = saved.performance || saved.functional || saved.targeting;
      setConsent(accepted ? "accepted" : "declined");
      console.log("GTM: Final consent decision ->", accepted ? "accepted" : "declined");

      if (accepted && !localStorage.getItem("gtmConsentReloaded")) {
        localStorage.setItem("gtmConsentReloaded", "true");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }
  }, []);

  if (consent !== "accepted" && !forceConsent) return null;

  return (
    <>
      {/* Google Tag Manager (noscript fallback) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NCTJ7WTW"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NCTJ7WTW');
        `}
      </Script>
    </>
  );
}