import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  encuestas: [],
};

export const encuestasSlice = createSlice({
  name: 'encuestas',
  initialState: initialState,
  reducers: {
    setEncuestas: (state, action: PayloadAction<any>) => {
      state.encuestas = action.payload;
    },
  },
});

export const { setEncuestas } = encuestasSlice.actions;
export default encuestasSlice.reducer;
