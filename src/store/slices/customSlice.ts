import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Custom} from '../../types/types';

const initialState: Custom = {
  showModal: false,
  categoriaActual: 'PreCC_croquisE1',
};

export const customSlice = createSlice({
  name: 'custom',
  initialState: initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setCategoriaActual: (state, action: PayloadAction<string>) => {
      state.categoriaActual = action.payload;
    },
  },
});

export const {setShowModal, setCategoriaActual} = customSlice.actions;
export default customSlice.reducer;
