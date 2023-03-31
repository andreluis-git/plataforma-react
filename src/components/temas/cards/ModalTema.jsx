import React from "react";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import PrintTema from "../../../utils/PrintTemaUtil";
import "./ModalTema.css";

// ADICIONAR BOTÃO PARA DAR LIKE NOS TEMAS QUE GOSTA

const ModalTema = (props) => {
  const { setShowModal, temaModal } = props;

  return (
    <>
      {temaModal && (
        <>
          <div
            className={`modal fade show`}
            role="dialog"
            style={{ display: "block" }}
            onClick={() => {
              setShowModal(false);
            }}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    {temaModal.titulo}
                  </h5>

                  <div
                    className="card-icons"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    <CloseIcon className="m-2" />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-2 text-muted">
                      {temaModal.criadorTema.cursoAluno.nome}
                    </h6>
                    <span>{temaModal.dataCriacao}</span>
                  </div>
                  <hr className="separador" />
                  <div className="d-flex align-items-center">
                    <button className="btn btn-dark">Candidatar-se</button>
                    <div
                      className="card-icons ml-2"
                      onClick={() => PrintTema.print(temaModal)}
                      style={{ marginLeft: "10px" }}
                    >
                      <PrintIcon className="m-2" />
                    </div>
                  </div>
                  <p className="card-text mt-3">{temaModal.descricao}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`modal-backdrop fade show`}></div>
        </>
      )}
    </>
  );
};

export default ModalTema;
