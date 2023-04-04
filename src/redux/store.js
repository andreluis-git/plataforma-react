import { configureStore } from "@reduxjs/toolkit";
import editarTemaSlice from "./slices/editarTemaSlice";
import showNovoTemaModalSlice from "./slices/showNovoTemaModalSlice";

export default configureStore({
  reducer: {
    editarTema: editarTemaSlice,
    showNovoTemaModal: showNovoTemaModalSlice,
  },
});
