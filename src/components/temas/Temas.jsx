import React, { useEffect, useState } from "react";
import TemaService from "../../services/TemaService";
import CardTemaExpandido from "./cards/CardTemaExpandido";
import CardTemaLista from "./cards/CardTemaLista";
import "./Temas.css";
import TemasHeader from "./TemasHeader";

function Temas(props) {
  const [temas, setTemas] = useState([]);
  const [temaAtivo, setTemaAtivo] = useState(undefined);

  const [tamanhoCardDireita, setTamanhoCardDireita] = useState(0);

  const carregarTemas = (response) => {
    setTemas(response);
    if (response.length > 0) {
      setTemaAtivo(response[0]);
    } else {
      setTemaAtivo(undefined);
    }
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case "/temas":
        TemaService.listarTemas()
          .then((response) => {
            carregarTemas(response);
            console.log(response);
          })
          .catch((error) => console.log(error));
        break;
      case "/anunciados":
        TemaService.listarTemasAnunciados()
          .then((response) => {
            carregarTemas(response);
            console.log(response);
          })
          .catch((error) => console.log(error));
        break;
      case "/candidaturas":
        TemaService.listarTemasCandidaturas()
          .then((response) => {
            carregarTemas(response);
            console.log(response);
          })
          .catch((error) => console.log(error));
        break;
      default:
        carregarTemas([]);
    }
  }, [props.pagina]);

  useEffect(() => {
    if (temaAtivo) {
      let tamanho = (
        (document.getElementById("tema-expandido-id").offsetHeight * 100) /
        window.innerHeight
      ).toFixed(2);
      console.log(tamanho);
      setTamanhoCardDireita(tamanho);
    }
  }, [temas, temaAtivo]);

  return (
    <>
      <div className="tema-header">
        <div className="container">
          <TemasHeader pagina={props.pagina} />
        </div>
      </div>
      <div className="tema-body container mt-3">
        <div className="row" style={{ height: tamanhoCardDireita + "vh" }}>
          <div className="col-6 coluna-esquerda overflow-auto invisible-scrollbar">
            <CardTemaLista temas={temas} setTemaAtivo={setTemaAtivo} />
          </div>
          <div className="col-6">
            <CardTemaExpandido temaAtivo={temaAtivo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Temas;
