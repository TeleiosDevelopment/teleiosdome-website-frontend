"use client";
import React, {useEffect, useMemo, useState} from 'react';
import Cookies from 'js-cookie';
import DataTable, {Column} from '@/app/(admin)/admin/components/DataTable';
import BookingFormModal, {type BookingFormData} from '@/app/(admin)/admin/(dashboard)/bookings/BookingFormModal';
import UpdatingFormModal, {type UpdatingFormData} from '@/app/(admin)/admin/(dashboard)/bookings/UpdatingForm';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface Booking {
    id?: string;
    date: string;
    time: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    seats: number;
    paymentMethod: string;
    paymentStatus: number;
    bookingStatus: string;
    isOnline: number;
    duration: number;
    price: number;
    bookingTypeId?: string; // Optional ID for booking type
    bookingType?: {
        name: string;
        duration: number;
        price: number;
    };
    simulators?: { id: string; number: number; available: number }[];
}

// Table column definitions for the bookings table
const bookingColumns: Column<Booking>[] = [
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Date', accessor: 'date' },
    { header: 'Time', accessor: 'time' },
    { header: 'Seats', accessor: 'seats' },
    { header: 'Payment', accessor: (row) => row.paymentMethod },
    { header: 'Status', accessor: (row) => row.bookingStatus },
    { header: 'Online', accessor: (row) => (row.isOnline ? 'Yes' : 'No') },
    { header: 'Duration', accessor: (row) => `${row.duration} mins` },
    { header: 'Price', accessor: (row) => `AED${row.price ?? 'N/A'}` },
];

