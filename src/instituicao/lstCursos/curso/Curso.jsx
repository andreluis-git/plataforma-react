import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import "./Curso.css";
import InstNavBar from "../../navBar/InstNavBar";
import InstPageHeader from "../../pageHeader/InstPageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DisciplinaService from "../../../services/DisciplinaService";
import { rxSetShowDisciplinaModal } from "../../../redux/slices/showDisciplinaModalslice";
import { rxSetDisciplinaEdicao } from "../../../redux/slices/editarDisciplinaSlice";
import InstDisciplinaModal from "./modais/InstDisciplinaModal";
import ModalConfirmacao from "../../../components/shared/modalConfirmacao/ModalConfirmacao";
import { rxSetShowModalConfirmacao } from "../../../redux/slices/showModalConfirmacaoSlice";
import CursoService from "../../../services/CursoService";
import { rxSetCursoEdicao } from "../../../redux/slices/editarCursoSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Curso = () => {
  const [disciplinas, setDisciplinas] = useState();
  const [disciplinaDeletar, setDisciplinaDeletar] = useState();

  const idTemaEdicao = window.location.pathname.includes("editarCurso")
    ? window.location.pathname.split("/").pop()
    : null;

  const curso = useSelector((state) => state.editarCurso.curso);

  const showModalDisciplina = useSelector(
    (state) => state.showDisciplinaModal.showModal
  );

  const showModalConfirmacao = useSelector(
    (state) => state.showModalConfirmacao.showModal
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (curso) {
      buscarDisciplinas(idTemaEdicao);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buscarDisciplinas = (id = idTemaEdicao) => {
    DisciplinaService.listarDisciplinasPorCursoId(id)
      .then((response) => {
        setDisciplinas(response);
      })
      .catch((error) =>
        console.log("Erro ao buscar disciplinas Curso.jsx", error)
      );
  };

  const buscarDisciplinaPorNome = (event) => {
    event.preventDefault();
    const nome = document.getElementById("buscarNome").value;
    DisciplinaService.listarDisciplinasCursoPorNome(idTemaEdicao, nome)
      .then((response) => {
        setDisciplinas(response);
      })
      .catch((error) =>
        console.log("ERRO AO BUSCAR DISCIPLINA POR NOME", error)
      );
  };

  const editarCurso = (event) => {
    if (!curso) {
      CursoService.cadastrarCurso(event)
        .then((response) => {
          dispatch(rxSetCursoEdicao(response));
          navigate(
            `/${window.location.pathname.split("/")[1]}/editarCurso/` +
              response.id
          );
          toast.success("Curso cadastrado com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar curso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("Erro ao cadastrar curso curso.jsx", error);
        });
    } else {
      let cursoEditado = { ...curso };
      Object.keys(event).map((key) => (cursoEditado[key] = event[key]));
      CursoService.editarCurso(cursoEditado)
        .then((response) => {
          dispatch(rxSetCursoEdicao(cursoEditado));
          buscarDisciplinas(idTemaEdicao);
          toast.success("Curso editado com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error("Erro ao editar curso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("Erro ao editar curso curso.jsx", error);
        });
    }
  };

  const deletarDisciplina = () => {
    DisciplinaService.deletarDisciplina(disciplinaDeletar.id)
      .then((response) => {
        buscarDisciplinas(idTemaEdicao);
        toast.success("Disciplina deletada com sucesso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Erro ao deletar disciplina!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("ERRO AO DELETAR DISCIPLINA CURSO.JSX", error);
      });
  };

  return (
    <>
      <InstNavBar />
      <div className="instituicao-header">
        <InstPageHeader
          pagina={
            window.location.pathname.includes("novoCurso")
              ? "Cadastrar curso"
              : "Editar curso"
          }
        />
      </div>
      <div className="instituicao-body container pt-3">
        <form onSubmit={handleSubmit(editarCurso)}>
          <div className="form-group mb-2">
            <label>Nome*</label>
            <input
              className="form-control"
              {...register("nome")}
              defaultValue={curso ? curso.nome : ""}
              placeholder="Digite o nome do curso"
            />
          </div>
          <div className="form-group mb-2">
            <label>Sigla*</label>
            <input
              className="form-control"
              {...register("sigla")}
              defaultValue={curso ? curso.sigla : ""}
              placeholder="Digite a sigla do curso"
            />
          </div>
          <div className="d-flex justify-content-end mb-2">
            <button type="submit" className="btn btn-site">
              Salvar
            </button>
          </div>
        </form>
        {curso && (
          <>
            <label>Disciplinas curso</label>
            <div className="d-flex justify-content-between">
              <form
                onChange={buscarDisciplinaPorNome}
                onSubmit={buscarDisciplinaPorNome}
                style={{ width: "70%" }}
              >
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o nome da disciplina"
                    id="buscarNome"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-icon" type="submit">
                      <SearchIcon />
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-end"></div>
              </form>
              <button
                className="btn btn-site"
                onClick={() => {
                  dispatch(rxSetShowDisciplinaModal(true));
                }}
              >
                Nova disciplina
              </button>
            </div>
            <ul className="list-group lst-group-curso mt-3">
              {disciplinas &&
                disciplinas.map((disciplina, idx) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={idx}
                  >
                    <span>{disciplina.nome}</span>
                    <div>
                      <button
                        className="btn btn-site m-2 mt-0 mb-0"
                        onClick={() => {
                          dispatch(rxSetDisciplinaEdicao(disciplina));
                          dispatch(rxSetShowDisciplinaModal(true));
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setDisciplinaDeletar(disciplina);
                          dispatch(rxSetShowModalConfirmacao(true));
                        }}
                      >
                        Deletar
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
      {showModalDisciplina && (
        <InstDisciplinaModal
          curso={curso}
          buscarDisciplinas={buscarDisciplinas}
          setDisciplinaDeletar={setDisciplinaDeletar}
        />
      )}
      {showModalConfirmacao && (
        <ModalConfirmacao
          titulo="Excluir disciplina"
          descricao="Deseja realmente excluir a disciplina selecionada?"
          confirmar={deletarDisciplina}
        />
      )}
    </>
  );
};

export default Curso;
