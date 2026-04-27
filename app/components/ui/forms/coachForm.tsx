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

export default function PrivateForm() {
    const [form, setForm] = useState({
        full_name: "",
        email_address: "",
        phone_number: "",
        current_sim_racing_experience_level: "",
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form/coachingInquiry`, {
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
            console.error('Failed to submit coaching inquiry', error);
            setSubmitted(false);
        }
    };

    return (
        <div className="container mx-auto px-4">

            <div className="pb-12 mt-0">
                <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
                 Coaching Inquiry Form
              </span>
                </div>
                <div className="border-t border-gray-500 w-full mb-4" />
                <h2 className="text-5xl font-bold text-white text-center mt-12">
                    Coaching Inquiry Form                        </h2>

                <div className="pb-10 flex flex-col items-center h-3/4" >
                    <p className="text-lg text-gray-400 mt-2 text-left mb-8"> For your inquiry, fill out the form below</p>

                    {submitted !== null && <ThanksMessage success={submitted} />}

                    {submitted === null && (
                    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
                        <div>
                            <label htmlFor="full_name" className="sr-only">Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                required
                                placeholder="Full Name"
                                value={form.full_name}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura"
                            />
                        </div>
                        <div>
                            <label htmlFor="email_address" className="sr-only">Email Address</label>
                            <input
                                type="email"
                                name="email_address"
                                id="email_address"
                                required
                                placeholder="Email Address"
                                value={form.email_address}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura"
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
                                containerClass="!w-full !text-white !rounded-none !border-b"
                                placeholder="Your Phone"
                            />
                        </div>
                        <div>
                            <label htmlFor="current_sim_racing_experience_level" className="sr-only">Current Sim Racing Experience Level</label>
                            <select
                                name="current_sim_racing_experience_level"
                                id="current_sim_racing_experience_level"
                                required
                                value={form.current_sim_racing_experience_level}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura [&>option]:text-black [&>option]:bg-white"
                            >
                                <option value="" disabled hidden>Current Sim Racing Experience Level</option>
                                <option>Beginner (New to sim racing)</option>
                                <option>Intermediate (Comfortable, looking to improve)</option>
                                <option>Advanced (Experienced, seeking competitive edge)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="specific_requirements_message" className="sr-only">Message</label>
                            <textarea
                                name="specific_requirements_message"
                                id="specific_requirements_message"

                                rows={5}
                                placeholder="Specific Requirments / Message (optional)"
                                value={form.specific_requirements_message}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura"
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
                                <span className="skew-x-12">Request Coaching Session</span>
                            </button>
                        </div>
                    </form>
                    )}
                </div>
            </div>

        </div>
    );
}
