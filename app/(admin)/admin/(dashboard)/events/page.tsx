// app/admin/events/page.tsx
import React from 'react';


export default function EventsPage() {
    const events = [
        { id: 'EVT-01', name: 'Virtual Racing Series', date: '20/8/2025' },
        // …
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Events</h1>
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                    <tr>
                        {['ID','Name','Date','Actions'].map(h => (
                            <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-600">{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {events.map(e => (
                        <tr key={e.id} className="border-t">
                            <td className="px-4 py-2">{e.id}</td>
                            <td className="px-4 py-2">{e.name}</td>
                            <td className="px-4 py-2">{e.date}</td>
                            <td className="px-4 py-2">
                                <button className="text-blue-600 hover:underline">Edit</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}