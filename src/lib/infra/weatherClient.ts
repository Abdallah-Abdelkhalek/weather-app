// server-only: node runtime
import axios from 'axios';

const baseURL =
  process.env.OPENWEATHER_BASE ||
  'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.OPENWEATHER_API_KEY;

if (!apiKey) {
  throw new Error('OPENWEATHER_API_KEY is not set in env');
}

// axios instance for external provider
export const weatherAxios = axios.create({
  baseURL,
  timeout: 10000,
});

// logging interceptor (request)
weatherAxios.interceptors.request.use((config) => {
  // Basic structured log for debugging
  console.log('[WeatherClient][Request]', {
    method: config.method,
    url: config.url,
    params: config.params,
  });
  return config;
});

// logging interceptor (response)
weatherAxios.interceptors.response.use(
  (resp) => {
    console.log('[WeatherClient][Response]', {
      url: resp.config.url,
      status: resp.status,
    });
    return resp;
  },
  (error) => {
    console.error('[WeatherClient][Error]', {
      message: error.message,
      config: error.config && {
        url: error.config.url,
        params: error.config.params,
      },
      responseStatus: error.response?.status,
    });
    return Promise.reject(error);
  },
);
