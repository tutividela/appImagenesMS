import {configureStore} from '@reduxjs/toolkit';
import customReducer from './slices/customSlice';
import encuestasReducer from './slices/encuestasSlice';

export const store = configureStore({
  reducer: {
    custom: customReducer,
    encuestas: encuestasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
