import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Imagen } from '../../../types/types';

const initialState = {
  imagenes: [] as Imagen[],
};

export const fotosSlice = createSlice({
  name: 'fotos',
  initialState: initialState,
  reducers: {
    setFotos: (state, action: PayloadAction<Imagen[]>) => {
      state.imagenes = action.payload;
    },
  },
});

export const { setFotos } = fotosSlice.actions;
export default fotosSlice.reducer;
