"use client";

import React, {useState} from "react";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";

const categoryOptions: { [key: string]: string[] } = {
    Simulators: [
        "More details on VOLO",
        "More details on Hydra-One",
        "More details on Academy",
        "More information on the Simulators",
    ],
    "Exhibitions & Brand Activation": [
        "Exhibition Request",
        "Brand Activation Request",
    ],
    "Venue & Factory Visits": [
        "Schedule Factory Tour",
        "Request Venue Proposal",
        "Schedule a Visit",
    ],
    "Venues Booking": ["Inquire About Private Events in Teleios Dome"],
    "Racing Team Inquiries": ["More information on the Racing Team"],
    Careers: ["Joining our Team"],
    General: ["Sponsorship", "General Questions", "Schedule a Consultation"],
};

// Dynamically load PhoneInput
const PhoneInput = dynamic(() => import("react-phone-input-2"), {
    ssr: false,
    loading: () => (
        <div className="h-[42px] bg-gray-100 animate-pulse rounded w-full" />
    ),
});

export interface FormSectionProps {
    /** The HTML id for this section */
    id: string;
    /** Section number (e.g. 3) */
    sectionNumber: number;
    /** Subtitle text (e.g. "Brand Activation") */
    subtitle: string;
    /** The main heading for the left column */
    heading: string;
    /** Description paragraph under the heading */
    description: string;
    /** Background color utility classes (e.g. "bg-white" or "bg-black"). Default: "bg-black" */
    bgColor?: string;
    /** Text color utility classes (e.g. "text-white" or "text-black"). Default: "text-white" */
    textColor?: string;
}

