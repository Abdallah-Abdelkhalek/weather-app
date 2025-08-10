import { NextRequest, NextResponse } from 'next/server';
import {
  fetchWeatherByCoords,
  fetchWeatherByCity,
} from '@/lib/api/serverWeather';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const lat = url.searchParams.get('lat');
  const lon = url.searchParams.get('lon');
  const city = url.searchParams.get('city');
  const lang = url.searchParams.get('lang');

  try {
    let data;
    if (lat && lon) {
      data = await fetchWeatherByCoords(Number(lat), Number(lon));
    } else if (city && lang) {
      data = await fetchWeatherByCity(city, lang);
    } else {
      return NextResponse.json(
        { error: 'Missing query parameters' },
        { status: 400 },
      );
    }
    return NextResponse.json({ data });
  } catch (err: any) {
    console.error('[/api/weather] error', err);
    return NextResponse.json(
      { error: err.message ?? 'Failed to fetch' },
      { status: 500 },
    );
  }
}
