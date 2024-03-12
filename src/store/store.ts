import { configureStore } from '@reduxjs/toolkit';
import customReducer from './slices/customSlice';

export const store = configureStore({
  reducer: {
    custom: customReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
