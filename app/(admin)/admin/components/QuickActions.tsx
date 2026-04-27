"use client";

import {useState} from "react";
import Cookies from "js-cookie";
import BookingFormModal, {type BookingFormData} from "@/app/(admin)/admin/(dashboard)/bookings/BookingFormModal";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function QuickActions() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (data: BookingFormData) => {
    const token = Cookies.get('access_token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const payload = {
      customer_first_name: data.customer_first_name,
      customer_last_name: data.customer_last_name,
      customer_phone: data.customer_phone,
      customer_email: data.customer_email,
      number_of_people: String(data.number_of_people),
      booking_datetime: data.booking_datetime,
      is_online: 1,
      amount: String(data.amount),
      duration: String(data.duration),
      payment_method: 'card',
      payment_status: 0,
      booking_type: 'normal',
      booking_status: 'created',
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json();
        console.error('Failed to save booking:', errJson);
        alert(`Failed to save booking: ${errJson.message}`);
        return;
      }

      const result = await res.json();
      console.log('Booking created:', result.data);
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => setModalOpen(true)}
          className="flex-1 py-3 bg-gray-100 rounded hover:bg-gray-200"
        >
          New Booking
        </button>
        <button className="flex-1 py-3 bg-gray-100 rounded hover:bg-gray-200">
         Unused Button
        </button>
        <button className="flex-1 py-3 bg-gray-100 rounded hover:bg-gray-200">
          Unused Button
        </button>
        <button className="flex-1 py-3 bg-gray-100 rounded hover:bg-gray-200">
          Unused Button
        </button>
      </div>
      <BookingFormModal
        visible={modalOpen}
        initialData={{}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        bookingTypes={[
          { id: 'bt20', name: '20 minutes', duration: 20, price: 120 },
          { id: 'bt40', name: '40 minutes', duration: 40, price: 200 },
          { id: 'bt60', name: '60 minutes', duration: 60, price: 280 },
        ]}
      />
    </div>
  );
}
