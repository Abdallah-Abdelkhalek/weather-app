'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const { t } = useTranslation('common');
  useEffect(() => {
    // Initialize
    setIsOffline(!navigator.onLine);

    // Listeners
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-16 left-0 z-50 w-full bg-red-600 py-2 text-center text-white">
      <span>{t('offline')}</span>
    </div>
  );
}
