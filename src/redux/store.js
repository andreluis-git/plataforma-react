import { configureStore } from "@reduxjs/toolkit";
import editarCursoSlice from "./slices/editarCursoSlice";
import editarDisciplinaSlice from "./slices/editarDisciplinaSlice";
import editarTemaSlice from "./slices/editarTemaSlice";
import listaTemasSlice from "./slices/listaTemasSlice";
import showDisciplinaModalslice from "./slices/showDisciplinaModalslice";
import showModalConfirmacaoSlice from "./slices/showModalConfirmacaoSlice";
import showNovoTemaModalSlice from "./slices/showNovoTemaModalSlice";

export default configureStore({
  reducer: {
    editarTema: editarTemaSlice,
    showNovoTemaModal: showNovoTemaModalSlice,
    listaTemas: listaTemasSlice,
    showModalConfirmacao: showModalConfirmacaoSlice,
    showDisciplinaModal: showDisciplinaModalslice,
    editarDisciplina: editarDisciplinaSlice,
    editarCurso: editarCursoSlice,
  },
});
