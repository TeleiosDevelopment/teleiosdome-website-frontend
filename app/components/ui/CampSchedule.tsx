"use client";

import React from "react";
import Button from "@/app/components/ui/Button";

interface CampSession {
  name: string;
  dates: string;
  time: string;
  ageGroup: string;
  price: number;
  status: string;
  link: string;
}

interface CampScheduleProps {
  sectionTitle?: string;
  sessions: CampSession[];
}

export default function CampSchedule({ sectionTitle, sessions }: CampScheduleProps) {
  return (
    <div>
      <section className="pt-12 pb-12 bg-transparent min-h-[520px]">
        <div className="container mx-auto px-4">
          {sectionTitle && (
            <div className="mb-12 mt-0">
              <div className="flex justify-end mb-2">
                <span className="text-sm text-white uppercase tracking-wider">
                  {sectionTitle}
                </span>
              </div>
              <div className="border-t border-gray-500 w-full mb-4" />
              <h2 className="text-5xl font-bold text-white text-left mt-12">
                {sectionTitle}
              </h2>
            </div>
          )}
          <div className="overflow-x-auto mt-8">
            <table className="min-w-full text-left rounded-lg overflow-hidden bg-[#2C1864C2] text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-600 text-sm font-medium">Camp Name</th>
                  <th className="py-2 px-4 border-b border-gray-600 text-sm font-medium">Dates</th>
                  <th className="py-2 px-4 border-b border-gray-600 text-sm font-medium">Time</th>
                  <th className="py-2 px-4 border-b border-gray-600 text-sm font-medium">Age Group</th>
                  <th className="py-2 px-4 border-b border-gray-600 text-sm font-medium">Price (AED)</th>
                  <th className="py-2 px-4 border-b border-gray-600 text-sm font-medium">Status</th>
                  <th className="py-2 px-4 border-b border-gray-600 text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-4 border-b border-gray-600 text-sm font-jura">{session.name}</td>
                    <td className="py-2 px-4 border-b border-gray-600 text-sm font-jura">{session.dates}</td>
                    <td className="py-2 px-4 border-b border-gray-600 text-sm font-jura">{session.time}</td>
                    <td className="py-2 px-4 border-b border-gray-600 text-sm font-jura">{session.ageGroup}</td>
                    <td className="py-2 px-4 border-b border-gray-600 text-sm font-jura">{session.price}</td>
                    <td className="py-2 px-4 border-b border-gray-600 text-sm font-jura">{session.status}</td>
                    <td className="py-2 px-4 border-b border-gray-600 text-sm font-jura">
                      <Button href={session.link} text="Register" colored />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
