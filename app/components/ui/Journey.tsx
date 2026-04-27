

// Ensure this is a client component and imports are present
"use client";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCarSide,
  faChalkboardTeacher,
  faChartLine,
  faClock,
  faCogs
} from "@fortawesome/free-solid-svg-icons";

const expectItems = [
  {
    icon: faClock,
    title: "Arrival & Check-in",
    description: "Please arrive 10-15 minutes before your booked time.",
  },
  {
    icon: faChalkboardTeacher,
    title: "Briefing",
    description: "Our team will give you a quick rundown of the controls and session.",
  },
  {
    icon: faCogs,
    title: "Simulator Setup",
    description: "We'll get you comfortably seated and familiar with your chosen car and track.",
  },
  {
    icon: faCarSide,
    title: "The Drive",
    description: "Feel the speed! Our staff are on hand if you need any assistance.",
  },
  {
    icon: faChartLine,
    title: "Post-Race",
    description: "Review your performance, check leaderboards, and plan your next challenge!",
  },
];


export default function Journey() {
  return (
    <>
      <section id="what-to-expect" className="bg-transparent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12 mt-0">
            <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
                What to Expect?
              </span>
            </div>
            <div className="border-t border-gray-500 w-full mb-4" />
            <h2 className="text-5xl font-bold uppercase mb-8">
              Your Sim Racing Journey
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-6 md:space-y-0">
            {expectItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center">
                  <FontAwesomeIcon icon={item.icon} size="3x" className="text-white mb-2" />
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-300 font-jura">{item.description}</p>
                </div>
                {idx < expectItems.length - 1 && (
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-2xl md:text-3xl text-white mx-4 md:block hidden md:rotate-0 rotate-90 my-6 pb-4"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}