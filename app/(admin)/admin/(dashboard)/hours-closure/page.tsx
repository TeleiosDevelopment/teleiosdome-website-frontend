'use client';

import React, {useEffect, useState} from 'react';
import Override from "@/app/(admin)/admin/components/Override";
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function HoursClosurePage() {
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [weeklyPlan, setWeeklyPlan] = useState<{
      id: string;
      day: string;
      start_time: string;
      end_time: string;
      is_open: number;
    }[]>([]);

    useEffect(() => {
      async function loadWeekly() {
        const token = Cookies.get('access_token');
        if (!token) return;
        const res = await fetch(`${API_BASE_URL}/api/settings/getWeeklyPlan`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (json.success) {
          setWeeklyPlan(json.data);
        }
      }
      loadWeekly();
    }, []);
    return (
        <div className="space-y-6">
            {notification && (
              <div
                className={`p-2 mb-4 rounded ${
                  notification.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {notification.message}
              </div>
            )}
            <h1 className="text-3xl font-semibold">Business Hours & Closure</h1>
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
                <div>
                    <label className="block font-medium">Standard Hours:</label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {weeklyPlan.map(({ id, day, start_time, end_time, is_open }) => (
                          <div key={id} className={`grid grid-cols-1 gap-2 items-center xl:grid-cols-[4rem_auto_1fr_auto_1fr] ${
                            is_open ? '' : 'opacity-50'
                          }`}>
                            <span className="w-16">{day.slice(0,3)}</span>
                            <label className="flex items-center space-x-1">
                              <input
                                type="checkbox"
                                checked={is_open === 1}
                                onChange={() =>
                                  setWeeklyPlan(plan =>
                                    plan.map(item =>
                                      item.id === id ? { ...item, is_open: item.is_open ? 0 : 1 } : item
                                    )
                                  )
                                }
                                className="h-5 w-5"
                              />
                              <span className="text-sm">{is_open ? 'Open' : 'Closed'}</span>
                            </label>
                            <input
                              type="time"
                              disabled={is_open === 0}
                              className="border rounded px-2 py-1"
                              value={start_time}
                              onChange={(e) =>
                                setWeeklyPlan(plan =>
                                  plan.map(item =>
                                    item.id === id ? { ...item, start_time: e.target.value } : item
                                  )
                                )
                              }
                            />
                            <span>to</span>
                            <input
                              type="time"
                              disabled={is_open === 0}
                              className="border rounded px-2 py-1"
                              value={end_time}
                              onChange={(e) =>
                                setWeeklyPlan(plan =>
                                  plan.map(item =>
                                    item.id === id ? { ...item, end_time: e.target.value } : item
                                  )
                                )
                              }
                            />
                          </div>
                        ))}
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={async () => {
                          try {
                            await Promise.all(
                              weeklyPlan.map(async ({ day, start_time, end_time, is_open }) => {
                                const token = Cookies.get('access_token');
                                if (!token) return;
                                const res = await fetch(
                                  `${API_BASE_URL}/api/settings/setWeeklyDayPlan`,
                                  {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({
                                      day: day.toLowerCase(),
                                      is_open,
                                      start_time,
                                      end_time,
                                    }),
                                  }
                                );
                                const json = await res.json();
                                if (json.success && json.data) {
                                  setWeeklyPlan(plan =>
                                    plan.map(item =>
                                      item.day.toLowerCase() === day.toLowerCase()
                                        ? {
                                            id: json.data.id,
                                            day: json.data.day,
                                            start_time: json.data.start_time,
                                            end_time: json.data.end_time,
                                            is_open: json.data.is_open,
                                          }
                                        : item
                                    )
                                  );
                                }
                              })
                            );
                            setNotification({ type: 'success', message: 'Hours saved successfully' });
                          } catch {
                            setNotification({ type: 'error', message: 'Failed to save hours' });
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save Hours
                      </button>
                    </div>
                </div>

            </div>
            <h1 className="text-3xl font-semibold">One-Time Overrides &amp; Closures</h1>

            <Override/>

        </div>
    );
}