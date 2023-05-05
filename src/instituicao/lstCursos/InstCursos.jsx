import React, { useEffect, useState } from "react";
import InstPageHeader from "../pageHeader/InstPageHeader";
import InstNavBar from "../navBar/InstNavBar";
import "./InstCursos.css";
import { useNavigate } from "react-router-dom";
import CursoService from "../../services/CursoService";
import { rxSetCursoEdicao } from "../../redux/slices/editarCursoSlice";
import { useDispatch } from "react-redux";

const InstCursos = () => {
  useEffect(() => {
    listarCursosPorInstituicao();
  }, []);

  const dispatch = useDispatch();

  const listarCursosPorInstituicao = () => {
    CursoService.listarCursosPorInstituicao()
      .then((response) => {
        console.log(response);
        setCursos(response);
      })
      .catch((error) => console.log("Erro ao listar curso InstCursos.jsx"));
  };

  const [cursos, setCursos] = useState();

  const navigate = useNavigate();

  return (
    <>
      <InstNavBar />
      <div className="instituicao-header">
        <InstPageHeader pagina={"Cursos"} />
      </div>
      <div className="instituicao-body container pt-3">
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
                  <button className="btn btn-danger">Deletar</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default InstCursos;
