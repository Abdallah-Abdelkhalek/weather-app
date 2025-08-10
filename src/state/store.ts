import { configureStore } from '@reduxjs/toolkit';
import WeatherReducer from './slices/weatherSlice';

export const makeStore = () => {
  return configureStore({
    reducer: { weather: WeatherReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
