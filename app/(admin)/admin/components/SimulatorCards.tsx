'use client';

import React from 'react';
import {CheckCircleIcon, ClockIcon, Cog6ToothIcon, LockClosedIcon,} from '@heroicons/react/24/solid';

export type Simulator = {
    id: string;
    number: number;           // raw simulator number from API
    booked: boolean;
    locked: boolean;
};

interface Props {
    simulator: Simulator;
}

export default function SimulatorCard({ simulator }: Props) {
    const displayName = `SIM - ${String(simulator.number).padStart(2, '0')}`;
    const isLocked = simulator.locked;
    const isBooked = simulator.booked;
    const isAvailable = !isBooked && !isLocked;
    const borderClass = isLocked
      ? 'border-gray-300'
      : isBooked
        ? 'border-blue-300'
        : isAvailable
          ? 'border-green-300'
          : 'border-gray-300';
    const textClass = isLocked
      ? 'text-gray-500'
      : isBooked
        ? 'text-blue-600'
        : isAvailable
          ? 'text-green-600'
          : 'text-gray-500';
    const Icon = isLocked
      ? LockClosedIcon
      : isBooked
        ? ClockIcon
        : isAvailable
          ? CheckCircleIcon
          : Cog6ToothIcon;
    const statusLabel = isLocked
      ? 'Locked'
      : isBooked
        ? 'Booked'
        : isAvailable
          ? 'Available'
          : 'Unavailable';

    return (
        <div
            className={`border-2 ${borderClass} rounded-2xl p-6 flex flex-col justify-between min-h-[180px] bg-white`}
        >
            <h2 className="text-2xl font-bold mb-2">{displayName}</h2>
            <div className="text-sm space-y-1">
                <div>
                    <span className="font-medium">ID:</span>{' '}
                    <span className="tracking-widest">{simulator.id}</span>
                </div>
                <div>
                    <span className="font-medium">Availability:</span>{' '}
                    <span className={textClass}>{statusLabel}</span>
                </div>
            </div>
            <div className="self-end mt-4">
                <Icon className={`h-6 w-6 ${textClass}`} />
            </div>
        </div>
    );
}