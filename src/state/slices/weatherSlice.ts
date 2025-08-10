import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimplifiedWeather } from '@/types/weather';

type State = {
  last?: SimplifiedWeather;
};

const initialState: State = {
  last: undefined,
};

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLastWeather(state, action: PayloadAction<SimplifiedWeather>) {
      state.last = action.payload;
      try {
        localStorage.setItem(
          'lastWeather',
          JSON.stringify(action.payload),
        );
      } catch {}
    },
    initFromStorage(state) {
      try {
        const v = localStorage.getItem('lastWeather');
        if (v) state.last = JSON.parse(v);
      } catch {}
    },
  },
});

export const { setLastWeather, initFromStorage } = slice.actions;
export default slice.reducer;
