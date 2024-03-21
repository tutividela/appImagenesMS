import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Imagen } from '../../../types/types';

type FotoSliceState = {
  imagenes: Imagen[];
  imagenASubir: any;
}

const initialState: FotoSliceState = {
  imagenes: [] as Imagen[],
  imagenASubir: null,
};

export const fotosSlice = createSlice({
  name: 'fotos',
  initialState: initialState,
  reducers: {
    setFotos: (state, action: PayloadAction<Imagen[]>) => {
      state.imagenes = action.payload;
    },
    setImagenASubir: (state, action: PayloadAction<any>) => {
      state.imagenASubir = action.payload;
    },
  },
});

export const { setFotos, setImagenASubir } = fotosSlice.actions;
export default fotosSlice.reducer;
