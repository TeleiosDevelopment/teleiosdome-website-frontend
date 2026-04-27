// This file defines the layout for the admin section of the app.
// It includes authentication and role-based access control logic.

"use client";

import {Inter} from "next/font/google";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AuthProvider, useAuth} from "@/app/contexts/AuthContext";
import AdminLoading from "@/app/(admin)/loading"

// Import the Inter font with specified weights and define it as a CSS variable.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

// ProtectedAdmin component handles access control for admin routes.
// It redirects unauthenticated users and enforces role-specific route access.
function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

useEffect(() => {
    // Redirect unauthenticated users trying to access protected routes to the login page.
    if (!loading) {
      if (!user && pathname !== "/admin/login/") {
        const timer = setTimeout(() => {
          router.replace("/admin/login/");
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, user, pathname, router]);

  useEffect(() => {
    // Redirect logged-in users away from the login page to the dashboard.
    if (user && pathname === "/admin/login/") {
      const timer = setTimeout(() => {
        router.replace("/admin/dashboard");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, pathname, router]);

  useEffect(() => {
    // Restrict receptionist users to specific admin routes only.
    if (!loading && user && user.role?.toLowerCase() === 'receptionist') {
      const allowedPaths = ['/admin/dashboard/', '/admin/bookings/'];
      if (!allowedPaths.some(path => pathname.startsWith(path))) {
        router.replace('/admin/dashboard/');
      }
    }
  }, [loading, user, pathname, router]);

  // 1. Display loading screen while auth is loading.
  if (loading) {
    return <AdminLoading />;
  }

  // 2. Login page logic.
  if (pathname === "/admin/login/") {
    if (!user) {
      return <div>{children}</div>;
    }
    // Redirect for authenticated users is handled in useEffect.
    return null;
  }

  // 3. Block unauthenticated users from other routes.
  if (!user) {
    router.replace("/admin/login/");
    return null;
  }

  // 4. Restrict receptionist users to specific admin routes only.
  if (user.role?.toLowerCase() === "receptionist") {
    const allowedPaths = ["/admin/dashboard/", "/admin/bookings/"];
    if (!allowedPaths.some((path) => pathname.startsWith(path))) {
      router.replace("/admin/dashboard/");
      return null;
    }
  }

  // 5. Render admin layout with header and children components.
  return (
    <div>
      <header className="p-4 text-sm text-gray-600">
        {user ? `${user.username || "User"} – ${user.role || "Role"}` : "Loading..."}
      </header>
      {children}
    </div>
  );
}

// AdminLayout wraps ProtectedAdmin with the AuthProvider and font styling.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className={`${inter.variable} [font-family:var(--font-inter)] bg-white`}>
        <ProtectedAdmin>{children}</ProtectedAdmin>
      </div>
    </AuthProvider>
  );
}
