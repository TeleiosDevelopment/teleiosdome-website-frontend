"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import UpdatingFormModal, {type UpdatingFormData} from '@/app/(admin)/admin/(dashboard)/bookings/UpdatingForm';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface Booking {
    id: string;
    date: string;
    time: string;
    duration: number;
    seats: number;
    phone: string;
    firstName: string;
    lastName: string;
    simulators?: { id: string; number: number; available: number }[];
}

export default function UpcomingBookings() {
    const [upcoming, setUpcoming] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [updateData, setUpdateData] = useState<Partial<UpdatingFormData>>({});
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    async function handleEdit(row: Booking) {
      try {
        const token = Cookies.get('access_token');
        const headers: HeadersInit = { Accept: 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(`${API_BASE_URL}/api/bookings/${row.id}`, { method: 'GET', headers });
        if (!res.ok) {
          alert('Could not load booking details for editing.');
          return;
        }
        const json = await res.json();
        const item = json.data.booking || json.data;
        setUpdateData({
          id: item.id,
          customer_first_name: item.customer_first_name,
          customer_last_name: item.customer_last_name,
          customer_phone: item.customer_phone,
          customer_email: item.customer_email,
          number_of_people: Number(item.number_of_people),
          booking_datetime: item.booking_datetime,
          is_online: item.is_online,
          amount: Number(item.amount),
          duration: Number(item.duration),
          payment_method: item.payment_method,
          payment_status: Number(item.payment_status),
          booking_status: item.booking_status,
        });
        setShowUpdateForm(true);
      } catch (err) {
        console.error(err);
        alert('Could not load booking details for editing.');
      }
    }

    async function handleUpdate(data: UpdatingFormData) {
      try {
        const token = Cookies.get('access_token');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        await fetch(`${API_BASE_URL}/api/bookings/${data.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            customer_first_name: data.customer_first_name,
            customer_last_name: data.customer_last_name,
            customer_phone: data.customer_phone,
            customer_email: data.customer_email,
            number_of_people: String(data.number_of_people),
            booking_datetime: data.booking_datetime,
            is_online: data.is_online,
            amount: String(data.amount),
            duration: String(data.duration),
            payment_method: data.payment_method,
            payment_status: data.payment_status,
            booking_type: 'normal',
            booking_status: data.booking_status,
          }),
        });
        setShowUpdateForm(false);
        // Refresh list
        fetchUpcoming();
      } catch (err) {
        console.error(err);
        alert('Failed to update booking');
      }
    }

    async function fetchUpcoming() {
        try {
            const token = Cookies.get('access_token');
            const headers: HeadersInit = { Accept: 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;
            const res = await fetch(`${API_BASE_URL}/api/bookings`, { headers });
            if (!res.ok) throw new Error('Failed to fetch bookings');
            const json = await res.json();
            const now = new Date();
            const data = (json.data as {
                id: string;
                booking_datetime: string;
                customer_first_name: string;
                customer_last_name: string;
                duration: string;
                number_of_people: string;
                customer_phone: string;
                simulators?: { id: string; number: number; available: number }[];
            }[]).map(item => {
                const [date, time] = item.booking_datetime.split(' ');
                return {
                    id: item.id,
                    date,
                    time,
                    firstName: item.customer_first_name,
                    lastName: item.customer_last_name,
                    duration: parseInt(item.duration, 10),
                    seats: parseInt(item.number_of_people, 10),
                    phone: item.customer_phone,
                    simulators: item.simulators,
                };
            });
            const filtered = data
                .filter(b => {
                    const dateTime = new Date(`${b.date}T${b.time}`);
                    return dateTime >= now;
                })
                .sort((a, b) => {
                    const da = new Date(`${a.date}T${a.time}`);
                    const db = new Date(`${b.date}T${b.time}`);
                    return da.getTime() - db.getTime();
                })
                .slice(0, 5);
            setUpcoming(filtered);
        } catch (err) {
            console.error(err);
            setUpcoming([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUpcoming();
    }, []);

    if (loading) return <div>Loading upcoming bookings...</div>;
    if (upcoming.length === 0) return <div>No upcoming bookings.</div>;

    return (
        <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-medium mb-4">
                Upcoming Bookings{" "}
                <Link href="/admin/bookings" className="text-sm text-blue-600 hover:underline">
                    View All Bookings
                </Link>
            </h2>
            <div className="space-y-4">
                {upcoming.map((b) => (
                    <div key={b.id} className="flex items-center justify-between bg-gray-50 p-4 rounded">
                        <div>
                            <div className="font-bold text-lg">{b.firstName} {b.lastName}</div>
                            <div className="text-sm">{b.time}</div>
                            <div className="text-sm">Duration: {b.duration} mins</div>
                            <div className="text-sm">Seats: {b.seats}</div>
                            <div className="text-sm">Phone: {b.phone}</div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            <div className="text-xs text-gray-700">
                                {new Date(b.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                            </div>
                            <button onClick={() => handleEdit(b)} className="text-blue-600 hover:underline">
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <UpdatingFormModal
              visible={showUpdateForm}
              initialData={updateData}
              onClose={() => setShowUpdateForm(false)}
              onSubmit={handleUpdate}
            />
        </div>
    );
}