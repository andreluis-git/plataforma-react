import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { rxSetShowNovoTemaModal } from "../../redux/slices/showNovoTemaModalSlice";
import DisciplinaService from "../../services/DisciplinaService";
import "./NovoTemaModal.css";

// ADICIONAR BOTÃO PARA DAR LIKE NOS TEMAS QUE GOSTA
const NovoTemaModal = (props) => {
  const [disciplinasInteresse, setDisciplinasInteresse] = useState([]);
  const [disciplinasCadastradas, setDisciplinasCadastradas] = useState([]);
  const editarTema = useSelector((state) => state.editarTema.tema);
  const dispatch = useDispatch();

  const { register, handleSubmit, control } = useForm();

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

      setDisciplinasCadastradas(options);
    }
  }, [editarTema]);

  const onSubmit = (event) => {
    console.log(JSON.stringify(event));
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
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Descrição</label>
                  <textarea
                    className="form-control"
                    defaultValue={editarTema ? editarTema.descricao : ""}
                    {...register("descricao")}
                    rows="10"
                  />
                </div>
                <label>Temas Interesse</label>
                <Controller
                  name="disciplinas"
                  control={control}
                  value={disciplinasCadastradas}
                  render={({ field }) => {
                    return (
                      <Select
                        isMulti
                        options={disciplinasInteresse}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={true}
                        allowSelectAll={true}
                        {...field}
                        value={field.value || disciplinasCadastradas}
                      />
                    );
                  }}
                />
              </div>
              <div className="modal-footer">
                {editarTema && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      dispatch(rxSetShowNovoTemaModal(false));
                    }}
                  >
                    Close
                  </button>
                )}
                <button type="submit" className="btn btn-dark">
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
