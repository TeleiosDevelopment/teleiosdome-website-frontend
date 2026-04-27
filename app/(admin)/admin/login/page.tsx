'use client';

import Cookies from 'js-cookie';

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import Spinner from '@/app/(admin)/admin/components/Spinner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function AdminLoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState<string | null>(null);
    const [loading, setLoading]   = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            const data = await response.json();
            const { access_token, token_type } = data;

            const expires = new Date(Date.now() + 4 * 60 * 60 * 1000); // cookie expires in 4 hours
            Cookies.set('access_token', access_token, { expires, path: '/', secure: true, sameSite: 'strict' });
            Cookies.set('token_type',   token_type,   { expires, path: '/', secure: true, sameSite: 'strict' });

            router.replace('/admin/dashboard/');
            setTimeout(() => window.location.reload(), 100);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg"
            >
                <h1 className="text-2xl font-semibold mb-6 text-center text-black"> Sign In</h1>

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="username" className="block text-base text-black font-medium mb-1">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        autoComplete="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className="w-full px-3 py-2 border text-black  border-black roundedfocus:ring-2 focus:ring-purple-500"
                        placeholder="Your username"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-base font-medium mb-1 text-black">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e  => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-black text-black rounded outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 text-white rounded-lg transition ${
                        loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                >
                    {loading ? <Spinner /> : 'Sign In'}
                </button>
            </form>
        </div>
    );
}