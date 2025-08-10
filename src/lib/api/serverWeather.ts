import { OpenWeatherResp, SimplifiedWeather } from '@/types/weather';
import { weatherAxios } from '../infra/weatherClient';

/**
 * Converts the OpenWeather API response to a simplified weather object
 * that can be used within the application.
 *
 * param resp The response from the OpenWeather API.
 * returns A SimplifiedWeather object.
 */

export function simplifyOpenWeather(
  resp: OpenWeatherResp,
): SimplifiedWeather {
  return {
    name: resp.name,
    country: resp.sys?.country,
    tempC: +(resp.main.temp - 273.15).toFixed(1),
    description: resp.weather?.[0]?.description ?? '',
    icon: resp.weather?.[0]?.icon ?? '',
    timestamp: resp.dt * 1000,
  };
}

/**
 * Fetches the weather by coordinates (latitude and longitude).
 *
 * param lat The latitude.
 * param lon The longitude.
 * returns A promise that resolves to a SimplifiedWeather object.
 */

export async function fetchWeatherByCoords(
  lat: number,
  lon: number,
): Promise<SimplifiedWeather> {
  const resp = await weatherAxios.get<OpenWeatherResp>('/weather', {
    params: {
      lat,
      lon,
      appid: process.env.OPENWEATHER_API_KEY,
    },
  });
  return simplifyOpenWeather(resp.data);
}

/**
 * Fetches the weather by city name.
 *
 * param city The city name.
 * param lang The language for the response.
 * returns A promise that resolves to a SimplifiedWeather object.
 */

export async function fetchWeatherByCity(
  city: string,
  lang: string,
): Promise<SimplifiedWeather> {
  const resp = await weatherAxios.get<OpenWeatherResp>('/weather', {
    params: {
      q: city,
      appid: process.env.OPENWEATHER_API_KEY,
      lang: lang,
    },
  });
  return simplifyOpenWeather(resp.data);
}
