import DateFormatUtil from "../utils/DateFormatUtil";
import api from "./Api";
import {
  LISTAR_TEMAS,
  LISTAR_TEMAS_ANUNCIADOS,
  LISTAR_TEMAS_CANDIDATURAS,
} from "../utils/Constants";

// const listarTemasOld = () => {
//   api
//     .get("/tema/listarTemas", {
//       headers: { Authorization: "Bearer " + localStorage.getItem("token") },
//     })
//     .then((response) => {
//       console.log("get sucesso: ", response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       console.log("erro get :: ", error);
//     });
// };

const listarTemas = () =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_TEMAS, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        response.data.map(
          (item) =>
            (item.dataCriacao = DateFormatUtil.convertDate(item.dataCriacao))
        );
        resolve(response.data);
      })
      .catch((error) => {
        console.log("erro get :: ", error);
        reject(error);
      });
  });

const listarTemasAnunciados = () =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_TEMAS_ANUNCIADOS, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        response.data.map(
          (item) =>
            (item.dataCriacao = DateFormatUtil.convertDate(item.dataCriacao))
        );
        resolve(response.data);
      })
      .catch((error) => {
        console.log("erro get :: ", error);
        reject(error);
      });
  });

const listarTemasCandidaturas = () =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_TEMAS_CANDIDATURAS, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        response.data.map(
          (item) =>
            (item.dataCriacao = DateFormatUtil.convertDate(item.dataCriacao))
        );
        resolve(response.data);
      })
      .catch((error) => {
        console.log("erro get :: ", error);
        reject(error);
      });
  });

const TemaService = {
  listarTemas,
  listarTemasAnunciados,
  listarTemasCandidaturas,
};

export default TemaService;