export default function FormSection({
    id,
    sectionNumber,
    subtitle,
    heading,
    description,
    bgColor = "bg-black",
    textColor = "text-white",
}: FormSectionProps) {
    // Form fields
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("General");
    const [selectedReason, setSelectedReason] = useState("General Questions");
    const [message, setMessage] = useState("");

    // Validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // NEW: Track if form has been successfully submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = "Name is required.";
        if (!surname.trim()) newErrors.surname = "Surname is required.";
        if (!phone.trim()) newErrors.phone = "Phone number is required.";
        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Invalid email address.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = {
            name,
            surname,
            phone,
            email,
            category: selectedCategory,
            reason: selectedReason,
            message,
        };

        try {
            // POST to /api/contact
            setIsLoading(true);
            const response = await fetch((String(process.env.NEXT_PUBLIC_MAILER_URL)), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secret: String(process.env.NEXT_PUBLIC_MAILER_SECRET), ...formData }),
            });
            setIsLoading(false);
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Submission failed: ${errorData.error || "Unknown error"}`);
                return;
            }

            // If success, reset form
            setName("");
            setSurname("");
            setPhone("");
            setEmail("");
            setSelectedCategory("General");
            setSelectedReason("General Questions");
            setMessage("");
            setErrors({});

            // Hide the form and display the thank-you message
            setIsSubmitted(true);

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error submitting your inquiry.");
        }
    };

    return (
        <section
            id={id}
            className={`${bgColor} ${textColor} py-16`}
            style={{
                "--bg-color": bgColor === "bg-black"
                    ? "#000000"
                    : bgColor === "bg-white"
                        ? "#ffffff"
                        : bgColor === "bg-[#181818]"
                            ? "#181818"
                            : "#000000",
                "--text-color": textColor === "text-black" ? "#000000" : "#ffffff",
                "--bg-hover-color": "rgba(255, 255, 255, 0.05)",
                "--bg-highlight-color": "rgba(255, 255, 255, 0.1)"
            } as React.CSSProperties}
        >
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* LEFT COLUMN */}
                <div>
                    <span className="text-[#c2a063] font-bold text-sm uppercase tracking-wide">
                        {sectionNumber} &nbsp; {subtitle}
                    </span>
                    <h2 className="text-3xl font-bold mt-2 mb-4">{heading}</h2>
                    <p className="leading-relaxed">{description}</p>
                </div>

                {/* RIGHT COLUMN */}
                <div className={`bg-transparent ${textColor} rounded-lg shadow-lg p-8`}>
                    {!isSubmitted ? (
                        // Render the form if not yet submitted
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name + Surname */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        placeholder="Name *"
                                        className={`w-full border bg-transparent border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c2a063] ${errors.name ? "border-red-500" : ""
                                            }`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <input
                                        type="text"
                                        placeholder="Surname *"
                                        className={`w-full border bg-transparent border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c2a063] ${errors.surname ? "border-red-500" : ""
                                            }`}
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    {errors.surname && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.surname}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Phone (using PhoneInput) */}
                            <div>
                                <PhoneInput
                                    country={"ae"}
                                    value={phone}
                                    onChange={setPhone}
                                    inputClass={`!w-full !${bgColor} !border !border-gray-300 !rounded !px-3 !py-2 !pl-14 !text-white focus:!outline-none focus:!ring-2 focus:!ring-[#c2a063] ${errors.phone ? "!border-red-500" : ""
                                        }`}
                                    buttonClass="!border-r !border-gray-300 !bg-transparent !rounded-l"
                                    dropdownClass="!border !border-gray-300 !rounded !mt-1 !z-[100] text-black"
                                    containerClass="!flex !relative"
                                    placeholder="Phone Number *"
                                    disabled={isLoading}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email *"
                                    className={`w-full border bg-transparent border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c2a063] ${errors.email ? "border-red-500" : ""
                                        }`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Category (Floating Label) */}
                            <div className="relative">
                                <span className="bg-transparent absolute top-2 left-3 text-xs text-gray-500 pointer-events-none">
                                    Category
                                </span>
                                <select
                                    className={`w-full ${bgColor} border border-gray-300 rounded px-3 pt-7 pb-2 focus:outline-none focus:ring-2 focus:ring-[#c2a063] text-base`}
                                    value={selectedCategory}
                                    disabled={isLoading}
                                    onChange={(e) => {
                                        const newCategory = e.target.value;
                                        setSelectedCategory(newCategory);
                                        setSelectedReason(
                                            categoryOptions[newCategory]?.[0] || ""
                                        );
                                    }}
                                >
                                    {Object.keys(categoryOptions).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Reason (Floating Label) */}
                            <div className="relative">
                                <span className="bg-transparent absolute top-2 left-3 text-xs text-gray-500 pointer-events-none">
                                    Reason
                                </span>
                                <select
                                    disabled={isLoading}
                                    className={`w-full ${bgColor} border border-gray-300 rounded px-3 pt-7 pb-2 focus:outline-none focus:ring-2 focus:ring-[#c2a063] text-base`}
                                    value={selectedReason}
                                    onChange={(e) => setSelectedReason(e.target.value)}
                                >
                                    {(categoryOptions[selectedCategory] || []).map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <textarea
                                    disabled={isLoading}
                                    placeholder="Message"
                                    className="w-full border bg-transparent border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c2a063]"
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            {/* Terms */}
                            <div className="text-sm text-gray-300 mt-4">
                                By submitting, you agree to our{" "}
                                <a
                                    href="/terms-of-service"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#c2a063] hover:underline"
                                >
                                    Terms of Service
                                </a>
                                .
                            </div>

                            {/* Submit Button */}
                            <div className="mt-4 text-center">
                                <button
                                    type="submit"
                                    className={`mt-4 bg-[#c2a063] hover:bg-[#c2a068] text-white font-semibold px-6 py-3 rounded transition w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg
                                            className="animate-spin h-5 w-5 mx-auto text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        // After successful submission, show a thank-you message
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">Thank You!</h3>
                            <p className="text-gray-200 leading-relaxed">
                                We appreciate you reaching out. Your inquiry has been received
                                and will be reviewed by our team. You can expect a response
                                within the next 48 hours.
                            </p>
                            <p className="text-gray-200">
                                In the meantime, feel free to continue exploring our site or
                                reach out if you have any additional questions.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {/* Global CSS overrides for react-phone-input-2 */}
            <style jsx global>{`
  .react-tel-input .form-control {
    background-color: var(--bg-color) !important;
    color: var(--text-color) !important;
  }

  .react-tel-input .flag-dropdown {
    background-color: var(--bg-color) !important;
  }

  .react-tel-input .country-list {
    background-color: var(--bg-color) !important;
    background: var(--bg-color) !important;
    color: var(--text-color) !important;
  }

  .react-tel-input .country-list .country:hover {
    background-color: var(--bg-hover-color, rgba(255, 255, 255, 0.05)) !important;
    color: var(--text-color) !important;
  }

  .react-tel-input .selected-flag:hover,
  .react-tel-input .selected-flag:focus {
    background-color: var(--bg-hover-color, rgba(255, 255, 255, 0.05)) !important;
  }

  .react-tel-input .country-list .country.highlight {
    background-color: var(--bg-highlight-color, rgba(255, 255, 255, 0.1)) !important;
  }

  .react-tel-input .flag-dropdown.open .selected-flag {
    background: var(--bg-color) !important;
    border-radius: 3px 0 0 0 !important;
  }
`}</style>
        </section>
    );
}