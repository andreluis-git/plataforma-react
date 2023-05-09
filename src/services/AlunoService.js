import {
  BUSCAR_ALUNO,
  BUSCAR_ALUNOS_POR_INSTITUICAO_ID,
  BUSCAR_ALUNOS_POR_INSTITUICAO_ID_AND_EMAIL,
  EDITAR_ALUNO,
} from "../utils/Constants";
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

const buscarAlunosPorInstituicaoId = () =>
  new Promise((resolve, reject) => {
    api
      .get(BUSCAR_ALUNOS_POR_INSTITUICAO_ID, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro buscarAlunosPorInstituicaoId :: ", error);
        reject(error);
      });
  });

const buscarAlunosPorInstituicaoIdAndEmail = (texto) =>
  new Promise((resolve, reject) => {
    api
      .get(BUSCAR_ALUNOS_POR_INSTITUICAO_ID_AND_EMAIL, {
        params: { texto },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro buscarAlunosPorInstituicaoId :: ", error);
        reject(error);
      });
  });

const editarAluno = (aluno) =>
  new Promise((resolve, reject) => {
    aluno.disciplinasInteresse?.map(
      (disciplina) => (disciplina.id = disciplina.value)
    );

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
  buscarAlunosPorInstituicaoId,
  buscarAlunosPorInstituicaoIdAndEmail,
  editarAluno,
};

export default AlunoService;
