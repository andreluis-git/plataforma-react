import { LISTAR_DISCIPLINAS_POR_CURSO } from "../utils/Constants";
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

const DisciplinaService = {
  listarDisciplinasPorCurso,
};

export default DisciplinaService;
