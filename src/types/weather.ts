export type OpenWeatherResp = {
  coord: { lon: number; lat: number };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base?: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility?: number;
  wind?: { speed: number; deg: number };
  clouds?: { all: number };
  dt: number;
  sys?: { country?: string };
  id?: number;
  name: string;
  cod?: number | string;
};

export type SimplifiedWeather = {
  name: string;
  country?: string;
  tempC: number;
  description: string;
  icon: string; // openweathermap icon code
  timestamp: number;
};
