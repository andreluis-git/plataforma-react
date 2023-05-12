import {
  BUSCAR_ALUNO,
  BUSCAR_ALUNOS_POR_INSTITUICAO_ID,
  BUSCAR_ALUNOS_POR_INSTITUICAO_ID_AND_EMAIL,
  BUSCAR_ALUNO_POR_ID,
  CADASTRAR_ALUNO,
  EDITAR_ALUNO,
  EDITAR_ALUNO_INSTITUICAO,
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

const buscarAlunoPorId = (alunoId) =>
  new Promise((resolve, reject) => {
    api
      .get(`${BUSCAR_ALUNO_POR_ID}/${alunoId}`, {
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

const editarAlunoInstituicao = (aluno) =>
  new Promise((resolve, reject) => {
    api
      .put(
        EDITAR_ALUNO_INSTITUICAO,
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

const cadastrarAluno = (aluno) =>
  new Promise((resolve, reject) => {
    api
      .post(
        CADASTRAR_ALUNO,
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
  buscarAlunoPorId,
  buscarAlunosPorInstituicaoId,
  buscarAlunosPorInstituicaoIdAndEmail,
  editarAluno,
  editarAlunoInstituicao,
  cadastrarAluno,
};

export default AlunoService;
