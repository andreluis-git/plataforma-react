import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { rxSetDisciplinaEdicao } from "../../../../redux/slices/editarDisciplinaSlice";
import { rxSetShowModalConfirmacao } from "../../../../redux/slices/showModalConfirmacaoSlice";
import { rxSetShowDisciplinaModal } from "../../../../redux/slices/showDisciplinaModalslice";
import DisciplinaService from "../../../../services/DisciplinaService";
import "./InstDisciplinaModal.css";
import { toast } from "react-toastify";

const InstDisciplinaModal = (props) => {
  const { curso, setDisciplinaDeletar, buscarDisciplinas } = props;

  const editarDisciplina = useSelector(
    (state) => state.editarDisciplina.disciplina
  );

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = (event) => {
    if (!editarDisciplina && curso) {
      event = { cursoDisciplina: { id: curso.id }, ...event };
      DisciplinaService.cadastrarDisciplina(event)
        .then((response) => {
          dispatch(rxSetShowDisciplinaModal(false));
          buscarDisciplinas();
          toast.success("Disciplina cadastrada com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar disciplina!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(
            "Erro ao cadastrar disciplina InstDisciplinaModal.jsx",
            error
          );
        });
    } else {
      let disciplinaEditada = { ...editarDisciplina };
      Object.keys(event).map((key) => (disciplinaEditada[key] = event[key]));
      DisciplinaService.editarDisciplina(disciplinaEditada)
        .then((response) => {
          dispatch(rxSetShowDisciplinaModal(false));
          buscarDisciplinas();
          toast.success("Disciplina editada com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error("Erro ao editar disciplina!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(
            "Erro ao editar disciplina InstDisciplinaModal.jsx",
            error
          );
        });
    }
  };

  return (
    <>
      <div
        className={`modal fade show`}
        role="dialog"
        style={{ display: "block" }}
        onClick={() => {
          dispatch(rxSetDisciplinaEdicao(null));
          dispatch(rxSetShowDisciplinaModal(false));
        }}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          //   role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {!editarDisciplina ? "Nova disciplina" : "Editar disciplina"}
              </h5>
              <div
                className="card-icons"
                onClick={() => {
                  dispatch(rxSetDisciplinaEdicao(null));
                  dispatch(rxSetShowDisciplinaModal(false));
                }}
              >
                <CloseIcon className="m-2" />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="form-group mb-2">
                  <label>Nome*</label>
                  <input
                    className="form-control"
                    {...register("nome")}
                    defaultValue={editarDisciplina ? editarDisciplina.nome : ""}
                    placeholder="Digite o nome da disciplina"
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Sigla*</label>
                  <input
                    className="form-control"
                    {...register("sigla")}
                    defaultValue={
                      editarDisciplina ? editarDisciplina.sigla : ""
                    }
                    placeholder="Digite a sigla da disciplina"
                  />
                </div>
              </div>
              <div className="modal-footer">
                {editarDisciplina && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setDisciplinaDeletar(editarDisciplina);
                      dispatch(rxSetDisciplinaEdicao(null));
                      dispatch(rxSetShowDisciplinaModal(false));
                      dispatch(rxSetShowModalConfirmacao(true));
                    }}
                  >
                    Excluir
                  </button>
                )}
                <button type="submit" className="btn btn-site">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade show`}></div>
    </>
  );
};

export default InstDisciplinaModal;
