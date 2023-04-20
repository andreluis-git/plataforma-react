import { createSlice } from "@reduxjs/toolkit";

export const listaTemasSlice = createSlice({
  name: "listaTemas",
  initialState: { temas: [] },
  reducers: {
    rxSetListaTemas: (state, action) => {
      state.temas = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rxSetListaTemas } = listaTemasSlice.actions;

export default listaTemasSlice.reducer;