export default function BookingsPage() {
    // State for the list of bookings
    const [bookings, setBookings] = useState<Booking[]>([]);
    // State to track loading status
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState<number | null>(null);
    // Inline form state
    const [formData, setFormData] = useState<Partial<BookingFormData>>({});
    const [showForm, setShowForm] = useState(false);
    // State for booking type options used in the form select input
    const [dateFilter, setDateFilter] = useState<'today' | 'tomorrow' | 'week' | null>(null);
    const [excludePast, setExcludePast] = useState<boolean>(false);

    // State for updating existing bookings
    const [updateData, setUpdateData] = useState<Partial<UpdatingFormData>>({});
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    // Fetch bookings from the server and update state
    const fetchBookings = async (pageParam: number = 1) => {
        try {
            setLoading(true);

            const token = Cookies.get('access_token');
            const headers: HeadersInit = {
                Accept: 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(`${API_BASE_URL}/api/bookings?page=${pageParam}`, {
                method: 'GET',
                headers,
            });

            if (!res.ok) {
                console.error('Failed to fetch bookings');
                return;
            }

            const json = await res.json();
            const { data: itemsRaw, current_page, last_page } = json;
            const newBookings: Booking[] = (itemsRaw as {
              id: string;
              booking_datetime: string;
              customer_first_name: string;
              customer_last_name: string;
              customer_email: string;
              customer_phone: string;
              number_of_people: number;
              payment_method: string;
              payment_status: number;
              booking_status: string;
              is_online: number;
              duration: string;
              amount: string;
              simulators?: { id: string; number: number; available: number }[];
            }[]).map((item) => {
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
                    seats: item.number_of_people,
                    paymentMethod: item.payment_method,
                    paymentStatus: item.payment_status,
                    bookingStatus: item.booking_status,
                    isOnline: item.is_online,
                    duration: parseInt(item.duration, 10),
                    price: isNaN(amountNum) ? 0 : amountNum,
                    bookingTypeId: "normal",
                    simulators: item.simulators,
                };
            });
            if (pageParam === 1) {
                setBookings(newBookings);
            } else {
                setBookings(prev => [...prev, ...newBookings]);
            }
            setPage(current_page);
            setLastPage(last_page);
        } catch (error) {
            console.error(error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch bookings on component mount
    useEffect(() => {
        fetchBookings(1);
    }, []);

    // Open form for adding a new booking
    function handleAdd() {
      setFormData({});
      setShowForm(true);
    }

    // Open form for editing an existing booking
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


    // Delete a booking after confirmation
    async function handleDelete(row: Booking) {
        if (confirm('Are you sure you want to delete this booking?')) {
            const token = Cookies.get('access_token');
            const headers: HeadersInit = { Accept: 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;
            await fetch(`${API_BASE_URL}/api/bookings/${row.id}`, {
                method: 'DELETE',
                headers,
            });
            setBookings(prev => prev.filter(b => b.id !== row.id));
        }
    }

    function handleShowMore() {
        if (page < (lastPage ?? 0)) {
            fetchBookings(page + 1);
        }
    }

    // Submit form data to create or update a booking
    async function handleSubmit(data: BookingFormData & { id?: string }) {
      const isEdit = Boolean(data.id);
      const method = isEdit ? 'PUT' : 'POST';
      const endpoint = isEdit
        ? `${API_BASE_URL}/api/bookings/${data.id}`
        : `${API_BASE_URL}/api/bookings`;
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
        is_online: data.is_online,
        amount: String(data.amount),
        duration: String(data.duration),
        payment_method: data.payment_method,
        payment_status: data.payment_status,
        booking_type: 'normal',
        booking_status: data.booking_status ?? 'created',
      };

      const res = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert(`Failed to ${method === 'POST' ? 'create' : 'update'} booking`);
        return;
      }
      const json = await res.json();
      const item = json.data.booking || json.data;
      const [date, time] = (item.booking_datetime ?? '').split(' ');
      const updated: Booking = {
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
        price: parseFloat(item.amount),
        bookingTypeId: item.booking_type_id,

          simulators: item.simulators,
      };

      setBookings(prev =>
        method === 'POST'
          ? [...prev, updated]
          : prev.map(b => (b.id === updated.id ? updated : b))
      );
      setShowForm(false);
      setShowUpdateForm(false);
      // Refresh list if needed
    }

    const filteredBookings = useMemo(() => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const list = excludePast
          ? bookings.filter(b => new Date(b.date) >= now)
          : bookings;

        if (!dateFilter) {
            return list;
        }

        return list.filter(b => {
            const bookingDate = new Date(b.date);
            bookingDate.setHours(0, 0, 0, 0);

            if (bookingDate < now) return false;

            switch (dateFilter) {
                case 'today':
                    return bookingDate.toDateString() === now.toDateString();
                case 'tomorrow':
                    const tomorrow = new Date(now);
                    tomorrow.setDate(now.getDate() + 1);
                    return bookingDate.toDateString() === tomorrow.toDateString();
                case 'week':
                    const weekStart = new Date(now);
                    const weekEnd = new Date(now);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    return bookingDate >= weekStart && bookingDate <= weekEnd;
                default:
                    return true;
            }
        });
    }, [bookings, dateFilter, excludePast]);

    if (loading) return <div>Loading bookings...</div>;

    // JSX to render the bookings table and dynamic form modal
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Bookings</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setDateFilter(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                All
              </button>
              <button
                onClick={() => setDateFilter('today')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Today
              </button>
              <button
                onClick={() => setDateFilter('tomorrow')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Tomorrow
              </button>
              <button
                onClick={() => setDateFilter('week')}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                This Week
              </button>
              <button
                onClick={() => setExcludePast(prev => !prev)}
                className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded"
              >
                {excludePast ? 'Show Past' : 'Hide Past'}
              </button>
            </div>
            {filteredBookings.length === 0 ? (
              <div className="text-gray-500">No bookings found.</div>
            ) : (
              <DataTable
                columns={bookingColumns}
                data={filteredBookings}
                showAdd
                showEdit
                showDelete
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRefresh={fetchBookings}
              />
            )}
            {lastPage && page < lastPage && (
                <div className="flex justify-center mt-4">
                    <button onClick={handleShowMore} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Show more
                    </button>
                </div>
            )}
            <BookingFormModal
              visible={showForm}
              initialData={formData}
              onClose={() => setShowForm(false)}
              onSubmit={handleSubmit}
              bookingTypes={[
                { id: 'bt20', name: '20 minutes', duration: 20, price: 120 },
                { id: 'bt40', name: '40 minutes', duration: 40, price: 200 },
                { id: 'bt60', name: '60 minutes', duration: 60, price: 280 },
              ]}
            />
  <UpdatingFormModal
      visible={showUpdateForm}
      initialData={updateData}
      onClose={() => setShowUpdateForm(false)}
      onSubmit={(data) => {
        handleSubmit({
          ...data,
          date: '',
          time: '',
          payment_method: data.payment_method ?? '',
        });
      }}
    />
        </div>
    );
}