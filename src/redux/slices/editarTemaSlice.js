import { createSlice } from "@reduxjs/toolkit";

export const editarTemaSlice = createSlice({
  name: "editarTema",
  initialState: { tema: null },
  reducers: {
    rxSetTemaEdicao: (state, action) => {
      state.tema = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rxSetTemaEdicao } = editarTemaSlice.actions;

export default editarTemaSlice.reducer;
