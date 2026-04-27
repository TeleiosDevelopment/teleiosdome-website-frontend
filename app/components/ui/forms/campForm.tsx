// Ensure React hooks work in this component
// Ensure React hooks work in this component
"use client";
import React, {useState} from "react";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
import clsx from "clsx";
import ThanksMessage from "./ThanksMessage";

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
    ssr: false,
    loading: () => (
        <div className="h-[42px] bg-gray-100 animate-pulse rounded w-full" />
    ),
});

export default function CampForm() {
    const [form, setForm] = useState({
        parent_guardian_full_name: "",
        parent_guardian_email_address: "",
        parent_guardian_phone_number: "",
        child_full_name: "",
        child_age: "",
        specific_requirements_message: "",
    });

    const [submitted, setSubmitted] = useState<null | boolean>(null);
    const [phone, setPhone] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form/campRegistration`, {
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
        }
    };

    return (
        <div className="container mx-auto px-4">

            <div className="pb-12 mt-0">
                <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
                 Camp Registration Form
              </span>
                </div>
                <div className="border-t border-gray-500 w-full mb-4" />
                <h2 className="text-5xl font-bold text-white text-center mt-12">
                    Camp Registration Form                        </h2>

                <div className="pb-10 flex flex-col items-center h-3/4" >
                    <p className="text-lg text-gray-400 mt-2 text-left mb-8"> This form is for parents to register their children for sim racing camps.</p>

                    {submitted !== null && <ThanksMessage success={submitted} />}

                    {submitted === null && (
                      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
                        <div>
                            <label htmlFor="parent_guardian_full_name" className="sr-only">Parent/Guardian Full Name</label>
                            <input
                                type="text"
                                name="parent_guardian_full_name"
                                id="parent_guardian_full_name"
                                required
                                placeholder="Parent/Guardian Full Name"
                                value={form.parent_guardian_full_name}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 focus:border-pink-500 hover:border-pink-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="parent_guardian_email_address" className="sr-only">Parent/Guardian Email Address</label>
                            <input
                                type="email"
                                name="parent_guardian_email_address"
                                id="parent_guardian_email_address"
                                required
                                placeholder="Parent/Guardian Email Address"
                                value={form.parent_guardian_email_address}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 focus:border-pink-500 hover:border-pink-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="parent_guardian_phone_number" className="sr-only">Phone Number</label>
                            <PhoneInput
                                country={"ae"}
                                value={phone}
                                onChange={(value) => {
                                    setPhone(value);
                                    setForm({ ...form, parent_guardian_phone_number: value });
                                }}
                                inputClass="!w-full !bg-transparent !text-white !pl-12 !py-2 placeholder-white !border-none font-jura"
                                buttonClass="!border-none !bg-transparent"
                                dropdownClass="!bg-white !text-black"
                                containerClass="!w-full !text-white !rounded-none !border-b"
                                placeholder="Your Phone"
                            />
                        </div>
                        <div>
                            <label htmlFor="child_full_name" className="sr-only">Child&#39;s Full Name</label>
                            <input
                                type="text"
                                name="child_full_name"
                                id="child_full_name"
                                required
                                placeholder="Child's Full Name"
                                value={form.child_full_name}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 focus:border-pink-500 hover:border-pink-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="child_age" className="sr-only">Child&#39;s Age</label>
                            <input
                                type="number"
                                name="child_age"
                                id="child_age"
                                required
                                min="0"
                                placeholder="Child's Age"
                                value={form.child_age}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 focus:border-pink-500 hover:border-pink-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="specific_requirements_message" className="sr-only">Message</label>
                            <textarea
                                name="specific_requirements_message"
                                id="specific_requirements_message"

                                rows={5}
                                placeholder="Specific Requirements / Message (optional)"
                                value={form.specific_requirements_message}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 focus:border-pink-500 hover:border-pink-400"
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
                                <span className="skew-x-12">Request Camp Information</span>
                            </button>
                        </div>
                      </form>
                    )}
                </div>
            </div>

        </div>
    );
}