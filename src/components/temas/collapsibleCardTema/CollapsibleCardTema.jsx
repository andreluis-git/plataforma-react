import PrintIcon from "@mui/icons-material/Print";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { rxSetTemaEdicao } from "../../../redux/slices/editarTemaSlice";
import { rxSetShowNovoTemaModal } from "../../../redux/slices/showNovoTemaModalSlice";
import TemaService from "../../../services/TemaService";
import PrintTema from "../../../utils/PrintTemaUtil";
import Truncate from "../../../utils/TruncateString";
import ModalCandidatos from "../modais/ModalCandidatos";
import { rxSetListaTemas } from "../../../redux/slices/listaTemasSlice";
import { toast } from "react-toastify";
import JWTUtil from "../../../utils/JWTUtil";

const CollapsibleCardTema = (props) => {
  const { tema, hasCandidatos, setTemaExclusao } = props;
  const contentRef = useRef();
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [showModalCandidatos, setShowModalCandidatos] = useState(false);
  const [candidatosTema, setCandidatosTema] = useState([]);

  useEffect(() => {
    setIsOpen(false);
    setUsuario(JWTUtil.parseJwt(localStorage.getItem("token")));
    // console.log(tema);
  }, [tema]);

  const listarCandidatosTema = (temaId) => {
    TemaService.listarCandidatosTema(temaId)
      .then((response) => {
        console.log(response);
        setCandidatosTema(response);
      })
      .catch((error) =>
        console.log("ModalTema.js listarCandidatosTema ", error)
      );
  };

  const candidatarTema = (temaId) => {
    TemaService.candidatarTema(temaId)
      .then((response) => {
        toast.success("Candidatura realizada com sucesso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        buscarTemasLista();
        console.log("ModalTema.js candidatarTema sucesso ", response);
      })
      .catch((error) => {
        toast.error("Erro ao realizar candidatura!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("ModalTema.js candidatarTema ", error);
      });
  };

  const removerCandidaturaTema = (temaId) => {
    TemaService.removerCandidaturaTema(temaId)
      .then((response) => {
        toast.success("Candidatura cancelada com sucesso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        buscarTemasLista();
      })
      .catch((error) => {
        toast.error("Erro ao cancelar candidatura!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("ModalTema.js removerCandidaturaTema ", error);
      });
  };

  const buscarTemasLista = () => {
    TemaService.buscarTemaPorPagina(
      window.location.pathname.replace("/", "")
    ).then((response) => {
      dispatch(rxSetListaTemas(response));
    });
  };

  const chanceStatusTema = (tema) => {
    let temaEditado = { ...tema, ativo: !tema.ativo };
    // console.log(temaEditado);
    TemaService.editarTema(temaEditado)
      .then((response) => {
        buscarTemasLista();
        toast.success("Tema editado com sucesso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.success("Erro ao editar tema!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <div className="card mb-1" ref={contentRef}>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="m-3">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="pb-2 title-color">{tema.titulo}</h6>
                <h6 className="mb-2 subtitle-color">
                  {tema.criadorTema.cursoAluno.nome}
                </h6>
              </div>
              <span>{tema.dataCriacao}</span>
            </div>
            {window.location.pathname === "/anunciados" && (
              <div className="d-flex justify-content-between">
                <div>
                  {hasCandidatos && (
                    <button
                      className="btn btn-site"
                      onClick={() => {
                        listarCandidatosTema(tema.id);
                        setShowModalCandidatos(true);
                      }}
                      style={{ marginRight: "10px" }}
                    >
                      {tema.candidatosTema.length} Candidato
                      {tema.candidatosTema.length > 1 ? "s" : ""}
                    </button>
                  )}
                  <button
                    className="btn btn-site"
                    onClick={() => {
                      dispatch(rxSetTemaEdicao(tema));
                      dispatch(rxSetShowNovoTemaModal(true));
                      setTemaExclusao(tema);
                    }}
                  >
                    Editar
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-site"
                    onClick={() => {
                      console.log("DESATIVAR");
                      chanceStatusTema(tema);
                    }}
                  >
                    {tema.ativo ? "Desativar" : "Ativar"}
                  </button>
                </div>
              </div>
            )}
            <div className="d-flex align-items-center">
              {window.location.pathname === "/temas" && (
                <>
                  {usuario &&
                  !tema.candidatosTema.some((c) => c.id === usuario?.userId) ? (
                    <button
                      className="btn btn-site"
                      onClick={() => {
                        candidatarTema(tema.id);
                      }}
                    >
                      Candidatar-se
                    </button>
                  ) : (
                    <button
                      className="btn btn-site"
                      onClick={() => {
                        removerCandidaturaTema(tema.id);
                      }}
                    >
                      Cancelar candidatura
                    </button>
                  )}

                  <div
                    className="card-icons btn-icon-light ml-2"
                    onClick={() => PrintTema.print(tema)}
                    style={{ marginLeft: "10px" }}
                  >
                    <PrintIcon className="m-2" />
                  </div>
                </>
              )}
              {window.location.pathname === "/candidaturas" && (
                <>
                  <button
                    className="btn btn-site"
                    onClick={() => {
                      removerCandidaturaTema(tema.id);
                    }}
                  >
                    Cancelar candidatura
                  </button>
                </>
              )}
            </div>
            <hr className="separador" />
            {!isOpen ? (
              <p className="card-text">{Truncate(tema.descricao, 300)}</p>
            ) : (
              <p className="card-text">{tema.descricao}</p>
            )}
          </div>
        </div>
      </div>
      {showModalCandidatos && (
        <ModalCandidatos
          setShowModalCandidatos={setShowModalCandidatos}
          candidatosTema={candidatosTema}
          tema={tema}
        />
      )}
    </>
  );
};

export default CollapsibleCardTema;
