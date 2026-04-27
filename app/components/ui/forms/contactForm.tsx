"use client";
import {useState} from "react";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
import {FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp} from "react-icons/fa";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faInstagram, faTiktok, faYoutube} from '@fortawesome/free-brands-svg-icons';
import Image from "next/image";
import ThanksMessage from "./ThanksMessage";

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
  ssr: false,
  loading: () => (
    <div className="h-[42px] bg-gray-100 animate-pulse rounded w-full" />
  ),
});

export default function ContactSection() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState<null | boolean>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form/generalContact`, {
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
    <section
      className="text-white py-16 bg-[#1a0e3a]"
    >
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Phone */}
          <a href="tel:+971504804408" className="bg-gradient-to-r from-[#7e61f8] to-[#d007a6] transition duration-300 transform -skew-x-12 rounded-tl-[12px] rounded-br-[12px] p-6 shadow-lg flex flex-col items-center justify-center hover:brightness-110">
            <div className="skew-x-12 flex flex-col items-center justify-center text-center">
              <FaPhoneAlt className="text-white text-4xl mb-3" />
              <h4 className="text-lg font-semibold text-white">Call Us</h4>
              <span className="text-sm font-jura  text-white mt-2">
                +971 50 480 4408
              </span>
            </div>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/971504804408" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#7e61f8] to-[#d007a6] transition duration-300 transform -skew-x-12 rounded-tl-[12px] rounded-br-[12px] p-6 shadow-lg flex flex-col items-center justify-center hover:brightness-110">
            <div className="skew-x-12 flex flex-col items-center justify-center text-center">
              <FaWhatsapp className="text-white text-4xl mb-3" />
              <h4 className="text-lg font-semibold text-white">WhatsApp</h4>
              <span className="text-sm font-jura text-white mt-2">
                +971 50 480 4408
              </span>
            </div>
          </a>

          {/* Email */}
          <a href="mailto:info@teleios.ae" className="bg-gradient-to-r from-[#7e61f8] to-[#d007a6] transition duration-300 transform -skew-x-12 rounded-tl-[12px] rounded-br-[12px] p-6 shadow-lg flex flex-col items-center justify-center hover:brightness-110">
            <div className="skew-x-12 flex flex-col items-center justify-center text-center">
              <FaEnvelope className="text-white text-4xl mb-3" />
              <h4 className="text-lg font-semibold text-white">Email Us</h4>
              <span className="text-sm font-jura text-white mt-2">
                info@teleios.ae
              </span>
            </div>
          </a>

          {/* Address */}
          <a href="https://maps.app.goo.gl/f9wk21oVt3zoFrRt8" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#7e61f8] to-[#d007a6] transition duration-300 transform -skew-x-12 rounded-tl-[12px] rounded-br-[12px] p-6 shadow-lg flex flex-col items-center justify-center hover:brightness-110">
            <div className="skew-x-12 flex flex-col items-center justify-center text-center">
              <FaMapMarkerAlt className="text-white text-4xl mb-3" />
              <h4 className="text-lg font-semibold text-white">Visit Us</h4>
              <span className="text-sm text-white mt-2 text-center font-jura">
                IMPZ D65, Dubai, UAE
              </span>
            </div>
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch Directly</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6 text-center">Send Us a Message Now</h2>
            {submitted === null && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="full_name" className="sr-only">Name</label>
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
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Your Email"
                    value={form.email}
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
                  <label htmlFor="subject" className="sr-only">Subject</label>
                  <select
                    name="subject"
                    id="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 hover:border-pink-400 focus:border-pink-500 [&>option]:text-black [&>option]:bg-white"
                  >
                    <option value="" disabled hidden>Select Subject</option>
                    <option>General Inquiry</option>
                    <option>Booking Question</option>
                    <option>Corporate Event Inquiry</option>
                    <option>Private Party Inquiry</option>
                    <option>Championship/Event Info</option>
                    <option>Education Program Info</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={5}
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white placeholder-white text-white focus:outline-none py-2 font-jura transition duration-300 hover:border-pink-400 focus:border-pink-500"
                  />
                </div>
                {/* reCAPTCHA placeholder */}
                <div>

                </div>
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center transition duration-300 transform -skew-x-12 px-6 h-[44px] text-sm leading-[10px] rounded-tl-[12px] rounded-br-[12px] bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white hover:brightness-110"
                  >
                    <span className="skew-x-12">Send Message</span>
                  </button>
                </div>
              </form>
            )}
            {submitted !== null && (
              <div className="w-full max-w-lg mx-auto">
                <ThanksMessage success={submitted} />
              </div>
            )}
          </div>
          {/* Right-side text block */}
          <div className="order-1 md:order-2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
            <p className="mb-6 font-jura">We&#39;re here to help! Whether you have a question about our experiences, want to plan an event, or just want to know more, please don&#39;t hesitate to get in touch. Reach out via phone, email, or the contact form below, and our team will get back to you as soon as possible.</p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/people/Teleios-Dome/61561142146663/"
                target="_blank"
                rel="noreferrer"
                aria-label="Teleios Dome on Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="h-7 w-7 hover:text-[#1877f2]" />
              </a>
              <a
                href="https://www.instagram.com/teleios_dome/"
                target="_blank"
                rel="noreferrer"
                aria-label="Teleios Dome on Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-7 w-7 hover:text-[#e1306c]" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCr06C0u6WQdVO_kYi38W_4A"
                target="_blank"
                rel="noreferrer"
                aria-label="Teleios Dome on YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} className="h-7 w-7 hover:text-[#ff0000]" />
              </a>
              <a
                href="https://www.tiktok.com/@teleiosdome.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Teleios Dome on TikTok"
              >
                <FontAwesomeIcon icon={faTiktok} className="h-7 w-7 hover:text-white" />
              </a>
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g295424-d28054157-Reviews-Teleios_Dome-Dubai_Emirate_of_Dubai.html"
                target="_blank"
                rel="noreferrer"
                aria-label="Teleios Dome on TripAdvisor"
              >
                <Image src="/brand/tripadvisor.svg" alt="TripAdvisor" width={28} height={28} className="hover:opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
