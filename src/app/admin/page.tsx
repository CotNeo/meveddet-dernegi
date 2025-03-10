'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from '@/components/AdminLogin';
import AnnouncementManager from '@/components/AnnouncementManager';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Session storage'dan auth durumunu kontrol et
    const authStatus = sessionStorage.getItem('adminAuth');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {!isAuthenticated ? (
          <AdminLogin onLogin={handleLogin} />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Çıkış Yap
              </button>
            </div>
            <AnnouncementManager />
          </div>
        )}
      </div>
    </div>
  );
} 