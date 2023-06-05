import {
  BUSCAR_INSTITUICAO,
  BUSCAR_INSTITUICAO_POR_ID,
  BUSCAR_INSTITUICAO_POR_NOME,
  CADASTRAR_INSTITUICAO,
  DELETAR_INSTITUICAO,
  EDITAR_INSTITUICAO,
  LISTAR_INSTITUICOES,
} from "../utils/Constants";
import api from "./Api";

const burcarInstituicao = () =>
  new Promise((resolve, reject) => {
    api
      .get(BUSCAR_INSTITUICAO, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro buscarInstituicao :: ", error);
        reject(error);
      });
  });

const burcarInstituicaoPorId = (instituicaoId) =>
  new Promise((resolve, reject) => {
    api
      .get(`${BUSCAR_INSTITUICAO_POR_ID}/${instituicaoId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro buscarInstituicao :: ", error);
        reject(error);
      });
  });

const listarInstituicoes = () =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_INSTITUICOES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro listarInstituicoes :: ", error);
        reject(error);
      });
  });

const editarInstituicao = (instituicao) =>
  new Promise((resolve, reject) => {
    api
      .put(
        EDITAR_INSTITUICAO,
        {
          ...instituicao,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro editarAluno :: ", error);
        reject(error);
      });
  });

const cadastrarInstituicao = (instituicao) =>
  new Promise((resolve, reject) => {
    api
      .post(
        CADASTRAR_INSTITUICAO,
        {
          ...instituicao,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro editarAluno :: ", error);
        reject(error);
      });
  });

const listarInstituicaoPorNome = (nome) =>
  new Promise((resolve, reject) => {
    api
      .get(BUSCAR_INSTITUICAO_POR_NOME, {
        params: { nome },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro listarInstituicaoPorNome :: ", error);
        reject(error);
      });
  });

const deletarInstituicao = (instituicaoId) =>
  new Promise((resolve, reject) => {
    api
      .delete(`${DELETAR_INSTITUICAO}/${instituicaoId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro deletarInstituicao :: ", error);
        reject(error);
      });
  });

const InstituicaoService = {
  burcarInstituicao,
  burcarInstituicaoPorId,
  listarInstituicaoPorNome,
  listarInstituicoes,
  editarInstituicao,
  deletarInstituicao,
  cadastrarInstituicao,
};

export default InstituicaoService;
