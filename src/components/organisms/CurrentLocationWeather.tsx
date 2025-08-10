'use client';

import React, { useEffect, useState } from 'react';
import { SimplifiedWeather } from '@/types/weather';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setLastWeather } from '@/state/slices/weatherSlice';
import { useTranslation } from 'react-i18next';
import { Locale } from '@/i18nConfig';

interface CurrentLocationWeatherProps {
  language: Locale;
}

export default function CurrentLocationWeather({
  language,
}: CurrentLocationWeatherProps) {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<SimplifiedWeather | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const v = localStorage.getItem('lastWeather');
      if (v) setWeather(JSON.parse(v));
    } catch {}
  }, []);

  useEffect(() => {
    requestLocation();
  }, [language]);

  const fetchByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/weather?lat=${lat}&lon=${lon}&lang=${language}`,
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to fetch');
      setWeather(json.data);
      dispatch(setLastWeather(json.data));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    setError(null);
    if (!navigator.geolocation) {
      setError(
        t('location_error', {
          error: t('Geolocation not supported'),
        }),
      );
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError(
            t('location_error', {
              error: t('Location access denied'),
            }),
          );
        } else {
          setError(err.message || t('Failed to get location'));
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60_000,
        timeout: 10_000,
      },
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 via-sky-300 to-sky-200 p-6 shadow-xl dark:from-sky-800 dark:via-blue-800 dark:to-indigo-900"
    >
      {/* Floating SVG Decorations */}
      <motion.div
        className="absolute -top-10 -left-10 opacity-20"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear',
        }}
      >
        <svg
          width="150"
          height="150"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <circle cx="75" cy="75" r="70" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -right-8 -bottom-8 opacity-20"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: 'linear',
        }}
      >
        <svg
          width="200"
          height="200"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <rect x="20" y="20" width="160" height="160" rx="30" />
        </svg>
      </motion.div>

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white drop-shadow-sm">
          {t('search_city_weather')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={requestLocation}
            disabled={loading}
            className="rounded-lg bg-white/30 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/50 disabled:opacity-50"
          >
            {loading ? t('Locating') : t('get_location')}
          </button>
          <button
            onClick={requestLocation}
            disabled={loading || !weather}
            className="rounded-lg bg-white/10 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/30 disabled:opacity-50"
          >
            {t('refresh')}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-3 rounded-lg border border-red-400 bg-red-100/80 p-3 text-sm text-red-800 shadow-md backdrop-blur-sm"
        >
          {t('location_error', { error })}
        </motion.div>
      )}

      {/* Weather Card */}
      {weather ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl bg-white/70 p-4 shadow-lg backdrop-blur-md dark:bg-black/30"
        >
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              width={72}
              height={72}
              alt={weather.description}
              className="drop-shadow-lg"
            />
            <div>
              <div className="text-lg font-semibold">
                {weather.name}
                {weather.country ? `, ${weather.country}` : ''}
              </div>
              <div className="text-3xl font-bold">
                {weather.tempC}°C
              </div>
              <div className="text-sm capitalize opacity-90">
                {weather.description}
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs opacity-70">
            {t('updated')}{' '}
            {new Date(weather.timestamp).toLocaleString()}
          </div>
        </motion.div>
      ) : (
        <div className="rounded-lg border border-dashed border-white/50 p-4 text-center text-white/80">
          {t('cityWeather.typeCity')}
        </div>
      )}
    </motion.section>
  );
}
