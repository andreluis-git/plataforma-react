import { createSlice } from "@reduxjs/toolkit";

export const showModalDisciplinaSlice = createSlice({
  name: "showDisciplinaModal",
  initialState: { showModal: false },
  reducers: {
    rxSetShowDisciplinaModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rxSetShowDisciplinaModal } = showModalDisciplinaSlice.actions;

export default showModalDisciplinaSlice.reducer;
