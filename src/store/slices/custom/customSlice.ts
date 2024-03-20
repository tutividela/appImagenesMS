import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Custom = {
  showModal: boolean;
  cargando: boolean;
  categoriaActual: string;
};

const initialState: Custom = {
  showModal: false,
  cargando: true,
  categoriaActual: 'PreCC_croquisE1',
};

export const customSlice = createSlice({
  name: 'custom',
  initialState: initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setCargando: (state, action: PayloadAction<boolean>) => {
      state.cargando = action.payload;
    },
    setCategoriaActual: (state, action: PayloadAction<string>) => {
      state.categoriaActual = action.payload;
    },
  },
});

export const { setShowModal, setCategoriaActual, setCargando } =
  customSlice.actions;
export default customSlice.reducer;
