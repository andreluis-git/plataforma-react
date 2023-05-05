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

  const { register, handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    buscarDisciplinas(idTemaEdicao);
  }, [showModalDisciplina]);

  const buscarDisciplinas = (id) => {
    DisciplinaService.listarDisciplinasPorCursoId(id)
      .then((response) => {
        setDisciplinas(response);
      })
      .catch((ex) => console.log("Erro ao buscar disciplinas Curso.jsx"));
  };

  const buscarDisciplinaPorNome = (event) => {
    event.preventDefault();
    const nome = document.getElementById("buscarNome").value;
    DisciplinaService.listarDisciplinasCursoPorNome(idTemaEdicao, nome)
      .then((response) => {
        setDisciplinas(response);
      })
      .catch((ex) => console.log("ERRO AO BUSCAR DISCIPLINA POR NOME"));
    console.log(document.getElementById("buscarNome").value);
  };

  const editarCurso = (event) => {
    if (!curso) {
      // TemaService.cadastrarTema(event)
      //   .then((response) => {
      //     dispatch(rxSetShowNovoTemaModal(false));
      //     buscarTemasLista(window.location.pathname.replace("/", ""));
      //   })
      //   .catch();
    } else {
      let cursoEditado = { ...curso };
      Object.keys(event).map((key) => (cursoEditado[key] = event[key]));
      CursoService.editarCurso(cursoEditado)
        .then((response) => {
          dispatch(rxSetCursoEdicao(cursoEditado));
        })
        .catch((error) => "Erro ao editar curso curso.jsx");
    }
  };

  const deletarDisciplina = () => {
    console.log(disciplinaDeletar);
    DisciplinaService.deletarDisciplina(disciplinaDeletar.id)
      .then((response) => {
        buscarDisciplinas(idTemaEdicao);
      })
      .catch((error) => console.log("ERRO AO DELETAR DISCIPLINA CURSO.JSX"));
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
            <label>Nome</label>
            <input
              className="form-control"
              {...register("nome")}
              defaultValue={curso ? curso.nome : ""}
            />
          </div>
          <div className="form-group mb-2">
            <label>Sigla</label>
            <input
              className="form-control"
              {...register("sigla")}
              defaultValue={curso ? curso.sigla : ""}
            />
          </div>
          <div className="d-flex justify-content-end mb-2">
            <button type="submit" className="btn btn-site">
              Salvar
            </button>
          </div>
        </form>
        <label>Disciplinas curso</label>

        <form
          onChange={buscarDisciplinaPorNome}
          onSubmit={buscarDisciplinaPorNome}
          className="w-100 mb-2 d-flex justify-content-between"
        >
          <div className="input-group" style={{ width: "70%" }}>
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
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-site"
              onClick={() => {
                dispatch(rxSetDisciplinaEdicao(null));
                dispatch(rxSetShowDisciplinaModal(true));
              }}
            >
              Nova disciplina
            </button>
          </div>
        </form>
        <ul className="list-group">
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
      </div>
      {showModalDisciplina && (
        <InstDisciplinaModal
          curso={curso}
          setDisciplinaDeletar={setDisciplinaDeletar}
        />
      )}
      {showModalConfirmacao && (
        <ModalConfirmacao
          titulo="Excluir disciplina"
          descricao="Deseja realmente excluir a disciplina selecionado?"
          confirmar={deletarDisciplina}
        />
      )}
    </>
  );
};

export default Curso;
