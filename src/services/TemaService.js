import DateFormatUtil from "../utils/DateFormatUtil";
import api from "./Api";
import {
  BUSCAR_TEMAS_ANUNCIADOS_POR_TITULO,
  BUSCAR_TEMAS_CANDIDATURAS_POR_TITULO,
  BUSCAR_TEMAS_POR_TITULO,
  CADASTRAR_TEMA,
  CANDIDATAR_TEMA,
  DELETAR_TEMA,
  EDITAR_TEMA,
  LISTAR_CANDIDATOS_TEMA,
  LISTAR_TEMAS,
  LISTAR_TEMAS_ANUNCIADOS,
  LISTAR_TEMAS_CANDIDATURAS,
  REMOVER_CANDIDATURA_TEMA,
} from "../utils/Constants";

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
        console.log("Erro listarTemas :: ", error);
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
        console.log("Erro listarTemasAnunciados :: ", error);
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
        console.log("Erro listarTemasCandidaturas :: ", error);
        reject(error);
      });
  });

const listarCandidatosTema = (temaId) =>
  new Promise((resolve, reject) => {
    api
      .get(LISTAR_CANDIDATOS_TEMA, {
        params: { temaId: temaId },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro listarTemasCandidaturas :: ", error);
        reject(error);
      });
  });

const buscarTemasPorTitulo = (texto) =>
  new Promise((resolve, reject) => {
    api
      .get(BUSCAR_TEMAS_POR_TITULO, {
        params: { texto },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro buscarTemaPorTitulo :: ", error);
        reject(error);
      });
  });

const buscarTemasAnunciadosPorTitulo = (texto) =>
  new Promise((resolve, reject) => {
    api
      .get(BUSCAR_TEMAS_ANUNCIADOS_POR_TITULO, {
        params: { texto },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro buscarTemasAnunciadosPorTitulo :: ", error);
        reject(error);
      });
  });

const buscarTemasCandidaturasPorTitulo = (texto) =>
  new Promise((resolve, reject) => {
    api
      .get(BUSCAR_TEMAS_CANDIDATURAS_POR_TITULO, {
        params: { texto },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro buscarTemasCandidaturasPorTitulo :: ", error);
        reject(error);
      });
  });

const candidatarTema = (temaId) =>
  new Promise((resolve, reject) => {
    api
      .post(
        CANDIDATAR_TEMA,
        {},
        {
          params: { temaId },
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro candidatarTema :: ", error);
        reject(error);
      });
  });

const removerCandidaturaTema = (temaId) =>
  new Promise((resolve, reject) => {
    api
      .post(
        REMOVER_CANDIDATURA_TEMA,
        {},
        {
          params: { temaId },
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro candidatarTema :: ", error);
        reject(error);
      });
  });

const cadastrarTema = (tema) =>
  new Promise((resolve, reject) => {
    tema.disciplinasRelacionadas?.map(
      (disciplina) => (disciplina.id = disciplina.value)
    );

    api
      .post(
        CADASTRAR_TEMA,
        {
          ...tema,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro candidatarTema :: ", error);
        reject(error);
      });
  });

const editarTema = (tema) =>
  new Promise((resolve, reject) => {
    tema.disciplinasRelacionadas?.map((disciplina) => {
      if (disciplina.value) disciplina.id = disciplina.value;
    });

    api
      .put(
        EDITAR_TEMA,
        {
          ...tema,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Erro editarTema :: ", error);
        reject(error);
      });
  });

const deletarTema = (temaId) =>
  new Promise((resolve, reject) => {
    api
      .delete(`${DELETAR_TEMA}/${temaId}`, {
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

const buscarTemaPorPagina = (pagina) =>
  new Promise((resolve, reject) => {
    switch (pagina) {
      case "temas":
        listarTemas()
          .then((response) => {
            resolve(response);
          })
          .catch((error) => console.log("TemaService listarTemas", error));
        break;
      case "anunciados":
        listarTemasAnunciados()
          .then((response) => {
            resolve(response);
          })
          .catch((error) =>
            console.log("TemaService listarTemasAnunciados", error)
          );
        break;
      case "candidaturas":
        listarTemasCandidaturas()
          .then((response) => {
            resolve(response);
          })
          .catch((error) =>
            console.log("TemaService listarTemasCandidaturas", error)
          );
        break;
      default:
        resolve([]);
    }
  });

const TemaService = {
  listarTemas,
  listarTemasAnunciados,
  listarTemasCandidaturas,
  listarCandidatosTema,
  buscarTemasPorTitulo,
  buscarTemasAnunciadosPorTitulo,
  buscarTemasCandidaturasPorTitulo,
  candidatarTema,
  removerCandidaturaTema,
  cadastrarTema,
  editarTema,
  buscarTemaPorPagina,
  deletarTema,
};

export default TemaService;
