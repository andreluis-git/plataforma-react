import { createSlice } from "@reduxjs/toolkit";

export const editarAlunoInstituicaoSlice = createSlice({
  name: "editarAluno",
  initialState: { aluno: null },
  reducers: {
    rxSetEditarAlunoInstituicao: (state, action) => {
      state.aluno = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rxSetEditarAlunoInstituicao } =
  editarAlunoInstituicaoSlice.actions;

export default editarAlunoInstituicaoSlice.reducer;
