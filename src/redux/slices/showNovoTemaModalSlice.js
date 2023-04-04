import { createSlice } from "@reduxjs/toolkit";

export const showNovoTemaModalSlice = createSlice({
  name: "showNovoTemaModal",
  initialState: { showModal: false },
  reducers: {
    rxSetShowNovoTemaModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rxSetShowNovoTemaModal } = showNovoTemaModalSlice.actions;

export default showNovoTemaModalSlice.reducer;
