import { createSlice } from "@reduxjs/toolkit";

export const editarDisciplinaSlice = createSlice({
  name: "editarDisciplina",
  initialState: { disciplina: null },
  reducers: {
    rxSetDisciplinaEdicao: (state, action) => {
      state.disciplina = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rxSetDisciplinaEdicao } = editarDisciplinaSlice.actions;

export default editarDisciplinaSlice.reducer;
