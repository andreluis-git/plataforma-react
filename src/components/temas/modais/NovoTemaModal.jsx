import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { rxSetListaTemas } from "../../../redux/slices/listaTemasSlice";
import { rxSetShowModalConfirmacao } from "../../../redux/slices/showModalConfirmacaoSlice";
import { rxSetShowNovoTemaModal } from "../../../redux/slices/showNovoTemaModalSlice";
import DisciplinaService from "../../../services/DisciplinaService";
import TemaService from "../../../services/TemaService";
import "./NovoTemaModal.css";
import { toast } from "react-toastify";

// ADICIONAR BOTÃO PARA DAR LIKE NOS TEMAS QUE GOSTA
const NovoTemaModal = (props) => {
  const [disciplinasInteresse, setDisciplinasInteresse] = useState([]);
  const [disciplinasCadastradas, setDisciplinasCadastradas] =
    useState(undefined);
  const editarTema = useSelector((state) => state.editarTema.tema);

  const dispatch = useDispatch();

  const { register, handleSubmit, control, setValue } = useForm();

  const buscarTemasLista = (pagina) => {
    TemaService.buscarTemaPorPagina(pagina).then((response) => {
      dispatch(rxSetListaTemas(response));
    });
  };

  useEffect(() => {
    DisciplinaService.listarDisciplinasPorCurso()
      .then((response) => {
        let options = [];
        response.map((disciplina) =>
          options.push({ value: disciplina.id, label: disciplina.nome })
        );

        setDisciplinasInteresse(options);
      })
      .catch((error) =>
        console.log("NovoTemaModal.js listarDisciplinasPorCurso ", error)
      );

    if (editarTema) {
      let options = [];
      editarTema.disciplinasRelacionadas.map((disciplina) =>
        options.push({ value: disciplina.id, label: disciplina.nome })
      );

      setValue("disciplinasRelacionadas", options);
      setDisciplinasCadastradas(options);
    }
  }, [editarTema, setValue]);

  const onSubmit = (event) => {
    if (!editarTema) {
      event.disciplinasRelacionadas = event.disciplinasRelacionadas
        ? event.disciplinasRelacionadas
        : [];
      TemaService.cadastrarTema(event)
        .then((response) => {
          dispatch(rxSetShowNovoTemaModal(false));
          buscarTemasLista(window.location.pathname.replace("/", ""));
          toast.success("Tema cadastrado com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar tema!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      let temaEditado = { ...editarTema };
      Object.keys(event).map((key) => (temaEditado[key] = event[key]));
      TemaService.editarTema(temaEditado)
        .then((response) => {
          dispatch(rxSetShowNovoTemaModal(false));
          buscarTemasLista(window.location.pathname.replace("/", ""));
          toast.success("Tema editado com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error("Erro ao editar tema!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
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
          dispatch(rxSetShowNovoTemaModal(false));
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
                {!editarTema ? "Novo Tema" : "Editar Tema"}
              </h5>
              <div
                className="card-icons"
                onClick={() => {
                  dispatch(rxSetShowNovoTemaModal(false));
                }}
              >
                <CloseIcon className="m-2" />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="form-group mb-2">
                  <label>Titulo</label>
                  <input
                    className="form-control"
                    {...register("titulo")}
                    defaultValue={editarTema ? editarTema.titulo : ""}
                    placeholder="Digite um título para o tema"
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Descrição</label>
                  <textarea
                    className="form-control"
                    defaultValue={editarTema ? editarTema.descricao : ""}
                    {...register("descricao")}
                    rows="10"
                    placeholder="Digite uma descrição para o tema"
                  />
                </div>
                <label>Temas Interesse</label>
                <Controller
                  name="disciplinasRelacionadas"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti
                      options={disciplinasInteresse}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={true}
                      allowSelectAll={true}
                      {...field}
                      value={field.value || disciplinasCadastradas}
                    />
                  )}
                />
              </div>
              <div className="modal-footer">
                {editarTema && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      dispatch(rxSetShowNovoTemaModal(false));
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

export default NovoTemaModal;
