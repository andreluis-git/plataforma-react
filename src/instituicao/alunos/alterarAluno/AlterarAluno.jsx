import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import PageHeader from "../../../components/shared/pageHeader/PageHeader";
import AlunoService from "../../../services/AlunoService";
import CursoService from "../../../services/CursoService";
import InstNavBar from "../../navBar/InstNavBar";

const AlterarAluno = (props) => {
  const { register, handleSubmit, control, setValue } = useForm();

  const [aluno, setAluno] = useState();
  const [cursosOptions, setCursosOptions] = useState();
  const [cursoSelected, setCursoSelected] = useState();

  const navigate = useNavigate();

  const buscarCursosInstituicao = useCallback(() => {
    CursoService.listarCursosPorInstituicao()
      .then((response) => {
        let cursos = [];
        response.forEach((curso) => {
          cursos.push({ value: curso.id, label: curso.nome });

          if (curso.id === aluno?.cursoAluno.id) {
            setCursoSelected({ value: curso.id, label: curso.nome });
            setValue("cursoAluno", { value: curso.id, label: curso.nome });
          }
        });
        setCursosOptions(cursos);
      })
      .catch((error) =>
        console.log("Erro ao listar curso InstCursos.jsx", error)
      );
  }, [aluno, setValue]);

  useEffect(() => {
    if (aluno) {
      buscarCursosInstituicao();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aluno]);

  useEffect(() => {
    if (window.location.pathname.includes("alterarAluno")) {
      AlunoService.buscarAlunoPorId(window.location.pathname.split("/").pop())
        .then((response) => {
          setAluno(response);
          setValue("nome", response.nome);
          setValue("email", response.email);
        })
        .catch((error) => console.log("Erro ao buscar aluno por id", error));
    } else {
      buscarCursosInstituicao();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (event) => {
    if (window.location.pathname.includes("alterarAluno")) {
      let alunoEditado = { ...aluno };
      event.cursoAluno = {
        id: event.cursoAluno.value,
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
    } else {
      event.cursoAluno = { id: event.cursoAluno.value };
      AlunoService.cadastrarAluno(event)
        .then((response) => {
          toast.success("Aluno cadastrado com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/instAlunos");
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar aluno!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const alterarStatusAluno = (alunoId) => {
    AlunoService.alterarStatusAluno(alunoId)
      .then((response) => {
        toast.success("Sucesso ao alterar status do aluno!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        setAluno({ ...aluno, ativo: !aluno.ativo });
      })
      .catch((error) => {
        toast.error("Erro ao alterar status do aluno!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <InstNavBar />
      <div className="tema-header">
        <PageHeader pagina={aluno ? "Editar aluno" : "Cadastrar aluno"} />
      </div>
      <div className="page-body container mt-3">
        {window.location.pathname.includes("alterarAluno") && aluno && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-site mt-2"
              onClick={() => {
                alterarStatusAluno(aluno.id);
              }}
            >
              {aluno.ativo ? "Desativar aluno" : "Ativar aluno"}
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-2">
            <label>Nome aluno</label>
            <input
              className="form-control"
              placeholder="Digite o nome do aluno"
              {...register("nome")}
              defaultValue={aluno ? aluno.nome : ""}
              disabled={
                window.location.pathname.includes("alterarAluno") ? true : false
              }
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
          {cursosOptions && <label>Curso aluno</label>}
          {cursosOptions && (
            <Controller
              name="cursoAluno"
              control={control}
              render={({ field }) => (
                <Select
                  options={cursosOptions}
                  closeMenuOnSelect={true}
                  hideSelectedOptions={true}
                  allowSelectAll={true}
                  {...field}
                  value={field.value || cursoSelected}
                />
              )}
            />
          )}
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
