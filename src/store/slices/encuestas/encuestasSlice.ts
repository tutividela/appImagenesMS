import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Encuesta } from '../../../types/types';

type CustomSliceState = {
  encuestas: Encuesta[];
}

const initialState: CustomSliceState = {
  encuestas: [] as Encuesta[],
};

export const encuestasSlice = createSlice({
  name: 'encuestas',
  initialState: initialState,
  reducers: {
    setEncuestas: (state, action: PayloadAction<Encuesta[]>) => {
      state.encuestas = action.payload;
    },
  },
});

export const { setEncuestas } = encuestasSlice.actions;
export default encuestasSlice.reducer;
