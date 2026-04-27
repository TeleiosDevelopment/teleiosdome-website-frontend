
'use client';
export const dynamic = 'force-dynamic';

import React, {Suspense, useCallback, useEffect, useState} from 'react';
import {useBooking} from '@/app/contexts/BookingContext';
import {useRouter, useSearchParams} from 'next/navigation';
import clsx from 'clsx';
import {addDays, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek,} from 'date-fns';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

function PageContent() {
  // ExperiencePage allows users to select simulator experience options before booking:
  // - number of seats
  // - duration (20, 40, 60 mins)
  // - date from calendar
  // - available time slot
  const { bookingData, setBookingData } = useBooking();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [seats, setSeats] = useState(bookingData.seats);
  const [duration, setDuration] = useState(bookingData.duration || '20');
  const [timeSlot, setTimeSlot] = useState(bookingData.time || '');
  const [selectedDate, setSelectedDate] = useState(
    bookingData.date || format(new Date(), 'yyyy-MM-dd')
  );
  const [availableSlots, setAvailableSlots] = useState<{ time: string; sims: number }[]>([]);
  const [error, setError] = useState('');
  const [maxSeats, setMaxSeats] = useState(1);
  const [weeklyPlan, setWeeklyPlan] = useState<{ id: string; day: string; start_time: string; end_time: string; is_open: number }[]>([]);
  const [dateRules, setDateRules] = useState<{ id: string; date: string; is_open: number; start_time: string; end_time: string; description?: string }[]>([]);
  // Loading states
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  const [loadingSimulators, setLoadingSimulators] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(true);

  useEffect(() => {
    const paramDuration = searchParams.get('duration');
    if (paramDuration && ['20','40','60'].includes(paramDuration)) {
      setDuration(paramDuration);
    }
  }, [searchParams]);

  const fetchAvailableSlots = useCallback(async () => {
    setLoadingSlots(true);
    if (!selectedDate || !duration || !seats) {
      setLoadingSlots(false);
      return;
    }
    try {
      const params = new URLSearchParams({
        date: selectedDate,
        number_of_people: seats.toString(),
        duration,
        booking_type: 'normal'
      });
      const res = await fetch(
        `${API_BASE_URL}/api/bookings/availableSlots?${params.toString()}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      // Normalize times (remove seconds)
      const todayStr = new Date().toISOString().split('T')[0];
      const rawSlots = (data as { time: string; sims: number }[]).map(slot => ({
        ...slot,
        time: slot.time.slice(0, 5)
      }));
      let filteredSlots: typeof rawSlots = rawSlots;

      // Only apply past-time filter for today's date
      if (selectedDate === todayStr) {
        const now = new Date();
        const futureSlots = rawSlots.filter(slot => {
          const slotDateTime = new Date(`${selectedDate}T${slot.time}`);
          return slotDateTime >= now;
        });
        // If we have at least 3 future slots, use them; otherwise show all slots
        if (futureSlots.length >= 3) {
          filteredSlots = futureSlots;
        }
      }
      setAvailableSlots(filteredSlots);
      setLoadingSlots(false);
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setLoadingSlots(false);
    }
  }, [selectedDate, duration, seats]);

  useEffect(() => {
    // Clear the selected time slot whenever date, seats, or duration change
    setTimeSlot('');
    fetchAvailableSlots();
  }, [fetchAvailableSlots]);

  useEffect(() => {
    if (!selectedDate) return;
    const fetchSimulators = async () => {
      setLoadingSimulators(true);
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        // Fetch total simulators available at midnight of the selected date
        const totalRes = await fetch(
          `${API_BASE_URL}/api/simulators/getMaxSimulators?datetime=${encodeURIComponent(`${selectedDate} 00:00:00`)}`,
          { headers }
        );
        let total = 0;
        if (totalRes.ok) {
          const totalResult = await totalRes.json();
          if (totalResult.success) {
            total = totalResult.data as number;
          }
        }
        // Fetch locked simulators (all locks) and count only those for the selected date
        const lockedRes = await fetch(
          `${API_BASE_URL}/api/settings/getLockedSimulators`,
          { headers }
        );
        let lockedCount = 0;
        if (lockedRes.ok) {
          const lockedResult = await lockedRes.json();
          if (lockedResult.success && Array.isArray(lockedResult.data)) {
            // Only count locks for the selected date
            lockedCount = (lockedResult.data as { locking_date: string }[]).filter((lock) =>
              lock.locking_date.startsWith(`${selectedDate}T`)
            ).length;
          }
        }
        // Calculate available seats
        setMaxSeats(Math.max(0, total - lockedCount));
        setLoadingSimulators(false);
      } catch (err) {
        console.error('Error fetching simulators:', err);
        setLoadingSimulators(false);
      }
    };
    fetchSimulators();
  }, [selectedDate]);

  // Ensure seats do not exceed the available max for the selected date
  useEffect(() => {
    setSeats(prev => Math.min(prev, maxSeats));
  }, [maxSeats]);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoadingSchedules(true);
      try {
        const planRes = await fetch(`${API_BASE_URL}/api/settings/getWeeklyPlan`);
        if (planRes.ok) {
          const planResult = await planRes.json();
          if (planResult.success) {
            setWeeklyPlan(planResult.data);
            setLoadingSchedules(false);
          }
        }
        const rulesRes = await fetch(`${API_BASE_URL}/api/settings/getDateRules`);
        if (rulesRes.ok) {
          const rulesResult = await rulesRes.json();
          if (rulesResult.success) {
            setDateRules(rulesResult.data);
            setLoadingSchedules(false);
          }
        }
      } catch (err) {
        console.error('Error fetching schedules:', err);
        setLoadingSchedules(false);
      }
    };
    fetchSchedules();
  }, []);

  // Generate an array of time slots between start and end times based on current duration
  const generateInitialSlots = () => {
    if (!weeklyPlan.length) return [];
    const dayName = format(new Date(selectedDate), 'EEEE');
    const plan = weeklyPlan.find(p => p.day === dayName);
    if (!plan || plan.is_open === 0) return [];
    const [startH, startM] = plan.start_time.split(':').map(Number);
    const [endH, endM] = plan.end_time.split(':').map(Number);
    const slotMinutes = 20;
    const slots: string[] = [];
    let minutes = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    while (minutes + slotMinutes <= endTotal) {
      const h = Math.floor(minutes / 60).toString().padStart(2, '0');
      const m = (minutes % 60).toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
      minutes += slotMinutes;
    }
    return slots;
  };

  useEffect(() => {
    setError('');
  }, [selectedDate, timeSlot, duration, seats]);

  const fixedDetails: Record<string, { price: number; id: string }> = {
    '20': { price: 120, id: '1' },
    '40': { price: 200, id: '2' },
    '60': { price: 280, id: '3' },
  };
  const selectedDetails = fixedDetails[duration] ?? { price: 0, id: '' };
  const pricePerSession = selectedDetails.price;
  const bookingTypeId = selectedDetails.id;

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const weeks: Date[][] = [];
  let day = startDate;
  while (day <= endDate) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  }
  const prevMonth = () => setCurrentMonth(addDays(monthStart, -1));
  const nextMonth = () => setCurrentMonth(addDays(monthEnd, 1));

  // Validate inputs and save booking data to context before navigating to details page
  const handleContinue = () => {
    const missingFields = [];
    if (!selectedDate) missingFields.push('date');
    if (!timeSlot) missingFields.push('time slot');
    if (!duration) missingFields.push('duration');
    if (!seats) missingFields.push('number of participants');

    if (missingFields.length > 0) {
      setError(`Please select ${missingFields.join(', ')} before continuing.`);
      return;
    }

    setError('');
    const totalPrice = seats * pricePerSession;

    setBookingData({
      lastName: '',
      price: totalPrice,
      seats,
      duration,
      date: selectedDate,
      time: timeSlot,
      ...(bookingTypeId ? ({ bookingTypeId } as Partial<typeof bookingData>) : {}),
    });

    router.push('/booking/details');
  };


  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left column: 4 stacked sections */}
        <div className="lg:w-2/3 space-y-6">
          {/* 1. Select Seats */}
          <div className="bg-black/80 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Select Seats</h2>
            {loadingSimulators ? (
              <div className="flex justify-center items-center min-h-[72px]">
                <div className="animate-spin rounded-full border-t-4 border-white w-16 h-16" />
              </div>
            ) : (
              <div className="inline-flex items-center gap-4 bg-white/10 p-1 rounded-tl-[8px] rounded-br-[8px]">
                <button
                  onClick={() => setSeats(s => Math.max(1, s - 1))}
                  className="px-4 py-2 text-xl transition-colors duration-200 bg-white/20 hover:bg-purple-600 hover:text-white rounded cursor-pointer"
                >-</button>
                <span className="text-2xl w-8 text-center font-jura">{seats}</span>
                <button
                  onClick={() => setSeats(s => Math.min(maxSeats, s + 1))}
                  disabled={seats >= maxSeats}
                  className="px-4 py-2 text-xl transition-colors duration-200 bg-white/20 hover:bg-purple-600 hover:text-white rounded cursor-pointer"
                >+</button>
              </div>
            )}
          </div>

          {/* 2. Duration */}
          <div className="bg-black/80 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Duration</h2>
           <div className="mt-2 flex space-x-2 font-jura">
              {['20','40','60'].map(d => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-6 py-2 w-2/4  text-base rounded ${duration === d ? 'bg-purple-600' : 'bg-white/10 cursor-pointer'} -skew-x-15 rounded-tl-[8px] rounded-br-[8px] `}
                >
                  <span className="sm:hidden">{d}</span>
                  <span className="hidden sm:inline">{d} minutes</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Select Date */}
          <div className="bg-black/80 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Select Date</h2>
            {loadingSchedules ? (
              <div className="flex justify-center items-center min-h-[360px]">
                <div className="animate-spin rounded-full border-t-4 border-white w-16 h-16" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <button onClick={prevMonth}><ChevronLeftIcon className="w-5 h-5"/></button>
                  <span>{format(currentMonth, 'MMMM yyyy')}</span>
                  <button onClick={nextMonth}><ChevronRightIcon className="w-5 h-5"/></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2 font-jura">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                    <div key={d}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-x-4 gap-y-6 font-jura px-2">
                  {weeks.map((week, wi) =>
                    week.map((dayItem, di) => {
                      // Render each day cell with conditionals:
                      // - Disabled if Monday, past, or outside current month
                      // - Selected styling if it matches selectedDate
                      const isCurrentMonth = isSameMonth(dayItem, monthStart);
                      // const isMonday = dayItem.getDay() === 1;
                      const isSelectedDay = selectedDate === format(dayItem, 'yyyy-MM-dd');
                      const today = new Date();
                      const isPast = dayItem < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const formattedDate = format(dayItem, 'yyyy-MM-dd');
                      const overrideRule = dateRules.find(rule => rule.date === formattedDate);
                      const isClosedByRule = overrideRule ? overrideRule.is_open === 0 : false;
                      const dayName = format(dayItem, 'EEEE');
                      const planForDay = weeklyPlan.find(plan => plan.day === dayName);
                      const isClosedByPlan = !overrideRule && planForDay ? planForDay.is_open === 0 : false;
                      const isDisabled = !isCurrentMonth || isPast || isClosedByRule || isClosedByPlan;
                      return (
                        <button
                          key={`${wi}-${di}`}
                          disabled={isDisabled}
                          onClick={() => {
                            if (!isDisabled) {
                              setSelectedDate(format(dayItem, 'yyyy-MM-dd'));
                            }
                          }}
                          className={`aspect-square w-full max-w-[70px] sm:max-w-[50px]
                            flex items-center justify-center transition duration-200 transform -skew-x-12
                            text-base rounded-tl-[6px] rounded-br-[6px] sm:rounded-tl-[12px] sm:rounded-br-[12px] 
                            ${
                              isSelectedDay
                                ? 'bg-purple-600 text-white'
                                : isDisabled
                                  ? 'opacity-30 cursor-not-allowed'
                                  : 'border border-white text-white cursor-pointer'
                            }`}
                        >
                          <span className="skew-x-12 ml-0 sm:ml-1">{format(dayItem, 'd')}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>

          {/* 4. Choose Time Slot */}
          <div className="bg-black/80 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Choose Time Slot</h2>
            {loadingSlots ? (
              <div className="flex justify-center items-center min-h-[220px]">
                <div className="animate-spin rounded-full border-t-4 border-white w-16 h-16" />
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-3 gap-2 font-jura">
                {(() => {
                  const now = new Date();
                  const initialSlots = generateInitialSlots();
                  // Filter for available future slots
                  const validTimes = initialSlots.filter(time => {
                    const slot = availableSlots.find(s => s.time === time);
                    if (!slot) return false;
                    const slotDateTime = new Date(`${selectedDate}T${time}`);
                    return slot.sims >= 1 && slotDateTime >= now;
                  });
                  // Compute top and bottom fillers to align the grid to multiples of 3
                  const minuteSegments = ['00', '20', '40'];
                  let topFillers: string[] = [];
                  let bottomFillers: string[] = [];
                  if (validTimes.length > 0) {
                    // Top fillers: align first slot to nearest ':00'
                    const firstMinute = validTimes[0].split(':')[1];
                    const topMissing = minuteSegments.indexOf(firstMinute);
                    if (topMissing > 0) {
                      const passedSlots = initialSlots.filter(time => {
                        const slotDateTime = new Date(`${selectedDate}T${time}`);
                        return slotDateTime < now;
                      });
                      topFillers = passedSlots.slice(-topMissing);
                    }
                    // Bottom fillers: ensure total slots count is a multiple of 3
                    const totalWithTop = topFillers.length + validTimes.length;
                    const remainder = totalWithTop % 3;
                    if (remainder !== 0) {
                      const bottomMissing = 3 - remainder;
                      const futureSlots = initialSlots.filter(time => {
                        const slotDateTime = new Date(`${selectedDate}T${time}`);
                        return slotDateTime >= now && !validTimes.includes(time);
                      });
                      bottomFillers = futureSlots.slice(0, bottomMissing);
                    }
                  }
                  // Final sequence: top fillers, valid slots, then bottom fillers
                  const displayTimes = [...topFillers, ...validTimes, ...bottomFillers];
                  return displayTimes.map(time => {
                    const isFiller = topFillers.includes(time) || bottomFillers.includes(time);
                    if (isFiller) {
                      return (
                        <button
                          key={time}
                          disabled
                          className="w-full h-[44px] text-lg -skew-x-20 rounded-tl-[8px] rounded-br-[8px] bg-white/10 opacity-30 cursor-not-allowed"
                        >
                          {time}
                        </button>
                      );
                    }
                    return (
                      <button
                        key={time}
                        onClick={() => setTimeSlot(time)}
                        className={
                          `w-full h-[44px] text-lg -skew-x-20 rounded-tl-[8px] rounded-br-[8px] transition-transform duration-150 ease-in-out cursor-pointer ` +
                          `${timeSlot === time ? 'bg-purple-600 text-white hover:scale-105' : ' bg-white/10  hover:bg-white/20 hover:scale-105'}`
                        }
                      >
                        {time}
                      </button>
                    );
                  });
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Booking Details */}
        <div className="w-full lg:w-[38%] bg-black/80 text-white p-4 pt-10 rounded-lg flex flex-col flex-grow sticky top-[100px] max-h-[45vh] overflow-y-auto">
          {/* Show booking summary before user proceeds:
              Includes seats, date, time, duration, and total price */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
            <div className="text-base leading-7 space-y-1">
              <div className="flex justify-between">
                <div className="font-medium">Participants:</div>
                <div className="font-jura">{seats}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium">Date:</div>
                <div className="font-jura">{selectedDate}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium">Time:</div>
                <div className="font-jura">{timeSlot}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium">Duration:</div>
                <div className="font-jura">{duration} minutes</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium">Price:</div>
                <div className="font-jura">
                  {`AED ${seats * pricePerSession}`}
                </div>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-2 font-medium">{error}</div>
            )}
          </div>
          <button
            onClick={handleContinue}
            className={clsx(
              'flex items-center justify-center cursor-pointer transition duration-300 transform mt-8 -skew-x-12',
              'px-6 h-[52px] text-sm leading-[10px] rounded-tl-[12px] rounded-br-[12px]',
              'bg-gradient-to-r from-[#7e61f8] to-[#d007a6] text-white hover:brightness-110'
            )}
          >
            <span className="skew-x-12">Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-white w-16 h-16" />
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}