import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import AlunoService from "../../services/AlunoService";
import DisciplinaService from "../../services/DisciplinaService";
import Header from "../shared/header/Header";
import PageHeader from "../shared/pageHeader/PageHeader";

import "./Perfil.css";

const Perfil = (props) => {
  const { register, handleSubmit, control, setValue } = useForm();
  const [aluno, setAluno] = useState();
  const [disciplinasInteresse, setDisciplinasInteresse] = useState([]);
  const [disciplinasCadastradas, setDisciplinasCadastradas] =
    useState(undefined);
  const [contadorLetrasSobre, setContadorLetrasSobre] = useState(0);

  useEffect(() => {
    AlunoService.buscarAluno()
      .then((response) => {
        console.log("Aluno", response);
        setAluno(response);
        let options = [];
        response.disciplinasInteresse.map((disciplina) =>
          options.push({ value: disciplina.id, label: disciplina.nome })
        );

        setValue("id", response.id);
        setValue("nome", response.nome);
        setValue("email", response.email);
        setValue("cursoAluno", response.cursoAluno);
        setValue("disciplinasInteresse", options);
        setValue("whatsapp", response.whatsapp || "");
        setValue("facebook", response.facebook || "");
        setValue("linkedin", response.linkedin || "");
        setValue("instagram", response.instagram || "");
        setValue("sobre", response.sobre || "");
        setDisciplinasCadastradas(options);
      })
      .catch((error) => console.log("Perfil.js buscarAluno ", error));

    DisciplinaService.listarDisciplinasPorCurso()
      .then((response) => {
        let options = [];
        // console.log("disciplina", response);
        response.map((disciplina) =>
          options.push({ value: disciplina.id, label: disciplina.nome })
        );

        setDisciplinasInteresse(options);
      })
      .catch((error) =>
        console.log("NovoTemaModal.js listarDisciplinasPorCurso ", error)
      );
  }, [setValue]);

  const onSubmit = (event) => {
    // console.log(JSON.stringify(event));
    let alunoEditado = { ...aluno };
    Object.keys(event).map((key) => (alunoEditado[key] = event[key]));
    AlunoService.editarAluno(alunoEditado).then().catch();
  };

  return (
    <>
      <Header />
      <div className="tema-header">
        <PageHeader pagina={"Perfil"} />
      </div>
      {aluno && (
        <div className="page-body container mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
              <label>Nome Completo</label>
              <input className="form-control" {...register("nome")} disabled />
            </div>
            <div className="form-group mb-2">
              <label>Email *</label>
              <input className="form-control" {...register("email")} disabled />
            </div>
            <div className="form-group mb-2">
              <label>Curso*</label>
              <input
                className="form-control"
                // {...register("cursoAluno")}
                defaultValue={aluno.cursoAluno.nome}
                disabled
              />
            </div>
            <div className="form-group mb-2">
              <label>Sobre</label>
              <textarea
                className="form-control"
                {...register("sobre")}
                rows="5"
                maxLength={2000}
                onChange={(e) => setContadorLetrasSobre(e.target.value.length)}
              />
              <div className="d-flex justify-content-end">
                <label>{contadorLetrasSobre}/2000</label>
              </div>
            </div>
            <div className="form-group mb-2">
              <label>Whatsapp</label>
              <input className="form-control" {...register("whatsapp")} />
            </div>
            <div className="form-group mb-2">
              <label>Facebook</label>
              <input className="form-control" {...register("facebook")} />
            </div>
            <div className="form-group mb-2">
              <label>Linkedin</label>
              <input className="form-control" {...register("linkedin")} />
            </div>
            <div className="form-group mb-2">
              <label>Instagram</label>
              <input className="form-control" {...register("instagram")} />
            </div>
            <label>Temas Interesse</label>
            <Controller
              name="disciplinasInteresse"
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
                  menuPlacement="top"
                />
              )}
            />
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-site mt-2 mb-2"
                style={{ minWidth: "110px" }}
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Perfil;
