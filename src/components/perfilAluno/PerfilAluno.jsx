import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import AlunoService from "../../services/AlunoService";
import DisciplinaService from "../../services/DisciplinaService";
import Header from "../shared/header/Header";
import PageHeader from "../shared/pageHeader/PageHeader";

import "./PerfilAluno.css";

import { toast } from "react-toastify";

const PerfilAluno = (props) => {
  const { register, handleSubmit, control, setValue } = useForm();
  const [aluno, setAluno] = useState();
  const [disciplinasInteresse, setDisciplinasInteresse] = useState([]);
  const [disciplinasCadastradas, setDisciplinasCadastradas] =
    useState(undefined);
  const [contadorLetrasSobre, setContadorLetrasSobre] = useState(0);

  useEffect(() => {
    AlunoService.buscarAluno()
      .then((response) => {
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
        response.map((disciplina) =>
          options.push({ value: disciplina.id, label: disciplina.nome })
        );

        setDisciplinasInteresse(options);
      })
      .catch((error) => {
        console.log("NovoTemaModal.js listarDisciplinasPorCurso ", error);
      });
  }, [setValue]);

  const onSubmit = (event) => {
    // console.log(JSON.stringify(event));
    let alunoEditado = { ...aluno };
    Object.keys(event).map((key) => (alunoEditado[key] = event[key]));
    AlunoService.editarAluno(alunoEditado)
      .then((response) => {
        toast.success("Perfil editado com sucesso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Erro ao editar perfil!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("PerfilAluno erro");
      });
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
              <input className="form-control" {...register("nome")} />
            </div>
            <div className="form-group mb-2">
              <label>E-mail *</label>
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
                placeholder="Digite uma descrição sobre você"
              />
              <div className="d-flex justify-content-end">
                <label>{contadorLetrasSobre}/2000</label>
              </div>
            </div>
            <div className="form-group mb-2">
              <label>Whatsapp</label>
              <input
                className="form-control"
                {...register("whatsapp")}
                placeholder="Digite seu número de Whatsapp com DDD"
              />
            </div>
            <div className="form-group mb-2">
              <label>Facebook</label>
              <input
                className="form-control"
                {...register("facebook")}
                placeholder="Digite o nome do seu perfil do Facebook"
              />
            </div>
            <div className="form-group mb-2">
              <label>Linkedin</label>
              <input
                className="form-control"
                {...register("linkedin")}
                placeholder="Digite o nome do seu perfil no Linkedin"
              />
            </div>
            <div className="form-group mb-2">
              <label>Instagram</label>
              <input
                className="form-control"
                {...register("instagram")}
                placeholder="Digite o nome do seu perfil no Instagram"
              />
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
            <h5
              className="mb-2 mt-2"
              style={{ color: "var(--st-fontePageHeader)" }}
            >
              Alterar senha
            </h5>
            <div className="form-group mb-2 d-flex justify-content-between">
              <div style={{ width: "48%" }}>
                <label>Senha atual</label>
                <input
                  className="form-control"
                  {...register("senhaAtual")}
                  placeholder="Digite sua senha atual"
                  type="password"
                />
              </div>
              <div style={{ width: "48%" }}>
                <label>Nova senha</label>
                <input
                  className="form-control"
                  {...register("senhaNova")}
                  placeholder="Digite sua nova senha"
                  type="password"
                />
              </div>
            </div>
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

export default PerfilAluno;
