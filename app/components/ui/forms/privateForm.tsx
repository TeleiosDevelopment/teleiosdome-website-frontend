"use client";
import React, {useState} from "react";
import clsx from "clsx";
import ThanksMessage from "./ThanksMessage";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
    ssr: false,
    loading: () => (
        <div className="h-[42px] bg-gray-100 animate-pulse rounded w-full" />
    ),
});

export default function PrivateForm() {
    const [form, setForm] = useState({
        full_name: "",
        email_address: "",
        phone_number: "",
        occasion: "",
        specific_requirements_message: "",
    });
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState<null | boolean>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form/privatePartyInquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                setSubmitted(false);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setSubmitted(false);
        }
    };

    return (
        <div className="container mx-auto px-4">

            <div className="pb-12 mt-0">
                <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
                 Private Events Form
              </span>
                </div>
                <div className="border-t border-gray-500 w-full mb-4" />
                <h2 className="text-5xl font-bold text-white text-center mt-12">
                    Private Events Form                        </h2>

    <div className="pb-10 flex flex-col items-center h-3/4" >
        <p className="text-lg text-gray-400 mt-2 text-left mb-8"> For your inquiry, fill out the form below</p>

            {submitted !== null && (
              <div className="w-full max-w-lg mx-auto">
                <ThanksMessage success={submitted} />
              </div>
            )}
            {submitted === null && (
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
                <div>
                    <label htmlFor="full_name" className="sr-only">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        required
                        placeholder="Your Name"
                        value={form.full_name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 hover:border-pink-400 focus:border-pink-500"
                    />
                </div>
                <div>
                    <label htmlFor="email_address" className="sr-only">Email</label>
                    <input
                        type="email"
                        name="email_address"
                        id="email_address"
                        required
                        placeholder="Your Email"
                        value={form.email_address}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 hover:border-pink-400 focus:border-pink-500"
                    />
                </div>
                <div>
                    <label htmlFor="phone_number" className="sr-only">Phone</label>
                    <PhoneInput
                        country={"ae"}
                        value={phone}
                        onChange={(value) => {
                            setPhone(value);
                            setForm({ ...form, phone_number: value });
                        }}
                        inputClass="!w-full !bg-transparent !text-white !pl-12 !py-2 placeholder-white !border-none font-jura"
                        buttonClass="!border-none !bg-transparent"
                        dropdownClass="!bg-white !text-black"
                        containerClass="!w-full !text-white !rounded-none !border-b hover:border-pink-400 focus-within:border-pink-500 transition duration-300"
                        placeholder="Your Phone"
                    />
                </div>
                <div>
                    <label htmlFor="occasion" className="sr-only">Occasion</label>
                    <select
                        name="occasion"
                        id="occasion"
                        required
                        value={form.occasion}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white text-white focus:outline-none py-2 font-jura transition duration-300 hover:border-pink-400 focus:border-pink-500 [&>option]:text-black [&>option]:bg-white"
                    >
                        <option value="" disabled>Select Occasion</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Private Party">Private Party</option>
                        <option value="Friends & Family Gathering">Friends & Family Gathering</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="specific_requirements_message" className="sr-only">Specific Requirements / Message</label>
                    <textarea
                        name="specific_requirements_message"
                        id="specific_requirements_message"
                        rows={5}
                        placeholder="Specific Requirements / Message"
                        value={form.specific_requirements_message}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 hover:border-pink-400 focus:border-pink-500"
                    />
                </div>
                <div>
                    {/* reCAPTCHA placeholder */}
                </div>
                <div className="flex justify-center">
                    <button
                      type="submit"
                      className={clsx(
                        "flex items-center justify-center transition duration-300 transform -skew-x-12",
                        "px-6 h-[44px] text-sm leading-[10px] rounded-tl-[12px] rounded-br-[12px]",
                        "bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white hover:brightness-110"
                      )}
                    >
                      <span className="skew-x-12">Inquire About Private Parties</span>
                    </button>
                </div>
            </form>
            )}
        </div>
            </div>

      </div>
  );
}
