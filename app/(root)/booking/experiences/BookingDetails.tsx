'use client';

import React from 'react';

interface BookingDetailsProps {
  seats: number;
  duration: string;
  selectedDate: string;
  timeSlot: string;
  pricePerSession: number;
  onContinueAction: () => void;
}

export default function BookingDetails({
  seats,
  duration,
  selectedDate,
  timeSlot,
  pricePerSession,
  onContinueAction,
}: BookingDetailsProps) {
  return (
    <div className="w-full lg:w-[38%] max-h-[360px] bg-black/80 text-white p-4 rounded-lg flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-medium">Participants</div>
            <div className="font-jura">{seats}</div>
          </div>
          <div>
            <div className="font-medium">Date</div>
            <div className="font-jura">{selectedDate}</div>
          </div>
          <div>
            <div className="font-medium">Time</div>
            <div className="font-jura">{timeSlot}</div>
          </div>
          <div>
            <div className="font-medium">Duration</div>
            <div className="font-jura">{duration} minutes</div>
          </div>
          <div>
            <div className="font-medium">Price</div>
            <div className="font-jura">AED {seats * pricePerSession}</div>
          </div>
        </div>
      </div>
      <button
        onClick={onContinueAction}
        className="mt-6 px-6 py-3 text-white font-semibold transition hover:brightness-90 rounded-lg"
      >
        Continue
      </button>
    </div>
  );
}