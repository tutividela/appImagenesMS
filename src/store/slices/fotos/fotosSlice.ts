import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Imagen, InformacionDeFotos } from '../../../types/types';

type FotoSliceState = {
  imagenes: Imagen[];
  imagenASubir: any;
  todasImagenes: InformacionDeFotos | null;
}

const initialState: FotoSliceState = {
  imagenes: [] as Imagen[],
  imagenASubir: null,
  todasImagenes: null,
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
    setTodasImagenes: (state, action: PayloadAction<InformacionDeFotos>) => {
      state.todasImagenes = action.payload;
    },
  },
});

export const { setFotos, setImagenASubir, setTodasImagenes } = fotosSlice.actions;
export default fotosSlice.reducer;
