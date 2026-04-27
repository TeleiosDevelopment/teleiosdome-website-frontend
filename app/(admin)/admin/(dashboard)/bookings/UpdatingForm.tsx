"use client";

import React, {useEffect, useMemo, useState} from "react";

export interface UpdatingFormData {
  id?: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone: string;
  customer_email: string;
  payment_status: number;
  source: string;
  payment_method: string;
  booking_status: string;
  is_online: number;
  amount: number;
  booking_type_id: string;
  event_id: string | null;
  booking_datetime?: string;
  duration: number;
  number_of_people: number;
}

interface Props {
  visible: boolean;
  initialData?: Partial<UpdatingFormData>;
  onClose: () => void;
  onSubmit: (
    data: UpdatingFormData & { booking_datetime: string; booking_type: string; id?: string }
  ) => void;
}

export default function UpdatingFormModal({
  visible,
  initialData = {},
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

  const today = new Date().toISOString().slice(0, 10);

  const defaultData = useMemo<UpdatingFormData>(() => ({
    id: undefined,
    customer_first_name: "",
    customer_last_name: "",
    customer_phone: "",
    customer_email: "",
    payment_status: 0,
    booking_status: "created",
    source: initialData.source ?? "website",
    payment_method: initialData.payment_method ?? "card",
    is_online: 1,
    amount: 0,
    booking_type_id: "normal",
    event_id: null,
    booking_datetime: initialData.booking_datetime ?? `${today}T00:00:00`,
    duration: initialData.duration ?? 20,
    number_of_people: 1,
  }), [initialData.booking_datetime, initialData.duration, initialData.source, initialData.payment_method, today]);

  const [form, setForm] = useState<UpdatingFormData>({ ...defaultData, ...initialData });
  const [errorMessage, setErrorMessage] = useState("");

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
    sourceOptions.includes(form.source) ? form.source : 'Other'
  );
  const [otherSource, setOtherSource] = useState<string>(
    sourceOptions.includes(form.source) ? '' : form.source
  );
  useEffect(() => {
    if (sourceOption !== 'Other') {
      setForm(f => ({ ...f, source: sourceOption }));
    } else {
      setForm(f => ({ ...f, source: otherSource }));
    }
  }, [sourceOption, otherSource]);

  useEffect(() => {
    if (!visible) return;

    const normalized: UpdatingFormData = {
      ...defaultData,
      ...initialData,
      amount: Number(initialData?.amount ?? 0),
      number_of_people: Number(initialData?.number_of_people ?? 1),
      duration: Number(initialData?.duration ?? 20),
      is_online: Number(initialData?.is_online ?? 1),
      payment_status: Number(initialData?.payment_status ?? 0),
      booking_datetime: initialData?.booking_datetime ?? `${today}T00:00:00`,
      source: initialData?.source ?? "website",
      payment_method: initialData?.payment_method ?? "card",
    };

    setForm(normalized);
    setStep(1);
    setErrorMessage("");
  }, [visible, initialData, defaultData, today]);

  useEffect(() => {
    if (step === 3) {
      // recalc amount
      const amount =   form.number_of_people;
      setForm((f) => ({ ...f, amount }));
    }
  }, [step, form.number_of_people]);

  function handleNext() {
    if (step === 1) {
      if (!(form.customer_first_name ?? "").trim()) {
        setErrorMessage("First name is required.");
        return;
      }
      if (!(form.customer_last_name ?? "").trim()) {
        setErrorMessage("Last name is required.");
        return;
      }
      if (!(form.customer_phone ?? "").trim()) {
        setErrorMessage("Phone is required.");
        return;
      }
      if (!(form.customer_email ?? "").trim()) {
        setErrorMessage("Email is required.");
        return;
      }
      if (!(form.booking_datetime ?? "").trim()) {
        setErrorMessage("Booking date & time is required.");
        return;
      }
      setErrorMessage("");
      setStep(2);
    }
  }

  function handlePrev() {
    setErrorMessage("");
    setStep((s) => Math.max(1, s - 1));
  }

  function handleFinalSubmit() {
    if (!form.customer_first_name.trim()) {
      setErrorMessage("First name is required.");
      setStep(1);
      return;
    }
    if (!form.customer_last_name.trim()) {
      setErrorMessage("Last name is required.");
      setStep(1);
      return;
    }
    if (!form.customer_phone.trim()) {
      setErrorMessage("Phone is required.");
      setStep(1);
      return;
    }
    if (!form.customer_email.trim()) {
      setErrorMessage("Email is required.");
      setStep(1);
      return;
    }
    if (!(form.booking_datetime ?? "").trim()) {
      setErrorMessage("Booking date & time is required.");
      setStep(1);
      return;
    }
    setErrorMessage("");
    const booking_datetime = form.booking_datetime!;
    const booking_type = form.booking_type_id;
    onSubmit({ ...form, booking_datetime, booking_type });
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-3/4 p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-2">Update Booking</h2>

        {step === 1 && (
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                value={form.customer_first_name ?? ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer_first_name: e.target.value }))
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                value={form.customer_last_name ?? ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer_last_name: e.target.value }))
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2 col-span-2">
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="tel"
                value={form.customer_phone ?? ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer_phone: e.target.value }))
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2 col-span-2">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={form.customer_email ?? ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer_email: e.target.value }))
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2 col-span-2">
              <p className="w-full px-2 py-1 border rounded bg-gray-100">
                Booking Date &amp; Time: {form.booking_datetime}
              </p>
            </div>
            <div className="mb-2">
              <p className="w-full px-2 py-1 border rounded bg-gray-100">
                Duration: {form.duration} minutes
              </p>
            </div>
            <div className="mb-2">
              <p className="w-full px-2 py-1 border rounded bg-gray-100">
                Seats: {form.number_of_people}
              </p>
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Payment Method</label>
              <select
                value={form.payment_method}
                onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))}
                className="w-full px-2 py-1 border rounded"
                required
              >
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                value={form.amount}
                onChange={e =>
                  setForm(f => ({ ...f, amount: Number(e.target.value) }))
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2 col-span-2">
              <label className="block mb-1 font-medium">Source</label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={sourceOption}
                  onChange={e => setSourceOption(e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                  required
                >
                  {sourceOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {sourceOption === 'Other' ? (
                  <textarea
                    placeholder="Please specify"
                    value={otherSource}
                    onChange={e => setOtherSource(e.target.value)}
                    className="w-full px-2 py-1 border rounded h-10"
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Payment Status</label>
              <select
                value={form.payment_status}
                onChange={e =>
                  setForm(f => ({ ...f, payment_status: Number(e.target.value) }))
                }
                className="w-full px-2 py-1 border rounded"
                required
              >
                <option value={0}>Pending</option>
                <option value={1}>Paid</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Booking Status</label>
              <select
                value={form.booking_status}
                onChange={e => setForm(f => ({ ...f, booking_status: e.target.value }))}
                className="w-full px-2 py-1 border rounded"
                required
              >
                <option value="created">Created</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <p className="mb-2 font-medium">Review & Confirm</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-2">
                <strong>Name:</strong> {form.customer_first_name} {form.customer_last_name}
              </div>
              <div className="mb-2">
                <strong>Phone:</strong> {form.customer_phone}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {form.customer_email}
              </div>
              <div className="mb-2">
                <strong>Booking Date &amp; Time:</strong> {form.booking_datetime}
              </div>

              <div className="mb-2">
                <strong>Duration:</strong> {form.duration} minutes
              </div>
              <div className="mb-2">
                <strong>Number of People:</strong> {form.number_of_people}
              </div>
              <div className="mb-2">
                <strong>Total Amount:</strong> ${form.amount.toFixed(2)}
              </div>
            </div>
            {errorMessage && (
              <p className="mb-2 text-red-600 font-semibold">{errorMessage}</p>
            )}
          </>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 border rounded hover:bg-gray-100"
              type="button"
            >
              Previous
            </button>
          ) : (
            <div />
          )}
          {step < 2 ? (
            <button
              onClick={handleNext}
              className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
              type="button"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700"
              type="button"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
