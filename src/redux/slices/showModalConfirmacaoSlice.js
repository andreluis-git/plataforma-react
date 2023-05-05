import { createSlice } from "@reduxjs/toolkit";

export const showModalConfirmacaoSlice = createSlice({
  name: "showModalConfirmacao",
  initialState: {
    showModal: false,
  },
  reducers: {
    rxSetShowModalConfirmacao: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rxSetShowModalConfirmacao } = showModalConfirmacaoSlice.actions;

export default showModalConfirmacaoSlice.reducer;
