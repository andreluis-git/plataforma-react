import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import CollapsibleCardCandidatos from "../collapsibleCardCandidatos/CollapsibleCardCadidatos";
import "./ModalCandidatos.css";

const ModalCandidatos = (props) => {
  const { setShowModalCandidatos, candidatosTema, tema } = props;

  return (
    <>
      <div
        className={`modal fade show`}
        role="dialog"
        style={{ display: "block" }}
        onClick={() => {
          setShowModalCandidatos(false);
        }}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Candidatos</h5>
              <div
                className="card-icons"
                onClick={() => {
                  setShowModalCandidatos(false);
                }}
              >
                <CloseIcon className="m-2" />
              </div>
            </div>
            <div className="modal-body">
              {candidatosTema &&
                candidatosTema.map((candidato, idx) => (
                  <CollapsibleCardCandidatos
                    candidato={candidato}
                    key={idx}
                    tema={tema}
                  />
                ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setShowModalCandidatos(false);
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade show`}></div>
    </>
  );
};

export default ModalCandidatos;
