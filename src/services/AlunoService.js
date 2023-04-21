import { BUSCAR_ALUNO, EDITAR_ALUNO } from "../utils/Constants";
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

const editarAluno = (aluno) =>
  new Promise((resolve, reject) => {
    aluno.disciplinasInteresse?.map(
      (disciplina) => (disciplina.id = disciplina.value)
    );

    console.log("Aluno Envio", aluno);
    api
      .put(
        EDITAR_ALUNO,
        {
          ...aluno,
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

const AlunoService = {
  buscarAluno,
  editarAluno,
};

export default AlunoService;
