import {configureStore} from '@reduxjs/toolkit';
import customReducer from './slices/custom/customSlice';
import encuestasReducer from './slices/encuestas/encuestasSlice';
import fotosReducer from './slices/fotos/fotosSlice';

export const store = configureStore({
  reducer: {
    custom: customReducer,
    encuestas: encuestasReducer,
    fotos: fotosReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
