'use client';

import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {TrashIcon} from "@heroicons/react/24/solid";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

type OverrideType = 'open' | 'closed';

interface OneTimeOverride {
  id: number;
  date: string;
  type: OverrideType;
  startTime?: string;
  endTime?: string;
  reason: string;
  persisted: boolean;
}

export default function Override() {
  const [overrides, setOverrides] = useState<OneTimeOverride[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState<OverrideType>('closed');
  const [newStartTime, setNewStartTime] = useState('12:00');
  const [newEndTime, setNewEndTime] = useState('20:00');
  const [newReason, setNewReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = Cookies.get('access_token');
    const fetchOverrides = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/settings/getDateRules`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const fetchedOverrides: OneTimeOverride[] = (json.data as {
            id: number;
            date: string;
            is_open: number;
            start_time?: string;
            end_time?: string;
            description?: string;
          }[]).map((item) => ({
            id: item.id,
            date: item.date,
            type: item.is_open ? 'open' : 'closed',
            startTime: item.is_open ? item.start_time : undefined,
            endTime: item.is_open ? item.end_time : undefined,
            reason: item.description || '',
            persisted: true,
          }));
          setOverrides(fetchedOverrides);
        }
      } catch (error) {
        console.error('Failed to fetch override rules:', error);
      }
    };

    fetchOverrides();
  }, []);

  const formatHours = (override: OneTimeOverride) => {
    if (override.type === 'closed') return 'All Day';
    if (
      override.startTime &&
      override.endTime &&
      !isNaN(Date.parse(`1970-01-01T${override.startTime}`)) &&
      !isNaN(Date.parse(`1970-01-01T${override.endTime}`))
    ) {
      const start = format(new Date(`1970-01-01T${override.startTime}`), 'h:mm a');
      const end = format(new Date(`1970-01-01T${override.endTime}`), 'h:mm a');
      return `${start} - ${end}`;
    }
    return '';
  };

  const addOverride = async () => {
    // basic validation
    if (!newDate.trim() || !newReason.trim()) {
      setErrorMessage('Date and description are required.');
      return;
    }
    // prevent duplicates
    if (overrides.some(o => o.date === newDate)) {
      setErrorMessage('A rule for this date already exists.');
      return;
    }
    setErrorMessage('');
    const token = Cookies.get('access_token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/setDateRules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: newDate,
          is_open: newType === 'open' ? 1 : 0,
          start_time: newType === 'open' ? `${newStartTime}:00` : '',
          end_time: newType === 'open' ? `${newEndTime}:00` : '',
          description: newReason,
        }),
      });
      const json = await res.json();
      if (json.success) {
        const item = json.data;
        const newRule: OneTimeOverride = {
          id: item.id,
          date: item.date,
          type: item.is_open ? 'open' : 'closed',
          startTime: item.is_open ? item.start_time : undefined,
          endTime: item.is_open ? item.end_time : undefined,
          reason: item.description,
          persisted: true,
        };
        setOverrides(prev => [...prev, newRule]);
        // reset inputs
        setNewDate('');
        setNewType('closed');
        setNewStartTime('12:00');
        setNewEndTime('20:00');
        setNewReason('');
        setErrorMessage('');
      } else {
        console.error('Failed to add date rule:', json.message);
      }
    } catch (error) {
      console.error('Error adding date rule:', error);
    }
  };

  const deleteOverride = async (id: number, persisted: boolean) => {
    if (!persisted) {
      setOverrides(prev => prev.filter(o => o.id !== id));
      return;
    }
    const token = Cookies.get('access_token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/deleteDateRule/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setOverrides(prev => prev.filter(o => o.id !== id));
      } else {
        console.error('Failed to delete override:', json.message);
      }
    } catch (error) {
      console.error('Error deleting override:', error);
    }
  };

  return (

  <div className="bg-white rounded-lg shadow p-6">
      <hr className="mb-6" />
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-4">Date</th>
            <th className="text-left py-2 px-4">Type</th>
            <th className="text-left py-2 px-4">Hours</th>
            <th className="text-left py-2 px-4">Reason</th>
            <th className="text-left py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {overrides.map(o => (
            <tr key={o.id} className="border-b">
              <td className="py-2 px-4">{o.date}</td>
              <td className="py-2 px-4">
                <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${
                  o.type === 'closed' ? 'bg-red-500 text-white' : 'bg-orange-400 text-white'
                }`}>
                  {o.type === 'closed' ? 'Closed' : 'Override'}
                </span>
              </td>
              <td className="py-2 px-4">{formatHours(o)}</td>
              <td className="py-2 px-4">{o.reason}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => deleteOverride(o.id, o.persisted)}
                  className="inline-flex items-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl font-semibold mb-4">Add New Opening & Closure Override</h3>
      {errorMessage && (
        <p className="w-full text-red-500 mb-2">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          className="border rounded px-4 py-2"
          placeholder="dd/mm/yyyy"
        />
        <div className="flex rounded border overflow-hidden">
          <button
            type="button"
            onClick={() => setNewType('closed')}
            className={`px-4 py-2 focus:outline-none ${
              newType === 'closed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Closed
          </button>
          <button
            type="button"
            onClick={() => setNewType('open')}
            className={`px-4 py-2 focus:outline-none ${
              newType === 'open' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Open
          </button>
        </div>
        {newType === 'open' && (
          <>
            <input
              type="time"
              value={newStartTime}
              onChange={e => setNewStartTime(e.target.value)}
              className="border rounded px-3 py-2 w-24"
            />
            <span className="mx-1 text-gray-600 select-none">to</span>
            <input
              type="time"
              value={newEndTime}
              onChange={e => setNewEndTime(e.target.value)}
              className="border rounded px-3 py-2 w-24"
            />
          </>
        )}
        <input
          type="text"
          value={newReason}
          onChange={e => setNewReason(e.target.value)}
          className="border rounded px-4 py-2 flex-1"
          placeholder="e.g., Private Event"
        />
        <button
          onClick={addOverride}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded"
        >
          Add Rule
        </button>
      </div>
    </div>
  );
}