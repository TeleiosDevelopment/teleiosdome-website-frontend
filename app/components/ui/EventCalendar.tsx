// components/EventCalendar.tsx
"use client";

import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import Button from "@/app/components/ui/Button";
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    parseISO,
    startOfMonth,
    startOfWeek,
} from 'date-fns'

import {ChevronLeftIcon, ChevronRightIcon, XMarkIcon} from '@heroicons/react/24/solid'

interface Event {
    date: string            // ISO string, e.g. "2025-06-12"
    headline: string
    description?: string
    image?: string
}

export default function EventCalendar({ events }: { events: Event[] }) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

    useEffect(() => {
      if (isMobilePanelOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isMobilePanelOpen]);

    // prepare the weeks matrix
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd,   { weekStartsOn: 1 })

    const weeks: Date[][] = []
    let day = startDate
    while (day <= endDate) {
        const week: Date[] = []
        for (let i = 0; i < 7; i++) {
            week.push(day)
            day = addDays(day, 1)
        }
        weeks.push(week)
    }

    // parse event dates to Date[]
    const eventDates = events.map(e => parseISO(e.date))

    const prevMonth = () => setCurrentMonth(addDays(monthStart, -1))
    const nextMonth = () => setCurrentMonth(addDays(monthEnd, 1))

    const selectedEvent = selectedDate
        ? events.find(e => isSameDay(parseISO(e.date), selectedDate))
        : null

    return (

        <section className="w-full bg-[#0a0023] py-16 px-4 text-white">
            {/* Section Heading */}
            <div className="container mx-auto px-4">

                <div className="mb-12 mt-0">
                    <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
              Teleios Calender
              </span>
                    </div>
                    <div className="border-t border-gray-500 w-full mb-4" />
                    <h2 className="text-5xl font-bold text-white text-center mt-12">
                        Teleios Calender                        </h2>
                </div>
            </div>



        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">

            <div className="w-full lg:w-[70%] bg-[#2C1864]/80 rounded-xl shadow-lg p-4 mb-10">
                {/* header */}
                <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2  rounded" aria-label="Previous month">
                        <ChevronLeftIcon className="h-5 w-5 text-white hover:text-[#d007a6]"/>
                    </button>
                    <h2 className="text-2xl font-bold text-white">
                      {format(currentMonth, 'MMMM yyyy')}
                    </h2>
                    <button onClick={nextMonth} className="p-2  rounded" aria-label="Next month">
                        <ChevronRightIcon className="h-5 w-5 text-white hover:text-[#d007a6]"/>
                    </button>
                </div>

                {/* weekdays header */}
                <div className="grid grid-cols-7 text-sm font-medium text-center text-white mb-2">
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                        <div key={d}>{d}</div>
                    ))}
                </div>

                {/* days grid */}
                <div className="grid grid-cols-7 gap-2 px-2">
                    {weeks.map((week, wi) =>
                        week.map((dayItem, di) => {
                            const isCurrentMonth = isSameMonth(dayItem, monthStart)
                            if (!isCurrentMonth) return <div key={`${wi}-${di}`} />

                            const isEventDay = eventDates.some(ev => isSameDay(ev, dayItem))
                            const isSelected = selectedDate && isSameDay(dayItem, selectedDate)

                            return (
                                <div key={`${wi}-${di}`} className="flex justify-center">
                                    <button
                                        disabled={!isCurrentMonth}
                                        onClick={() => {
                                            if (isCurrentMonth && isEventDay) {
                                                setSelectedDate(dayItem);
                                                if (window.innerWidth < 1024) {
                                                  setIsMobilePanelOpen(true);
                                                }
                                            }
                                        }}
                                        className={`
                      w-full aspect-square max-w-[64px]
                      flex items-center justify-center transition duration-300 transform -skew-x-12
                      text-base rounded-tl-[12px] rounded-br-[12px]
                      ${isEventDay
                        ? 'bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white hover:brightness-110'
                        : 'border border-pink-400 text-white hover:bg-[#d007a6]'}
                      ${isSelected ? 'ring-2 ring-offset-1 ring-[#7e61f8]' : ''}
                    `}
                                    >
                                        <span className="skew-x-12">{format(dayItem, 'd')}</span>
                                    </button>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
            <div className="hidden lg:block w-full lg:w-[30%] bg-[#2C1864]/80 rounded-xl shadow-lg p-4 mb-10">
                {selectedEvent ? (
                    <div className="flex flex-col items-center text-center">
                        {selectedEvent.image && (
                          <div className="relative w-full max-w-sm aspect-[4/5] mb-4">
                            <Image
                              src={selectedEvent.image}
                              alt={selectedEvent.headline}
                              fill
                              className="rounded-lg mb-4 object-cover w-full aspect-[4/5] max-h-[400px] relative"
                            />
                          </div>
                        )}
                        <h3 className="text-xl font-semibold mb-2 text-white min-h-[3rem]">{selectedEvent.headline}</h3>
                        <p className="text-base text-white/80 mb-4">{selectedEvent.description}</p>
                        <p className="text-base text-white/60">Date: {format(selectedDate!, 'MMMM d, yyyy')}</p>
                    </div>
                ) : (
                    <p className="text-white/70">Select a date to see details</p>
                )}
            </div>
            <div className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ${isMobilePanelOpen ? 'translate-y-0' : 'translate-y-full'} bg-[#2C1864]/95 backdrop-blur-md`}>
              <div className="flex justify-between items-center p-4 border-b border-white">
                <h3 className="text-lg font-semibold text-white">Event Details</h3>
                <button
                  className="text-white p-2"
                  onClick={() => setIsMobilePanelOpen(false)}
                  aria-label="Close event panel"
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="p-6">
                {selectedEvent ? (
                  <div className="flex flex-col items-center text-center">
                    {selectedEvent.image && (
                      <div className="relative w-full aspect-[4/5] mb-4">
                        <Image
                          src={selectedEvent.image}
                          alt={selectedEvent.headline}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-white">{selectedEvent.headline}</h3>
                    <p className="text-base text-white/80 mb-4">{selectedEvent.description}</p>
                    <p className="text-base text-white/60">Date: {format(selectedDate!, 'MMMM d, yyyy')}</p>
                  </div>
                ) : (
                  <p className="text-white/70">Select a date to see details</p>
                )}
                <div className="mt-6 flex justify-center">
                  <Button href="/register" text="Register Now" colored={true} />
                </div>
              </div>
            </div>
        </div>
        </section>
    )
}