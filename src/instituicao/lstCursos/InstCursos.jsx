import React, { useEffect, useState } from "react";
import InstPageHeader from "../pageHeader/InstPageHeader";
import InstNavBar from "../navBar/InstNavBar";
import "./InstCursos.css";
import { useNavigate } from "react-router-dom";
import CursoService from "../../services/CursoService";
import { rxSetCursoEdicao } from "../../redux/slices/editarCursoSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirmacao from "../../components/shared/modalConfirmacao/ModalConfirmacao";
import { rxSetShowModalConfirmacao } from "../../redux/slices/showModalConfirmacaoSlice";
import { toast } from "react-toastify";

const InstCursos = () => {
  useEffect(() => {
    listarCursosPorInstituicao();
  }, []);

  const showModalConfirmacao = useSelector(
    (state) => state.showModalConfirmacao.showModal
  );

  const [cursoDeletar, setCursoDeletar] = useState();

  const dispatch = useDispatch();

  const listarCursosPorInstituicao = () => {
    CursoService.listarCursosPorInstituicao()
      .then((response) => {
        setCursos(response);
      })
      .catch((error) =>
        console.log("Erro ao listar curso InstCursos.jsx", error)
      );
  };

  const listarCursosPorInstituicaoAndNome = (nome) => {
    CursoService.listarCursosPorInstituicaoAndNome(nome)
      .then((response) => {
        setCursos(response);
      })
      .catch((error) =>
        console.log(
          "Erro ao  listarCursosPorInstituicaoAndNome InstCursos.jsx",
          error
        )
      );
  };

  const [cursos, setCursos] = useState();

  const navigate = useNavigate();

  const deletarCurso = () => {
    CursoService.deletarCurso(cursoDeletar.id)
      .then((response) => {
        dispatch(rxSetShowModalConfirmacao(false));
        listarCursosPorInstituicao();
        toast.success("Curso deletado com sucesso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Erro ao deletar curso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Erro ao deletar curso", error);
      });
    setCursoDeletar(null);
  };

  return (
    <>
      <InstNavBar />
      <div className="instituicao-header">
        <InstPageHeader
          pagina={"Cursos"}
          pesquisar={listarCursosPorInstituicaoAndNome}
        />
      </div>
      <div className="instituicao-body container pt-3">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-site"
            onClick={() => {
              dispatch(rxSetCursoEdicao(null));
              navigate(window.location.pathname + "/novoCurso");
            }}
          >
            Cadastrar curso
          </button>
        </div>
        <ul className="list-group">
          {cursos &&
            cursos.map((curso, idx) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={idx}
              >
                <span>{curso.nome}</span>
                <div>
                  <button
                    className="btn btn-site m-2 mt-0 mb-0"
                    onClick={() => {
                      dispatch(rxSetCursoEdicao(curso));
                      navigate(
                        window.location.pathname + "/editarCurso/" + curso.id
                      );
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setCursoDeletar(curso);
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
      {showModalConfirmacao && (
        <ModalConfirmacao
          titulo="Excluir curso"
          descricao="Deseja realmente excluir o curso selecionado?"
          confirmar={deletarCurso}
        />
      )}
    </>
  );
};

export default InstCursos;
