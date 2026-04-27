"use client";

import React, {useEffect, useRef, useState} from 'react';
import {useBooking} from '@/app/contexts/BookingContext';
import {useRouter} from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function ConfirmedMessage() {
  const { bookingData } = useBooking();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasAttemptedSaveRef = useRef(false);

  useEffect(() => {
    if (hasAttemptedSaveRef.current || isSaved) return;
    const { date, time, seats, duration, firstName, lastName, email, phone } = bookingData;
    if (!date || !time || !seats || !duration || !firstName || !lastName || !email || !phone) {
      router.replace('/booking/experiences');
      return;
    }
    async function saveBooking() {
      hasAttemptedSaveRef.current = true;
      try {
        const { firstName, lastName, email, phone, date, time, seats } = bookingData as typeof bookingData & { bookingTypeId?: string };
        const totalPrice = bookingData.price;
        const payload = {
          customer_first_name: firstName,
          customer_last_name: lastName,
          customer_phone: phone,
          customer_email: email,
          number_of_people: seats.toString(),
          booking_datetime: `${date} ${time}`,
          is_online: 1,
          amount: totalPrice.toString(),
          duration: duration.toString(),
          payment_method: 'card',
          payment_status: 0,
          booking_type: 'normal',
          booking_status: 'created',
        };

        console.log('Booking payload:', payload);
        const response = await fetch(`${API_BASE_URL}/api/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          setError('Failed to save booking');
          return;
        }
        setIsSaved(true);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    }
    saveBooking();
  }, [bookingData, router, isSaved]);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-black/80 p-12 rounded-2xl text-white font-orbitron">
        <h1 className="text-3xl font-bold mb-6">Reservation Confirmed</h1>
        {error ? (
          <p className="mb-4 text-red-400">Error: {error}</p>
        ) : !isSaved ? (
          <div className="flex justify-center mb-6">
            <svg
              className="animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <p>Dear <span className="font-semibold">{bookingData.firstName} {bookingData.lastName}</span>,</p>
            <p>We are pleased to confirm your reservation on <span className="font-semibold">{bookingData.date}</span> at <span className="font-semibold">{bookingData.time}</span>.</p>
            <p>A confirmation email has been sent to <span className="font-semibold">{bookingData.email}</span>.</p>
            <p>Should you have any questions, please contact us at <span className="font-semibold">{bookingData.phone}</span>.</p>
            <p>Total Amount: <span className="font-semibold">AED {bookingData.price}</span>.</p>
          </div>
        )}
        <button
          onClick={() => router.push('/')}
          className="mt-4 -skew-x-12 bg-purple-600 px-6 py-3 font-semibold text-white rounded-tl-[12px] rounded-br-[12px] transition hover:brightness-90"
        >
          <span className="skew-x-12">Return to Homepage</span>
        </button>
      </div>
    </div>
  );
}