"use client";

import Cookies from 'js-cookie';
import React, {useEffect, useState} from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface Booking {
  id: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  seats: number;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: string;
  isOnline: boolean;
  duration: number;
  price: number;
  bookingTypeId?: string;
  bookingType?: {
    name: string;
    duration: number;
    price: number;
  };
  simulators?: { id: string; number: number; available: number }[];
}

// Generate next 7 days for x-axis labels
const days = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date.toISOString().split("T")[0];
});

const Chart = () => {
  const [bookingsByDay, setBookingsByDay] = useState<number[]>([]);

  useEffect(() => {
    async function load() {
      const token = Cookies.get('access_token');
      const headers: HeadersInit = { Accept: 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API_BASE_URL}/api/bookings`, { method: 'GET', headers });
      if (!res.ok) {
        console.error('Failed to fetch bookings');
        return;
      }
      const json = await res.json();
      const data: Booking[] = (json.data as {
        id: string;
        booking_datetime: string;
        customer_first_name: string;
        customer_last_name: string;
        customer_email: string;
        customer_phone: string;
        number_of_people: string | number;
        payment_method: string;
        payment_status: string;
        booking_status: string;
        is_online: boolean;
        duration: string;
        amount: string;
        booking_type_id?: string;
        booking_type_name?: string;
        simulators?: { id: string; number: number; available: number }[];
      }[]).map(item => {
        const [date, time] = item.booking_datetime.split(' ');
        const amountNum = Number(item.amount);
        return {
          id: item.id,
          date,
          time,
          firstName: item.customer_first_name,
          lastName: item.customer_last_name,
          email: item.customer_email,
          phone: item.customer_phone,
          seats: Number(item.number_of_people),
          paymentMethod: item.payment_method,
          paymentStatus: item.payment_status,
          bookingStatus: item.booking_status,
          isOnline: item.is_online,
          duration: parseInt(item.duration, 10),
          price: isNaN(amountNum) ? 0 : amountNum,
          bookingTypeId: item.booking_type_id,
          bookingType: {
            name: item.booking_type_name ?? '',
            duration: parseInt(item.duration, 10),
            price: isNaN(amountNum) ? 0 : amountNum,
          },
          simulators: item.simulators,
        };
      });
      const counts = days.map(() => 0);
      data.forEach(b => {
        const idx = days.indexOf(b.date);
        if (idx !== -1) {
          counts[idx] += 1;
        }
      });
      setBookingsByDay(counts);
    }
    load();
  }, []);

  const maxCount = Math.max(...bookingsByDay, 1);
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-medium mb-4">Bookings Next 7 Days</h2>
      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between mr-4 text-xs text-gray-600 h-48">
          {Array.from({ length: maxCount }, (_, i) => maxCount - i).map((val) => (
            <div key={val}>{val}</div>
          ))}
        </div>
        {/* Chart area */}
        <div className="relative flex-1" style={{ height: `${Math.max(200, maxCount * 20)}px` }}>
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {Array.from({ length: maxCount }, (_, i) => (
              <div key={i} className="border-t border-gray-200 w-full" />
            ))}
          </div>
          {/* Bars */}
          <div className="absolute inset-0 grid grid-cols-7 gap-x-2 items-end">
            {bookingsByDay.map((count, i) => (
              <div
                key={i}
                className="w-full bg-pink-600 rounded-t-sm transition-all duration-300 ease-out"
                style={{ height: count === 0 ? '0%' : `${Math.max(5, (count / maxCount) * 100)}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* X-axis labels */}
      <div className="mt-2 flex justify-between text-xs text-gray-600">
        {days.map((d, i) => (
          <div key={i}>
            {new Date(d).toLocaleDateString("en-US", { weekday: "short" })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;