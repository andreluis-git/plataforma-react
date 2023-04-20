import { configureStore } from "@reduxjs/toolkit";
import editarTemaSlice from "./slices/editarTemaSlice";
import showNovoTemaModalSlice from "./slices/showNovoTemaModalSlice";
import listaTemasSlice from "./slices/listaTemasSlice";

export default configureStore({
  reducer: {
    editarTema: editarTemaSlice,
    showNovoTemaModal: showNovoTemaModalSlice,
    listaTemas: listaTemasSlice,
  },
});
