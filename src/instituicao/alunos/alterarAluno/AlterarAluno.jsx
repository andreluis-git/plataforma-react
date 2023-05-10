import React, { useEffect, useState } from "react";
import InstNavBar from "../../navBar/InstNavBar";
import PageHeader from "../../../components/shared/pageHeader/PageHeader";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AlunoService from "../../../services/AlunoService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CursoService from "../../../services/CursoService";

const AlterarAluno = (props) => {
  const { register, handleSubmit, setValue } = useForm();

  const aluno = useSelector((state) => state.editarAlunoInstituicao.aluno);
  const [cursosOptions, setCursosOptions] = useState();
  const [cursoSelected, setCursoSelected] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    listarCursosPorInstituicao();
    console.log();
  }, []);

  const listarCursosPorInstituicao = () => {
    CursoService.listarCursosPorInstituicao()
      .then((response) => {
        let cursos = [];
        response.forEach((curso) => {
          cursos.push({ value: curso.id, nome: curso.nome });

          if (curso.id === aluno.cursoAluno.id) {
            setCursoSelected({ value: curso.id, nome: curso.nome });
          }
          setCursosOptions(cursos);
        });
      })
      .catch((error) => console.log("Erro ao listar curso InstCursos.jsx"));
  };

  const onSubmit = (event) => {
    let alunoEditado = { ...aluno };
    event.cursoAluno = {
      id: event.cursoAluno.value ? event.cursoAluno.value : event.cursoAluno,
    };
    Object.keys(event).map((key) => (alunoEditado[key] = event[key]));
    AlunoService.editarAlunoInstituicao(alunoEditado)
      .then((response) => {
        toast.success("Aluno alterado com sucesso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/instAlunos");
      })
      .catch((error) => {
        toast.error("Erro ao editar aluno!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    console.log(alunoEditado);
  };

  // const cursos = [
  //   { value: 3, nome: "ADM" },
  //   { value: 2, nome: "LOG" },
  //   { value: 1, nome: "ADS" },
  //   { value: 4, nome: "COMEX" },
  // ];

  useEffect(() => {
    console.log(aluno);
    setValue("nome", aluno.nome);
    setValue("cursoAluno", {
      value: aluno.cursoAluno.id,
      nome: aluno.cursoAluno.nome,
    });
    setValue("email", aluno.email);
  }, [aluno, setValue]);

  return (
    <>
      <InstNavBar />
      <div className="tema-header">
        <PageHeader pagina={aluno ? "Editar aluno" : "Cadastrar aluno"} />
      </div>
      <div className="page-body container mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-2">
            <label>Nome aluno</label>
            <input
              className="form-control"
              placeholder="Digite o nome do aluno"
              {...register("nome")}
              defaultValue={aluno ? aluno.nome : ""}
              disabled
            />
          </div>
          <div className="form-group mb-2">
            <label>E-mail aluno*</label>
            <input
              className="form-control"
              {...register("email")}
              defaultValue={aluno ? aluno.email : ""}
              placeholder="Digite o e-mail do aluno"
            />
          </div>
          <label>Curso aluno</label>
          <select
            className="form-control"
            {...register("cursoAluno")}
            defaultValue={cursoSelected}
          >
            {cursosOptions &&
              cursosOptions.map((curso, idx) => (
                <option value={curso.value} key={idx}>
                  {curso.nome}
                </option>
              ))}
          </select>
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
    </>
  );
};

export default AlterarAluno;
