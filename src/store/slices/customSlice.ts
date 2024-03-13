import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Custom} from '../../types/types';

const initialState: Custom = {
  estaLogueado: false,
};

export const customSlice = createSlice({
  name: 'custom',
  initialState: initialState,
  reducers: {
    setEstaLogueado: (state, action: PayloadAction<boolean>) => {
      state.estaLogueado = action.payload;
    },
  },
});

export const {setEstaLogueado} = customSlice.actions;
export default customSlice.reducer;
