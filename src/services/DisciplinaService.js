import {
  CADASTRAR_DISCIPLINA,
  DELETAR_DISCIPLINA,
  EDITAR_DISCIPLINA,
  LISTAR_DISCIPLINAS_CURSO_POR_NOME,
  LISTAR_DISCIPLINAS_POR_CURSO,
  LISTAR_DISCIPLINAS_POR_CURSO_ID,
} from "../utils/Constants";
import api from "./Api";

const listarDisciplinasPorCurso = () =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_DISCIPLINAS_POR_CURSO, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro listarDisciplinasPorCurso :: ", error);
        reject(error);
      });
  });

const listarDisciplinasPorCursoId = (id) =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_DISCIPLINAS_POR_CURSO_ID.replace("{id}", id), {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro listarDisciplinasPorCurso :: ", error);
        reject(error);
      });
  });

const listarDisciplinasCursoPorNome = (id, nome) =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_DISCIPLINAS_CURSO_POR_NOME, {
        params: { id, nome },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro listarDisciplinasPorCurso :: ", error);
        reject(error);
      });
  });

const editarDisciplina = (disciplina) =>
  new Promise((resolve, reject) => {
    api
      .put(
        EDITAR_DISCIPLINA,
        {
          ...disciplina,
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

const cadastrarDisciplina = (disciplina) =>
  new Promise((resolve, reject) => {
    api
      .post(
        CADASTRAR_DISCIPLINA,
        {
          ...disciplina,
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

const deletarDisciplina = (disciplinaId) =>
  new Promise((resolve, reject) => {
    api
      .delete(`${DELETAR_DISCIPLINA}/${disciplinaId}`, {
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

const DisciplinaService = {
  listarDisciplinasPorCurso,
  listarDisciplinasPorCursoId,
  listarDisciplinasCursoPorNome,
  editarDisciplina,
  cadastrarDisciplina,
  deletarDisciplina,
};

export default DisciplinaService;
