'use client';

import React from 'react';
import {usePathname} from 'next/navigation';
import Link from "next/link";
import clsx from "clsx";

interface Step {
  href: string;
  number: string;
  label: string;
}

const steps: Step[] = [
  { href: '/booking/experiences', number: '01', label: 'Experiences' },
  { href: '/booking/details', number: '02', label: 'Personal Details' },
  { href: '/booking/confirmation', number: '03', label: 'Confirmation' },
];

export default function StepIndicator() {
  const pathname = usePathname();
  // Determine the current step index
  const currentIndex = steps.findIndex(step => pathname.startsWith(step.href));

  // Helper to decide if a step is active or completed
  const isActive = (href: string) => pathname === href;

  return (
    <div className="hidden sm:flex mt-16 flex-wrap justify-center items-center gap-2 sm:gap-3 sm:scale-110">
      {/* Step Buttons */}
      {steps.map(({ href, number, label }, index) => {
        const active = isActive(href);
        const enabled = index <= currentIndex;
        const commonClasses = clsx(
          'px-3 sm:px-6 h-10 flex items-center justify-center text-sm font-medium transition -skew-x-20 rounded-tl-[5px] rounded-br-[5px]',
          active
            ? 'bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white'
            : enabled
            ? 'text-white border border-white bg-transparent hover:border-pink-500 hover:text-pink-500'
            : 'text-gray-500 border border-gray-500 bg-transparent cursor-not-allowed'
        );

        return enabled ? (
          <Link key={href} href={href} className={commonClasses}>
            <span className="skew-x-12">{number}</span>
            <span className="ml-2 skew-x-12">{label}</span>
          </Link>
        ) : (
          <div key={href} className={commonClasses}>
            <span className="skew-x-12">{number}</span>
            <span className="ml-2 skew-x-12">{label}</span>
          </div>
        );
      })}
    </div>
  );
}