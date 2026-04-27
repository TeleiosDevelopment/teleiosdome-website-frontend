"use client";

import SideBar from "./SideBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="w-full sm:w-64">
        <SideBar />
      </div>
      <div className="flex-1 p-6 bg-gray-50 text-black overflow-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}