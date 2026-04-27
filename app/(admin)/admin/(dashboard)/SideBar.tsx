'use client';

import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {
    CalendarDaysIcon,
    ClockIcon,
    CpuChipIcon,
    HomeIcon,
    TicketIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import {useAuth} from '@/app/contexts/AuthContext';


const navItems = [
    { label: 'Dashboard',   href: '/admin/dashboard', icon: HomeIcon },
    { label: 'Bookings',    href: '/admin/bookings', icon: CalendarDaysIcon },
    { label: 'Simulators',  href: '/admin/simulators', icon: CpuChipIcon },
    { label: 'Events',      href: '/admin/events', icon: TicketIcon },
    { label: 'Hours & Closure', href: '/admin/hours-closure', icon: ClockIcon },
    { label: 'Users',       href: '/admin/users', icon: UserGroupIcon },
];

export default function SideBar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const filteredNavItems = user && user.role?.toLowerCase() === 'receptionist'
      ? navItems.filter(item => ['Dashboard', 'Bookings'].includes(item.label))
      : navItems;

    return (
        <nav className="flex flex-col sm:flex-col w-full sm:w-64 bg-white p-4 sm:p-6 border-b sm:border-b-0 sm:border-r sm:h-screen items-center sm:items-start">
          <div className="flex flex-col items-center sm:items-start sm:mb-8 w-full">
            <Image
              src="/logo-dome.png"
              alt="Teleios Logo"
              width={120}
              height={40}
              priority
              className="h-auto w-auto sm:w-full sm:h-auto object-contain invert"
            />
            <div className="hidden sm:block text-left mt-4">
              <p className="text-sm text-gray-500">
                {new Date().toLocaleString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-[rgb(75,85,99)] capitalize">
                {user ? `${user.username || 'User'} – ${user.role || 'Role'}` : 'Loading...'}
              </p>
            </div>
          </div>

          <ul className="flex flex-row justify-center sm:justify-start overflow-x-auto sm:overflow-visible sm:flex-col gap-2 sm:space-y-2 mt-4">
            {filteredNavItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center px-2 py-2 sm:px-4 rounded-lg transition text-sm ${
                      isActive
                        ? 'bg-blue-100 text-[rgb(37,99,235)]'
                        : 'text-[rgb(55,65,81)] hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-6 w-6 mr-1 sm:mr-2" aria-hidden="true" />
                    <span className="sm:inline hidden">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => {
              Cookies.remove('access_token', { path: '/' });
              Cookies.remove('token_type',   { path: '/' });
              logout();
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center justify-center sm:justify-start px-2 sm:px-4 py-2 mt-6 rounded-lg text-[rgb(220,38,38)] hover:bg-red-50 transition text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
    );
}