import {
  CADASTRAR_CURSO,
  DELETAR_CURSO,
  EDITAR_CURSO,
  LISTAR_CURSOS_POR_INSTITUICAO,
  LISTAR_CURSOS_POR_INSTITUICAO_AND_NOME,
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

const listarCursosPorInstituicaoAndNome = (nome) =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_CURSOS_POR_INSTITUICAO_AND_NOME, {
        params: { nome },
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

const cadastrarCurso = (curso) =>
  new Promise((resolve, reject) => {
    console.log(curso);
    api
      .post(
        CADASTRAR_CURSO,
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
        console.log("Erro cadastrarCurso :: ", error);
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

const deletarCurso = (cursoId) =>
  new Promise((resolve, reject) => {
    api
      .delete(`${DELETAR_CURSO}/${cursoId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro editarTema :: ", error);
        reject(error);
      });
  });

const CursoService = {
  listarCursosPorInstituicao,
  listarCursosPorInstituicaoAndNome,
  cadastrarCurso,
  editarCurso,
  deletarCurso,
};

export default CursoService;
