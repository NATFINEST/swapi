import { configureStore } from '@reduxjs/toolkit';
import { starWarsSlice } from './starWarsSlice';

export const store = configureStore({
  reducer: {
    starWars: starWarsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
