"use client";
import React, {useState} from "react";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
import clsx from "clsx";

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
    ssr: false,
    loading: () => (
        <div className="h-[42px] bg-gray-100 animate-pulse rounded w-full" />
    ),
});

export default function PrivateForm() {
    const [form, setForm] = useState({
        full_name_or_group_name: "",
        email_address: "",
        phone_number: "",
        number_of_participants: "",
        specific_interests_message: "",
    });

    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState<null | boolean>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form/tourPackageInquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                console.log("Form submitted successfully.");
                setSubmitted(true);
            } else {
                console.error("Form submission failed.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="container mx-auto px-4">

            <div className="pb-12 mt-0">
                <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
                 Tour Package Inquiry Form
              </span>
                </div>
                <div className="border-t border-gray-500 w-full mb-4" />
                <h2 className="text-5xl font-bold text-white text-center mt-12">
                    Tour Package Inquiry Form                        </h2>

                <div className="pb-10 flex flex-col items-center h-3/4" >
                    <p className="text-lg text-gray-400 mt-2 text-left mb-8"> For your inquiry, fill out the form below</p>

                    {submitted === null && (
                    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
                        <div>
                            <label htmlFor="full_name_or_group_name" className="sr-only">Full Name or Group Name</label>
                            <input
                                type="text"
                                name="full_name_or_group_name"
                                id="full_name_or_group_name"
                                required
                                placeholder="Full Name or Group Name"
                                value={form.full_name_or_group_name}
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
                            <label htmlFor="phone_number" className="sr-only">Phone Number</label>
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
                            <label htmlFor="number_of_participants" className="sr-only">Number of Participants</label>
                            <input
                                type="number"
                                name="number_of_participants"
                                id="number_of_participants"
                                required
                                min="0"
                                placeholder="Number of Participants"
                                value={form.number_of_participants}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 hover:border-pink-400 focus:border-pink-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="specific_interests_message" className="sr-only">Message</label>
                            <textarea
                                name="specific_interests_message"
                                id="specific_interests_message"
                                rows={5}
                                placeholder="Any Specific Interests / Message (e.g., &quot;We are a school STEM club&quot;, &quot;Interested in the engineering aspects&quot;)"
                                value={form.specific_interests_message}
                                onChange={handleChange}
                                className="w-full resize-none bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 hover:border-pink-400 focus:border-pink-500"
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
                                <span className="skew-x-12">Inquire About a Tour</span>
                            </button>
                        </div>
                    </form>
                    )}
                    {submitted !== null && (
                        <div className="text-white text-center">Thank you for your inquiry!</div>
                    )}
                </div>
            </div>

        </div>
    );
}