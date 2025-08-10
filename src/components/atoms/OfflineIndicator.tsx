'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { t } = useTranslation('common');

  useEffect(() => {
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
    <div className="animate-fadeIn fixed top-16 left-0 z-50 w-full bg-red-600 py-2 text-center text-white">
      <span>{t('offline')}</span>
    </div>
  );
}
