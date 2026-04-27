'use client';

import {ReactNode} from 'react';
import {BookingProvider} from '@/app/contexts/BookingContext';
import StepIndicator from '@/app/components/booking/StepIndicator';
import {usePathname} from 'next/navigation';

export default function BookingLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const hideStepIndicator = pathname.endsWith('/confirmation');

    return (
        <BookingProvider>
            <div className="min-h-screen px-4 py-8">
                {!hideStepIndicator && <StepIndicator />}
                <div className="w-full max-w-8xl mx-auto">{children}</div>
            </div>
        </BookingProvider>
    );
}