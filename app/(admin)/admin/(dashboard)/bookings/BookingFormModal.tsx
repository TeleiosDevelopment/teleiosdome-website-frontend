'use client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

import React, {useEffect, useMemo, useState} from 'react';
import Cookies from 'js-cookie';

export interface BookingType {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;    // price per seat for the given duration
}

export interface BookingFormData {
  customer_first_name: string;
  customer_last_name: string;
  customer_phone: string;
  customer_email: string;
  number_of_people: number;
  date: string;          // YYYY-MM-DD
  time: string;          // HH:mm:ss
  duration: number;
  amount: number;
  is_online: number;
  payment_method: string;
  payment_status: number;
  booking_status: string;
  source: string;
  booking_datetime?: string;
  id?: string;
}

interface Props {
  visible: boolean;
  initialData?: Partial<BookingFormData>;
  onClose: () => void;
  onSubmit: (data: BookingFormData & { id?: string }) => void;
  bookingTypes: BookingType[];
}

export default function BookingFormModal({
  visible,
  initialData = {},
  bookingTypes,
  onClose,
  onSubmit,
}: Props) {
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);
  const defaultBooking = useMemo<BookingFormData>(() => ({
    customer_first_name: '',
    customer_last_name: '',
    customer_phone: '',
    customer_email: '',
    number_of_people: 1,
    date: new Date().toISOString().slice(0, 10),
    time: '',
    duration: initialData.duration ?? 20,
    amount: 0,
    is_online: 1,
    payment_method: 'card',
    payment_status: 0,
    booking_status: 'created',
    source: initialData.source ?? 'website',
  }), [initialData.duration, initialData.source]);
  const [form, setForm] = useState<BookingFormData>({
    ...defaultBooking,
    ...initialData,
  });

  const sourceOptions = [
    'Returning customer',
    'Word of mouth',
    'Instagram',
    'Google search',
    'Cinema advertising',
    'Outside event',
    'Inside event',
    'TikTok',
    'Other'
  ];
  const [sourceOption, setSourceOption] = useState<string>(
    sourceOptions.includes(initialData.source ?? '') ? initialData.source! : 'Other'
  );
  const [otherSource, setOtherSource] = useState<string>(
    !sourceOptions.includes(initialData.source ?? '') && initialData.source ? initialData.source : ''
  );
  // Sync form.source whenever selection or custom text changes
  useEffect(() => {
    if (sourceOption !== 'Other') {
      setForm(f => ({ ...f, source: sourceOption }));
    } else {
      setForm(f => ({ ...f, source: otherSource }));
    }
  }, [sourceOption, otherSource]);

  // Reset form and step when initialData, visible, or defaultBooking changes, but only if changed
  useEffect(() => {
    if (visible) {
      const merged = {
        ...defaultBooking,
        ...initialData,
      } as BookingFormData;
      setForm(prev => {
        // Avoid overwriting if data is the same
        if (JSON.stringify(prev) !== JSON.stringify(merged)) {
          return merged;
        }
        return prev;
      });
      setStep(1);
    }
  }, [visible, initialData, defaultBooking]);
  const [availableSlots, setAvailableSlots] = useState<{ time: string; sims: number }[]>([]);
  const basePrice = bookingTypes.find(bt => bt.duration === form.duration)?.price ?? 0;
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Fetch slots whenever date, seats, duration change in step 2
  useEffect(() => {
    if (step === 2 && form.date && form.number_of_people && form.duration) {
      const fetchSlots = async () => {
        const token = Cookies.get('access_token');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const params = new URLSearchParams({
          date: form.date!,
          number_of_people: String(form.number_of_people),
          duration: String(form.duration),
          booking_type: 'normal',
        });
        const res = await fetch(
          `${API_BASE_URL}/api/bookings/availableSlots?${params.toString()}`,
          {
            headers,
          }
        );
        if (res.ok) {
          const slots = await res.json();
          const slotsData = slots as { time: string; sims: number }[];
          setAvailableSlots(slotsData);
        } else {
          setAvailableSlots([]);
        }
      };
      fetchSlots();
    }
  }, [step, form.date, form.number_of_people, form.duration]);

  useEffect(() => {
    // Recalculate amount when entering confirmation step or when seats/duration change
    if (step === 3) {
      setForm(f => ({
        ...f,
        amount: basePrice * (f.number_of_people || 0),
      }));
    }
  }, [step, basePrice, form.number_of_people]);

  if (!visible) return null;

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1) {
      const missing: string[] = [];
      if (!form.customer_first_name) missing.push('First Name');
      if (!form.customer_last_name) missing.push('Last Name');
      if (!form.customer_phone) missing.push('Phone');
      if (!form.customer_email) missing.push('Email');
      if (!form.number_of_people) missing.push('Number of People');
      if (!form.date) missing.push('Date');
      if (!form.duration) missing.push('Duration');
      if (missing.length) {
        setErrorMessage(`Please fill out: ${missing.join(', ')}`);
        return;
      }
    }
    if (step === 2) {
      if (!form.time) {
        setErrorMessage('Please select a time slot.');
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleTimeSelect = (time: string) => {
    setForm(f => ({ ...f, time }));
    handleNext();
  };

  const handleAmountChange = (value: string) => {
    const amt = Number(value);
    setForm(f => ({ ...f, amount: isNaN(amt) ? f.amount : amt }));
  };

  const handleFinalSubmit = () => {
    setErrorMessage('');
    if (step === 3) {
      if (form.payment_method === undefined) {
        setErrorMessage('Please select a payment method.');
        return;
      }
      if (form.payment_status === undefined) {
        setErrorMessage('Please select a payment status.');
        return;
      }
      if (!form.amount || form.amount <= 0) {
        setErrorMessage('Please enter a valid amount.');
        return;
      }
    }
    const submitData: BookingFormData & { booking_datetime: string; booking_type: string; id?: string } = {
      ...form,
      booking_datetime: `${form.date} ${form.time}`,
      booking_type: 'normal',
      id: form.id,
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 float-right">&times;</button>
        {errorMessage && (
          <div className="text-red-500 mb-4" role="alert">
            {errorMessage}
          </div>
        )}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <input
              type="text"
              placeholder="First Name"
              value={form.customer_first_name || ''}
              onChange={e => setForm(f => ({ ...f, customer_first_name: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={form.customer_last_name || ''}
              onChange={e => setForm(f => ({ ...f, customer_last_name: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.customer_phone || ''}
              onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.customer_email || ''}
              onChange={e => setForm(f => ({ ...f, customer_email: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
              required
            />

            <input
              type="number"
              placeholder="Number of People"
              value={form.number_of_people || ''}
              onChange={e => setForm(f => ({ ...f, number_of_people: Number(e.target.value) }))}
              className="w-full p-2 border rounded mb-2"
              min="1"
              required
            />
            <input
              type="date"
              value={form.date!}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <label className="block mb-2">Duration</label>
            <select
              value={form.duration || ''}
              onChange={e => setForm(f => ({ ...f, duration: Number(e.target.value) }))}
              className="w-full p-2 border rounded mb-4"
              required
            >
              <option value="" disabled>Select duration</option>
              {bookingTypes.map(bt => (
                <option key={bt.duration} value={bt.duration}>
                  {bt.name}
                </option>
              ))}
            </select>
            <label className="block mb-2">Source</label>
            <select
              value={sourceOption}
              onChange={e => setSourceOption(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            >
              {sourceOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {sourceOption === 'Other' && (
              <input
                type="text"
                placeholder="Please specify"
                value={otherSource}
                className="w-full p-2 border rounded mb-4"
                onChange={e => setOtherSource(e.target.value)}
              />
            )}
            <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Choose Time Slot</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {availableSlots.length > 0 ? (
                availableSlots.map(({ time, sims }) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    disabled={sims < (form.number_of_people || 0)}
                    className={`p-2 rounded text-center ${
                      form.time === time ? 'bg-purple-600 text-white' : 'bg-gray-200'
                    } ${sims < (form.number_of_people || 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p>No slots available.</p>
              )}
            </div>
            <button onClick={handlePrev} className="mr-2 px-4 py-2 border rounded">Back</button>
            <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
          </>
        )}
        {step === 3 && (
          <>

            <h2 className="text-xl font-semibold mb-4">Confirm & Amount</h2>
            <p className="mb-2">Duration: {form.duration} minutes</p>
            <p className="mb-2">Seats: {form.number_of_people}</p>
            <p className="mb-2">Base price per seat: AED {basePrice}</p>
            <label className="block mb-2">Payment Method</label>
            <select
              value={form.payment_method}
              onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
              required
            >
              <option value="card">Card</option>
              <option value="offline">Offline</option>
            </select>

            <label className="block mb-2">Payment Status</label>
            <select
              value={form.payment_status}
              onChange={e => setForm(f => ({ ...f, payment_status: Number(e.target.value) }))}
              className="w-full p-2 border rounded mb-4"
              required
            >
              <option value={0}>Unpaid</option>
              <option value={1}>Paid</option>
            </select>
            <label className="block mb-2">Total Amount (AED):</label>
            <input
              type="number"
              value={form.amount || (basePrice * (form.number_of_people || 0))}
              onChange={e => handleAmountChange(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button onClick={handlePrev} className="mr-2 px-4 py-2 border rounded">Back</button>
            <button onClick={handleFinalSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
          </>
        )}
      </div>
    </div>
  );
}
