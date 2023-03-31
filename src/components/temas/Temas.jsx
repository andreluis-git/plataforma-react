import React, { useEffect, useState } from "react";
import TemaService from "../../services/TemaService";
import ModalTema from "./cards/ModalTema";
import "./Temas.css";
import TemasHeader from "./TemasHeader";

function truncate(str, length) {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  } else return str;
}

function Temas(props) {
  const [temas, setTemas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [temaModal, setTemaModal] = useState(undefined);

  useEffect(() => {
    switch (window.location.pathname) {
      case "/temas":
        TemaService.listarTemas()
          .then((response) => {
            setTemas(response);
            console.log(response);
          })
          .catch((error) => console.log(error));
        break;
      case "/anunciados":
        TemaService.listarTemasAnunciados()
          .then((response) => {
            setTemas(response);
            console.log(response);
          })
          .catch((error) => console.log(error));
        break;
      case "/candidaturas":
        TemaService.listarTemasCandidaturas()
          .then((response) => {
            setTemas(response);
            console.log(response);
          })
          .catch((error) => console.log(error));
        break;
      default:
        setTemas([]);
    }
  }, [props.pagina]);

  return (
    <>
      <div className="tema-header">
        <div className="container">
          <TemasHeader pagina={props.pagina} />
        </div>
      </div>
      <div className="tema-body container mt-3">
        {temas &&
          temas.map((tema, idx) => (
            <div
              className="card mb-2 card-lista"
              key={idx}
              onClick={() => {
                setTemaModal(tema);
                setShowModal(true);
              }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{tema.titulo}</h5>
                  <span>{tema.dataCriacao}</span>
                </div>
                <p className="card-text">{truncate(tema.descricao, 300)}</p>
              </div>
            </div>
          ))}
      </div>
      {showModal && (
        <ModalTema setShowModal={setShowModal} temaModal={temaModal} />
      )}
    </>
  );
}

export default Temas;
