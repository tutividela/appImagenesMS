import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  encuestas: [],
  cargandoEncuestas: false,
};

export const encuestasSlice = createSlice({
  name: 'encuestas',
  initialState: initialState,
  reducers: {
    setEncuestas: (state, action: PayloadAction<any>) => {
      state.encuestas = action.payload;
    },
    setCargandoEncuestas: (state, action: PayloadAction<boolean>) => {
        state.cargandoEncuestas = action.payload;
      },
  },
});

export const {setEncuestas, setCargandoEncuestas} = encuestasSlice.actions;
export default encuestasSlice.reducer;
