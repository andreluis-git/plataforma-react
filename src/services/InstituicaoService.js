import { BUSCAR_INSTITUICAO, EDITAR_INSTITUICAO } from "../utils/Constants";
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

const InstituicaoService = { burcarInstituicao, editarInstituicao };

export default InstituicaoService;
