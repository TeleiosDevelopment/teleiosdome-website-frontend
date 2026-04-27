"use client";
import {createContext, ReactNode, useContext, useState} from 'react';

interface BookingData {
  lastName: string;
  firstName: string;
  duration: string;
  experienceId: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  email: string;
  phone: string;
}

interface BookingContextValue {
  bookingData: BookingData;
  setBookingData: (data: Partial<BookingData>) => void;
  resetBookingData: () => void;
}

const defaultBookingData: BookingData = {
  experienceId: '',
  date: '',
  time: '',
  seats: 1,
  duration: '',
  price: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookings] = useState<BookingData>(defaultBookingData);

  const setBookingData = (data: Partial<BookingData>) => {
    setBookings(prev => ({ ...prev, ...data }));
  };

  const resetBookingData = () => {
    setBookings(defaultBookingData);
  };

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, resetBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}