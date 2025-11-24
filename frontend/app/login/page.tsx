'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? 'register' : 'login';
      const response = await axios.post(`${API_URL}/auth/${endpoint}`, {
        email,
        password,
      });

      if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId.toString());
        localStorage.setItem('userEmail', response.data.email);
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message === 'Network Error') {
        setError('Cannot connect to server. Make sure backend is running on port 3001');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Apple-style Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">AI Marketing Tool</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-semibold text-gray-900 mb-3 tracking-tight">
              {isRegister ? 'Get started.' : 'Welcome back.'}
            </h1>
            <p className="text-xl text-gray-600">
              {isRegister ? 'Create your account to continue.' : 'Sign in to continue.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Email"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Password"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Please wait...' : (isRegister ? 'Continue' : 'Sign In')}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium transition"
              disabled={loading}
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2024 AI Marketing Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}