import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useDispatch } from "react-redux";
import { rxSetShowModalConfirmacao } from "../../../redux/slices/showModalConfirmacaoSlice";

const ModalConfirmacao = (props) => {
  const { titulo, descricao, confirmar } = props;

  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`modal fade show`}
        role="dialog"
        style={{ display: "block" }}
        onClick={() => {
          dispatch(rxSetShowModalConfirmacao(false));
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{titulo}</h5>
              <div
                className="card-icons"
                onClick={() => {
                  dispatch(rxSetShowModalConfirmacao(false));
                }}
              >
                <CloseIcon className="m-2" />
              </div>
            </div>
            <div className="modal-body">
              <p>{descricao}</p>
              <div className="d-flex mt-4">
                <button
                  type="button"
                  className="btn btn-site w-50"
                  style={{ marginRight: "15px" }}
                  onClick={() => {
                    confirmar();
                    dispatch(rxSetShowModalConfirmacao(false));
                  }}
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger w-50"
                  onClick={() => {
                    dispatch(rxSetShowModalConfirmacao(false));
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade show`}></div>
    </>
  );
};

export default ModalConfirmacao;
