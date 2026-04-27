"use client";

import {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import Script from 'next/script';

declare global {
    interface Window {
        dataLayer?: { push: (event: Record<string, unknown>) => void };
        gtag?: (command: string, action: string, options: Record<string, unknown>) => void;
    }
}

type ConsentChoice = "accepted" | "declined";

export default function CookieBanner() {
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
      performance: false,
      functional: false,
      targeting: false,
    });
    const [consent, setConsent] = useState<ConsentChoice | null>(null);
    const [hasMounted, setHasMounted] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHasMounted(true);

        const cookie = Cookies.get("teleiosCookieConsent");
        let saved: ConsentChoice | { performance: boolean; functional: boolean; targeting: boolean } | null = null;
        if (cookie) {
          try {
            saved = JSON.parse(cookie);
          } catch {
            saved = (cookie === "accepted" || cookie === "declined") ? cookie as ConsentChoice : null;
          }
        }
        if (saved !== null) {
          // determine overall acceptance
          const state = typeof saved === "string"
            ? (saved === "accepted" ? "accepted" : "declined")
            : (saved.performance || saved.functional || saved.targeting ? "accepted" : "declined");
          setConsent(state);
          // push consent_init for GTM Consent Mode
          const adStorage = typeof saved === "string"
            ? (saved === "accepted" ? "granted" : "denied")
            : (saved.targeting ? "granted" : "denied");
          const analyticsStorage = typeof saved === "string"
            ? (saved === "accepted" ? "granted" : "denied")
            : (saved.performance ? "granted" : "denied");
          window.dataLayer?.push({
            event: "consent_init",
            ad_storage: adStorage,
            analytics_storage: analyticsStorage,
            performance: typeof saved !== "string" ? saved.performance : false,
            functional: typeof saved !== "string" ? saved.functional : false,
            targeting: typeof saved !== "string" ? saved.targeting : adStorage === "granted",
            necessary: true
          });
          if (typeof saved !== "string") {
            window.gtag?.("consent", "update", {
              ad_storage: saved.targeting ? "granted" : "denied",
              analytics_storage: saved.performance ? "granted" : "denied",
              ad_user_data: saved.targeting ? "granted" : "denied",
              ad_personalization: saved.targeting ? "granted" : "denied"
            });
          }
        } else if (bannerRef.current) {
          bannerRef.current.focus();
        }
    }, []);

    if (!hasMounted) {
        return (
          <>
            <Script id="consent-default" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent','default',{
                  ad_storage: 'denied',
                  analytics_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied'
                });
              `}
            </Script>
          </>
        );
    }


    const handleAcceptAll = () => {
      // grant everything
      Cookies.set(
        "teleiosCookieConsent",
        JSON.stringify({ performance: true, functional: true, targeting: true }),
        { expires: 365, sameSite: "Lax" }
      );
      window.gtag?.('consent','update',{
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
      setConsent("accepted");
    };

    const handleOpenSettings = () => {
      setShowSettings(true);
    };

    const handleConfirmSettings = () => {
      // save only selected prefs
      Cookies.set(
        "teleiosCookieConsent",
        JSON.stringify(preferences),
        { expires: 365, sameSite: "Lax" }
      );
      window.gtag?.('consent','update',{
        ad_storage: preferences.targeting ? 'granted' : 'denied',
        analytics_storage: preferences.performance ? 'granted' : 'denied',
        ad_user_data: preferences.targeting ? 'granted' : 'denied',
        ad_personalization: preferences.targeting ? 'granted' : 'denied'
      });
      setConsent("accepted");
      setShowSettings(false);
    };

    if (consent) {
        return null;
    }

    return (
        <>
          <div
              ref={bannerRef}
              role="dialog"
              aria-live="polite"
              aria-label="Cookie consent banner"
              tabIndex={-1}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900/70"
          >
              <div className="bg-[#0f0f0f] text-white p-6 rounded shadow-lg max-w-md w-full mx-4">
                  <div className="flex flex-col space-y-4">
                      <p className="text-sm">
                          We use cookies to enhance site functionality and analyze traffic.{" "}
                          <a href="/privacy-policy/" className="underline text-[#d007a6]">
                              Learn more
                          </a>
                      </p>
                      <div className="flex justify-end space-x-2">
                          <button
                            onClick={handleOpenSettings}
                            className="px-4 py-2 text-sm font-medium bg-[#444444] hover:bg-[#2a2a2a] text-white rounded"
                          >
                            Cookie Settings
                          </button>
                          <button
                            onClick={handleAcceptAll}
                            className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white rounded"
                          >
                            Accept All
                          </button>
                      </div>
                  </div>
              </div>
              {showSettings && (
                <div className="fixed inset-0 z-[9999]">
                  <div
                    className="fixed inset-0 bg-neutral-900/70"
                    onClick={() => setShowSettings(false)}
                  />
                  <div className="fixed right-0 top-0 z-[10000] h-full w-80 bg-[#0f0f0f] text-white p-6 shadow-lg flex flex-col">
                    <h2 className="text-lg font-medium mb-4">Cookie Settings</h2>
                    <div className="flex items-center mb-2">
                      <label htmlFor="required" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="required"
                            checked={true}
                            onChange={() => {}}
                            disabled={true}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#7e61f8] rounded-full peer-focus:ring-2 peer-focus:ring-[#d007a6] transition-colors"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-6"></div>
                        </div>
                        <span className="ml-3 text-sm">Strictly Necessary</span>
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <label htmlFor="performance" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="performance"
                            checked={preferences.performance}
                            onChange={() =>
                              setPreferences(prev => ({ ...prev, performance: !prev.performance }))
                            }
                            disabled={false}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#7e61f8] rounded-full peer-focus:ring-2 peer-focus:ring-[#d007a6] transition-colors"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-6"></div>
                        </div>
                        <span className="ml-3 text-sm">Performance</span>
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <label htmlFor="functional" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="functional"
                            checked={preferences.functional}
                            onChange={() =>
                              setPreferences(prev => ({ ...prev, functional: !prev.functional }))
                            }
                            disabled={false}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#7e61f8] rounded-full peer-focus:ring-2 peer-focus:ring-[#d007a6] transition-colors"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-6"></div>
                        </div>
                        <span className="ml-3 text-sm">Functional</span>
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <label htmlFor="targeting" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="targeting"
                            checked={preferences.targeting}
                            onChange={() =>
                              setPreferences(prev => ({ ...prev, targeting: !prev.targeting }))
                            }
                            disabled={false}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#7e61f8] rounded-full peer-focus:ring-2 peer-focus:ring-[#d007a6] transition-colors"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-6"></div>
                        </div>
                        <span className="ml-3 text-sm">Targeting/Advertising</span>
                      </label>
                    </div>
                    <div className="mt-auto flex justify-end space-x-2">
                      <button
                        onClick={() => setShowSettings(false)}
                        className="px-4 py-2 text-sm font-medium bg-[#444444] hover:bg-[#2a2a2a] text-white rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmSettings}
                        className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white rounded"
                      >
                        Confirm My Choices
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </>
    );
}