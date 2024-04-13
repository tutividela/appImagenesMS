import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Imagen, InformacionDeFotos } from '../../../types/types';

type FotoSliceState = {
  imagenes: Imagen[];
  imagenASubir: any;
  todasImagenesDeEncuesta: InformacionDeFotos | null;
  todasImagenesDeTodasEncuesta: InformacionDeFotos[] | null;
}

const initialState: FotoSliceState = {
  imagenes: [] as Imagen[],
  imagenASubir: null,
  todasImagenesDeEncuesta: null,
  todasImagenesDeTodasEncuesta: null,
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
    setTodasImagenesDeEncuesta: (state, action: PayloadAction<InformacionDeFotos>) => {
      state.todasImagenesDeEncuesta = action.payload;
    },
    setTodasImagenesDeTodasEncuesta: (state, action: PayloadAction<InformacionDeFotos[]>) => {
      state.todasImagenesDeTodasEncuesta = action.payload;
    },
  },
});

export const { setFotos, setImagenASubir, setTodasImagenesDeEncuesta, setTodasImagenesDeTodasEncuesta } = fotosSlice.actions;
export default fotosSlice.reducer;
