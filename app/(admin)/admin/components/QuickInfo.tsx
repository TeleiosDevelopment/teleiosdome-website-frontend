"use client";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faDollarSign, faGamepad} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function QuickInfo() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    revenue: 0,
    simulatorsAvailable: '0/0',
  });



  useEffect(() => {
    const token = Cookies.get('access_token');
    const fetchData = async () => {
      try {
        const todayStr = new Date().toISOString().split('T')[0];

        const totalRes = await fetch(`${API_BASE_URL}/api/bookings/numberOfBookings`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const totalJson = await totalRes.json();
        const total = totalJson.data || 0;

        const todayRes = await fetch(`${API_BASE_URL}/api/bookings/numberOfBookings?date=${todayStr}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const todayJson = await todayRes.json();
        const today = todayJson.data || 0;

        // Fetch total revenue
        const revenueRes = await fetch(`${API_BASE_URL}/api/bookings/getTotalRevenue`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const revenueJson = await revenueRes.json();
        const revenue = revenueJson.data || 0;

        // Fetch simulators data
        const simRes = await fetch(`${API_BASE_URL}/api/simulators`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const simJson = await simRes.json();
        const simData = Array.isArray(simJson.data) ? simJson.data : [];
        const totalSims = simData.length;
        const availableSims = simData.filter((s: {
          booked: boolean;
          locked: boolean
        }) => !s.booked && !s.locked).length;
        const simulatorsAvailable = `${availableSims}/${totalSims}`;

        setStats({total, today, revenue, simulatorsAvailable});
      } catch (err) {
        console.error('Failed to load booking stats', err);
      }
    };
    fetchData();
  }, []);

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-sm font-medium text-gray-700">Total Bookings</div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-4xl font-bold">{stats.total}</div>
            <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl text-gray-400"/>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-sm font-medium text-gray-700">Simulators Available</div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-4xl font-bold">{stats.simulatorsAvailable}</div>
            <FontAwesomeIcon icon={faGamepad} className="text-3xl text-gray-400"/>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-sm font-medium text-gray-700">Bookings Today</div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-4xl font-bold">{stats.today}</div>
            <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl text-gray-400"/>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-sm font-medium text-gray-700">Projected Bookings Revenue</div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-4xl font-bold">{stats.revenue} AED</div>
            <FontAwesomeIcon icon={faDollarSign} className="text-3xl text-gray-400"/>
          </div>
        </div>
      </div>
  );
}