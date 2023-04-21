import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { rxSetTemaEdicao } from "../../redux/slices/editarTemaSlice";
import { rxSetListaTemas } from "../../redux/slices/listaTemasSlice";
import { rxSetShowNovoTemaModal } from "../../redux/slices/showNovoTemaModalSlice";
import TemaService from "../../services/TemaService";
import Header from "../shared/header/Header";
import PageHeader from "../shared/pageHeader/PageHeader";
import "./Temas.css";
import CollapsibleCard from "./collapsibleCardTema/CollapsibleCardTema";
import NovoTemaModal from "./modais/NovoTemaModal";

function Temas(props) {
  const temas = useSelector((state) => state.listaTemas.temas);

  const dispatch = useDispatch();

  const buscarTemaPorTitulo = (texto) => {
    switch (window.location.pathname) {
      case "/temas":
        TemaService.buscarTemasPorTitulo(texto)
          .then((response) => {
            dispatch(rxSetListaTemas(response));
          })
          .catch((error) => console.log("Temas.js buscarTemaPorTitulo", error));
        break;
      case "/anunciados":
        TemaService.buscarTemasAnunciadosPorTitulo(texto)
          .then((response) => {
            dispatch(rxSetListaTemas(response));
          })
          .catch((error) =>
            console.log("Temas.js buscarTemasAnunciadosPorTitulo", error)
          );
        break;
      case "/candidaturas":
        TemaService.buscarTemasCandidaturasPorTitulo(texto)
          .then((response) => {
            dispatch(rxSetListaTemas(response));
          })
          .catch((error) =>
            console.log("Temas.js buscarTemasCandidaturasPorTitulo", error)
          );
        break;
      default:
        dispatch(rxSetListaTemas([]));
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
            className="btn btn-site mb-3"
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
