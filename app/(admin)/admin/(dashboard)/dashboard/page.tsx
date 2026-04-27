// app/admin/dashboard/page.tsx
import React from 'react';
import QuickInfo from '@/app/(admin)/admin/components/QuickInfo';
import QuickActions from "@/app/(admin)/admin/components/QuickActions";
import UpcomingBookings from "@/app/(admin)/admin/components/UpcomingBooking";
import Chart from "@/app/(admin)/admin/components/Chart";


export default function DashboardPage() {



    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Dashboard</h1>

            <QuickInfo />

            <QuickActions />

            <UpcomingBookings />

             <Chart />

        </div>
    );
}