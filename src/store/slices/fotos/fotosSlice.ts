import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Imagen = {
  _id: string;
  imageName: string;
  latitude: string | null;
  longitude: string | null;
};

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
