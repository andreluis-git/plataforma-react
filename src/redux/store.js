import { configureStore } from "@reduxjs/toolkit";
import editarDisciplinaSlice from "./slices/editarDisciplinaSlice";
import editarTemaSlice from "./slices/editarTemaSlice";
import listaTemasSlice from "./slices/listaTemasSlice";
import showDisciplinaModalslice from "./slices/showDisciplinaModalslice";
import showModalConfirmacaoSlice from "./slices/showModalConfirmacaoSlice";
import showNovoTemaModalSlice from "./slices/showNovoTemaModalSlice";
import editarCursoSlice from "./slices/editarCursoSlice";
import editarAlunoInstituicaoSlice from "./slices/editarAlunoInstituicaoSlice";

export default configureStore({
  reducer: {
    editarTema: editarTemaSlice,
    showNovoTemaModal: showNovoTemaModalSlice,
    listaTemas: listaTemasSlice,
    showModalConfirmacao: showModalConfirmacaoSlice,
    showDisciplinaModal: showDisciplinaModalslice,
    editarDisciplina: editarDisciplinaSlice,
    editarCurso: editarCursoSlice,
    editarAlunoInstituicao: editarAlunoInstituicaoSlice,
  },
});
