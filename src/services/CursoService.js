import {
  EDITAR_CURSO,
  LISTAR_CURSOS_POR_INSTITUICAO,
} from "../utils/Constants";
import api from "./Api";

const listarCursosPorInstituicao = () =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_CURSOS_POR_INSTITUICAO, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro listarCursosPorInstituicao :: ", error);
        reject(error);
      });
  });

const editarCurso = (curso) =>
  new Promise((resolve, reject) => {
    console.log(curso);
    api
      .put(
        EDITAR_CURSO,
        {
          ...curso,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro editarCurso :: ", error);
        reject(error);
      });
  });

const CursoService = { listarCursosPorInstituicao, editarCurso };

export default CursoService;
