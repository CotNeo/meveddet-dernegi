'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from '@/components/AdminLogin';
import AnnouncementManager from '@/components/AnnouncementManager';
import ContactMessageManager from '@/components/ContactMessageManager';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('announcements'); // 'announcements' veya 'messages'
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
            
            {/* Sekme Menüsü */}
            <div className="flex border-b mb-6">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'announcements'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('announcements')}
              >
                Duyurular
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'messages'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                İletişim Mesajları
              </button>
            </div>
            
            {/* İçerik */}
            {activeTab === 'announcements' ? (
              <AnnouncementManager />
            ) : (
              <ContactMessageManager />
            )}
          </div>
        )}
      </div>
    </div>
  );
} 