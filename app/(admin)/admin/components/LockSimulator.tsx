'use client';

import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {TrashIcon} from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface Simulator {
  id: string;
  number: number;
}

interface LockRule {
    id: string;               // rule id returned by API
    simulatorId: string;
    simulatorNumber: number;
    lockingDate: string;      // 'YYYY-MM-DD'
}

export default function LockSimulator() {
    const [rules, setRules] = useState<LockRule[]>([]);
    const [simulators, setSimulators] = useState<Simulator[]>([]);
    const [selectedSim, setSelectedSim] = useState('');
    const [lockDate, setLockDate] = useState('');
    const [error, setError] = useState('');

    // 1. fetch existing lock rules
    useEffect(() => {
        const token = Cookies.get('access_token');
        (async () => {
            try {
                // Fetch simulators for dropdown
                const simRes = await fetch(`${API_BASE_URL}/api/simulators`, {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });
                const simJson = await simRes.json();
                if (simJson.success && Array.isArray(simJson.data)) {
                  setSimulators(
                    (simJson.data as { id: string; number: number }[]).map((s) => ({
                      id: s.id,
                      number: s.number,
                    }))
                  );
                }

                const res = await fetch(`${API_BASE_URL}/api/settings/getLockedSimulators`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const json = await res.json();
                if (json.success && Array.isArray(json.data)) {
                    setRules(
                      (json.data as {
                        id: string;
                        simulator_id: string;
                        locking_date: string;
                        simulator: { number: number };
                      }[]).map((r) => ({
                        id: r.id,
                        simulatorId: r.simulator_id,
                        simulatorNumber: r.simulator.number,
                        lockingDate: r.locking_date.slice(0, 10),
                      }))
                    );
                }
            } catch (e) {
                console.error('Failed to fetch lock rules', e);
            }
        })();
    }, []);

    // 2. add new lock/unlock rule
    const addRule = async () => {
        if (!selectedSim || !lockDate) {
            setError('Simulator and date are required.');
            return;
        }
        setError('');
        const token = Cookies.get('access_token');
        try {
            const res = await fetch(`${API_BASE_URL}/api/settings/lockSimulator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    simulator_id: selectedSim,
                    locking_date: lockDate
                })
            });
            const json = await res.json();
            if (json.success) {
                // append the newly created rule
                setRules(rules.concat({
                    id: json.data.id,
                    simulatorId: json.data.simulator_id,
                    simulatorNumber: json.data.simulator_number,
                    lockingDate: json.data.locking_date.slice(0,10)
                }));
                setSelectedSim('');
                setLockDate('');
            } else {
                setError(json.message || 'Failed to lock simulator');
            }
        } catch (e) {
            console.error('Error locking simulator', e);
        }
    };

    // 3. delete a rule
    const deleteRule = async (id: string) => {
        const token = Cookies.get('access_token');
        const rule = rules.find(r => r.id === id);
        if (!rule) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/settings/unlockSimulator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ simulator_id: rule.simulatorId, locking_date: rule.lockingDate })
            });
            const json = await res.json();
            if (json.success) {
                setRules(rules.filter(r => r.id !== id));
            } else {
                console.error('Failed to unlock simulator', json.message);
            }
        } catch (e) {
            console.error('Error unlocking simulator', e);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Simulator Lock/Unlock Rules</h3>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <table className="w-full mb-6">
                <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Simulator</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Action</th>
                </tr>
                </thead>
                <tbody>
                {rules.map(rule => (
                    <tr key={rule.id} className="border-b">
                        <td className="py-2 px-4">SIM - {String(rule.simulatorNumber).padStart(2, '0')}</td>
                        <td className="py-2 px-4">{format(new Date(rule.lockingDate), 'yyyy-MM-dd')}</td>
                        <td className="py-2 px-4">
                            <button
                                onClick={() => deleteRule(rule.id)}
                                className="inline-flex items-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex flex-wrap gap-4 items-center">
                {/* Simulator selector: you'll need to populate this list from your simulators endpoint */}
                <select
                    value={selectedSim}
                    onChange={e => setSelectedSim(e.target.value)}
                    className="border rounded px-4 py-2"
                >
                    <option value="">Select Simulator</option>
                    {simulators.map(s => (
                      <option key={s.id} value={s.id}>
                        SIM - {String(s.number).padStart(2, '0')}
                      </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={lockDate}
                    onChange={e => setLockDate(e.target.value)}
                    className="border rounded px-4 py-2"
                />

                <button
                    onClick={addRule}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                >
                    Lock/Unlock
                </button>
            </div>
        </div>
    );
}