import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { rxSetTemaEdicao } from "../../redux/slices/editarTemaSlice";
import { rxSetShowNovoTemaModal } from "../../redux/slices/showNovoTemaModalSlice";
import TemaService from "../../services/TemaService";
import Header from "../shared/header/Header";
import CollapsibleCard from "./collapsibleCardTema/CollapsibleCardTema";
import PageHeader from "../shared/pageHeader/PageHeader";
import "./Temas.css";

function Temas(props) {
  const [temas, setTemas] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    switch (window.location.pathname) {
      case "/temas":
        TemaService.listarTemas()
          .then((response) => {
            setTemas(response);
          })
          .catch((error) => console.log("Temas.js listarTemas", error));
        break;
      case "/anunciados":
        TemaService.listarTemasAnunciados()
          .then((response) => {
            setTemas(response);
          })
          .catch((error) =>
            console.log("Temas.js listarTemasAnunciados", error)
          );
        break;
      case "/candidaturas":
        TemaService.listarTemasCandidaturas()
          .then((response) => {
            setTemas(response);
          })
          .catch((error) =>
            console.log("Temas.js listarTemasCandidaturas", error)
          );
        break;
      default:
        setTemas([]);
    }
  }, [props.pagina]);

  const buscarTemaPorTitulo = (titulo) => {
    switch (window.location.pathname) {
      case "/temas":
        TemaService.buscarTemasPorTitulo(titulo)
          .then((response) => {
            setTemas(response);
          })
          .catch((error) => console.log("Temas.js buscarTemaPorTitulo", error));
        break;
      case "/anunciados":
        TemaService.buscarTemasAnunciadosPorTitulo(titulo)
          .then((response) => {
            setTemas(response);
          })
          .catch((error) =>
            console.log("Temas.js buscarTemasAnunciadosPorTitulo", error)
          );
        break;
      case "/candidaturas":
        console.log("Buscar nas candidaturas");
        break;
      default:
        setTemas([]);
    }
  };

  return (
    <>
      <Header />
      <div className="tema-header">
        <PageHeader
          pagina={props.pagina}
          buscarTemaPorTitulo={buscarTemaPorTitulo}
        />
      </div>
      <div className="tema-body container mt-3">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={() => {
              dispatch(rxSetTemaEdicao(null));
              dispatch(rxSetShowNovoTemaModal(true));
            }}
          >
            Novo tema
          </button>
        </div>
        {temas &&
          temas.map((tema, idx) => (
            <CollapsibleCard tema={tema} key={idx}></CollapsibleCard>
          ))}
      </div>
    </>
  );
}

export default Temas;
