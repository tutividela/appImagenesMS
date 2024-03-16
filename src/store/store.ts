import {configureStore} from '@reduxjs/toolkit';
import customReducer from './slices/customSlice';
import encuestasReducer from './slices/encuestas/encuestasSlice';

export const store = configureStore({
  reducer: {
    custom: customReducer,
    encuestas: encuestasReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
