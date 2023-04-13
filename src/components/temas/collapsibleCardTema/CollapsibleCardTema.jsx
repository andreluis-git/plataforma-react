import PrintIcon from "@mui/icons-material/Print";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { rxSetTemaEdicao } from "../../../redux/slices/editarTemaSlice";
import { rxSetShowNovoTemaModal } from "../../../redux/slices/showNovoTemaModalSlice";
import TemaService from "../../../services/TemaService";
import PrintTema from "../../../utils/PrintTemaUtil";
import Truncate from "../../../utils/TruncateString";
import ModalCandidatos from "../modais/ModalCandidatos";

const CollapsibleCardTema = (props) => {
  const { tema } = props;
  const contentRef = useRef();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [showModalCandidatos, setShowModalCandidatos] = useState(false);
  const [candidatosTema, setCandidatosTema] = useState([]);

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
        console.log("ModalTema.js candidatarTema sucesso ", response);
      })
      .catch((error) => console.log("ModalTema.js candidatarTema ", error));
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
            <hr className="separador" />
            {!isOpen && (
              <p className="card-text">{Truncate(tema.descricao, 300)}</p>
            )}
          </div>
        </div>
        <>
          {isOpen && (
            <div className="p-3 pt-0">
              <div className="d-flex align-items-center">
                {window.location.pathname === "/anunciados" && (
                  <>
                    <button
                      className="btn btn-site"
                      onClick={() => {
                        listarCandidatosTema(tema.id);
                        setShowModalCandidatos(true);
                      }}
                      style={{ marginRight: "10px" }}
                    >
                      Candidatos
                    </button>
                    <button
                      className="btn btn-site"
                      onClick={() => {
                        dispatch(rxSetTemaEdicao(tema));
                        dispatch(rxSetShowNovoTemaModal(true));
                      }}
                    >
                      Editar
                    </button>
                  </>
                )}
                {window.location.pathname === "/temas" && (
                  <>
                    <button
                      className="btn btn-site"
                      onClick={() => {
                        candidatarTema(tema.id);
                      }}
                    >
                      Candidatar-se
                    </button>
                    <div
                      className="card-icons btn-icon-light ml-2"
                      onClick={() => PrintTema.print(tema)}
                      style={{ marginLeft: "10px" }}
                    >
                      <PrintIcon className="m-2" />
                    </div>
                  </>
                )}
              </div>
              <p className="card-text mt-3">{tema.descricao}</p>
            </div>
          )}
        </>
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
