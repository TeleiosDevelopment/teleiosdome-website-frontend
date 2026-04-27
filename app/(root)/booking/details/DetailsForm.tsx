"use client";

import React, {useEffect, useState} from "react";
// useBeforeUnload is not available from 'react', so this import is intentionally omitted.
import {useBooking} from "@/app/contexts/BookingContext";
import {useRouter} from "next/navigation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PersonalDetails() {
  const { bookingData, setBookingData } = useBooking();
  const router = useRouter();

  useEffect(() => {
    const { date, time, seats, duration } = bookingData;
    if (!date || !time || !seats || !duration) {
      router.replace("/booking/experiences");
    }
  }, [bookingData, router]);

  // Warn user before leaving the page (refresh, close, or navigate away)
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);


  const [firstName, setFirstName] = useState(bookingData.firstName || "");
  const [lastName, setLastName] = useState(bookingData.lastName || "");
  const [email, setEmail] = useState(bookingData.email || "");
  const [phone, setPhone] = useState(bookingData.phone || "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleContinue = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanedPhone = phone.replace(/\D/g, ""); // Remove non-digits

    if (!firstName || !lastName || !email || !phone) {
      setErrorMessage("Please fill in all personal details before continuing.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (cleanedPhone.length < 9) {
      setErrorMessage("Phone number must have at least 9 digits.");
      return;
    }

    setErrorMessage("");
    setBookingData({ ...bookingData, firstName, lastName, email, phone });
    router.push("/booking/confirmation");
  };

  return (
    <div className=" min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto flex justify-center">
        <div className="w-full lg:w-[80%]">
          <div className="bg-black/80 p-12 rounded-2xl w-full max-w-6xl font-orbitron text-white">
        <h1 className="text-3xl font-bold mb-6">Registration Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Name */}
          <div>
            <label className="block mb-2">First Name</label>
            <div className="flex items-center -skew-x-12 border border-white rounded-tl-[12px] rounded-br-[12px] p-4">
              <input
                type="text"
                className="flex-1 bg-transparent outline-none skew-x-12 font-jura placeholder:text-white/60"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          {/* Last Name */}
          <div>
            <label className="block mb-2">Last Name</label>
            <div className="flex items-center -skew-x-12 border border-white rounded-tl-[12px] rounded-br-[12px] p-4">
              <input
                type="text"
                className="flex-1 bg-transparent outline-none skew-x-12 font-jura placeholder:text-white/60"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          {/* Email */}
          <div className="md:col-span-2">
            <label className="block mb-2">Email</label>
            <div className="flex -skew-x-12 border border-white rounded-tl-[12px] rounded-br-[12px] p-4">
              <input
                type="email"
                className="flex-1 bg-transparent outline-none skew-x-12 font-jura placeholder:text-white/60"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* Phone */}
          <div className="relative md:col-span-2 mt-4"> {/* added mt-4 for spacing */}
            <label className="block mb-2">Phone</label>

            {/* Skewed background */}
            <div className="absolute inset-x-0 top-[1.7rem] h-full -skew-x-12 border border-white rounded-tl-[12px] rounded-br-[12px] pointer-events-none z-0" />

            {/* Input wrapper */}
            <div className="relative z-10 pt-3 ">
              <PhoneInput
                  country="ae"
                  value={phone}
                  onChange={setPhone}
                  placeholder="+971 50 123 4567"
                  containerStyle={{
                    width: '100%',
                    position: 'relative',
                    overflow: 'visible',
                    marginTop: '0.5rem',
                  }}
                  inputStyle={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    width: '100%',
                    fontSize: '1.125rem', // larger text
                    lineHeight: '1.75rem',
                    padding: '1rem',
                    paddingLeft: '4rem',
                    fontFamily: 'Jura',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0 0.75rem'
                  }}
                  dropdownStyle={{
                    backgroundColor: 'black',
                    color: 'pink',


                    zIndex: 9999,
                  }}
                  dropdownClass="custom-phone-dropdown"
              />
            </div>

          </div>
        </div>
        <button
          onClick={handleContinue}
          className="mt-12 w-full -skew-x-12 bg-gradient-to-r from-[#7e61f8] to-[#d007a6]  py-4 text-white font-semibold text-lg transition hover:brightness-110 rounded-tl-[12px] rounded-br-[12px]"
        >
          <span className="skew-x-12">Continue</span>
        </button>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}