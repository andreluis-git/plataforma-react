import { createSlice } from "@reduxjs/toolkit";

export const editarCursoSlice = createSlice({
  name: "editarCurso",
  initialState: { curso: null },
  reducers: {
    rxSetCursoEdicao: (state, action) => {
      state.curso = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rxSetCursoEdicao } = editarCursoSlice.actions;

export default editarCursoSlice.reducer;
