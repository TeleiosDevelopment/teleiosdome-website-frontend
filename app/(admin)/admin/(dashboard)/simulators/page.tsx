'use client';

import React, {useCallback, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import SimulatorCard, {Simulator} from '@/app/(admin)/admin/components/SimulatorCards';
import LockSimulator from '@/app/(admin)/admin/components/LockSimulator';
import {FunnelIcon} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function SimulatorsPage() {
  const [simulators, setSimulators] = useState<Simulator[]>([]);

  const [filter, setFilter] = useState<'all' | 'available' | 'booked' | 'locked'>('all');
  const [timeMode, setTimeMode] = useState<'now' | 'specific'>('now');
  const [specificDateTime, setSpecificDateTime] = useState<string>('');

  const token = Cookies.get('access_token');

  const loadSimulators = useCallback(async (dateTime?: string) => {
    if (!token) return;
    try {
      let url = `${API_BASE_URL}/api/simulators`;
      if (timeMode === 'specific' && dateTime) {
        url += `?datetime=${encodeURIComponent(dateTime)}`;
      }
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const payload = await res.json();
      setSimulators(payload.data ?? []);
    } catch (e) {
      console.error('Failed to load simulators:', e);
    }
  }, [token, timeMode]);

  useEffect(() => {
    if (timeMode === 'now') {
      loadSimulators();
    }
  }, [token, timeMode, loadSimulators]);

  const visible = simulators.filter(s => {
    let status: 'locked' | 'booked' | 'available';
    if (s.locked) {
      status = 'locked';
    } else if (s.booked) {
      status = 'booked';
    } else {
      status = 'available';
    }
    return filter === 'all' || status === filter;
  });

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="text-3xl font-bold">Simulators</h1>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 bg-white border rounded px-3 py-1">
            <FunnelIcon className="h-5 w-5 text-gray-600" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as 'all' | 'available' | 'booked' | 'locked')}
              className="outline-none"
            >
              <option value="all">All Simulators</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="locked">Locked</option>
            </select>
          </div>
          <div className="flex border rounded overflow-hidden">
            <button
              onClick={() => setTimeMode('now')}
              className={`px-4 py-2 ${
                timeMode === 'now' ? 'bg-blue-600 text-white' : 'bg-white text-black'
              }`}
            >
              Now
            </button>
            <button
              onClick={() => setTimeMode('specific')}
              className={`px-4 py-2 ${
                timeMode === 'specific' ? 'bg-blue-600 text-white' : 'bg-white text-black'
              }`}
            >
              Specific Time
            </button>
          </div>
          {timeMode === 'specific' && (
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="datetime-local"
                value={specificDateTime}
                onChange={e => setSpecificDateTime(e.target.value)}
                className="border rounded px-3 py-2"
              />
              <button
                onClick={() => loadSimulators(specificDateTime)}
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Filter
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visible.map(s => (
          <SimulatorCard key={s.id} simulator={s} />
        ))}
      </div>
      <div className="mt-8">
        <LockSimulator />
      </div>
    </div>
  );
}