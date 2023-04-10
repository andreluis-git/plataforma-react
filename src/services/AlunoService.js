import { BUSCAR_ALUNO } from "../utils/Constants";
import api from "./Api";

const buscarAluno = () =>
  new Promise((resolve, reject) => {
    api
      .get(BUSCAR_ALUNO, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro buscarAluno :: ", error);
        reject(error);
      });
  });

const AlunoService = {
  buscarAluno,
};

export default AlunoService;
