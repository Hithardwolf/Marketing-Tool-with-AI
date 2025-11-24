'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Analytics() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');
    
    if (!userId) {
      router.push('/login');
      return;
    }
    
    setUserEmail(email || '');
  }, [router]);

  const stats = [
    { label: 'Total Posts', value: '24', change: '+12%' },
    { label: 'Total Views', value: '45.2K', change: '+25%' },
    { label: 'Engagement', value: '8.7%', change: '+5%' },
    { label: 'Followers', value: '1.2K', change: '+18%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
            >
              <span>←</span>
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">AI Marketing Tool</span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-semibold text-gray-900 mb-3 tracking-tight">
            Analytics
          </h1>
          <p className="text-xl text-gray-600">
            Track your social media performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200"
            >
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex gap-4">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Demo Mode</h3>
              <p className="text-sm text-gray-700">
                This analytics data is simulated for demonstration purposes. In production,
                this dashboard would connect to Twitter API to fetch real-time metrics.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}