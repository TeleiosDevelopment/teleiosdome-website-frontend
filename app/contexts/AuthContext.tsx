'use client';

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

type Role = 'admin' | 'receptionist';

interface AuthContextProps {
  user: { username: string; name?: string; role: string } | null;
  role: Role | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string; name?: string; role: string } | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get('access_token');

        const headers: HeadersInit = {
          Accept: 'application/json',
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        console.log('AuthContext.fetchCurrentUser token:', token);
        console.log('AuthContext.fetchCurrentUser headers:', headers);

        const res = await fetch(`${API_BASE_URL}/api/users/me`, {
          method: 'GET',
          headers,
        });

        if (res.ok) {
          const { data } = await res.json();
          setUser({
            username: data.username,
            name: data.name,
            role: data.role.name,
          });
          setRole(data.role.name.toLowerCase() as Role);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch {
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    // Delay to allow cookie propagation
    const timer = setTimeout(fetchCurrentUser, 300);
    return () => clearTimeout(timer);
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Login failed');
  };

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
