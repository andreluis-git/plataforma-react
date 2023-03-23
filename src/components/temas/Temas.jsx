import React, { useEffect, useState } from "react";
import TemaService from "../../services/TemaService";
import CardTemaExpandido from "./cards/CardTemaExpandido";
import CardTemaLista from "./cards/CardTemaLista";
import "./Temas.css";
import TemasHeader from "./TemasHeader";

function Temas(props) {
  const [temas, setTemas] = useState(undefined);
  const [temaAtivo, setTemaAtivo] = useState(undefined);

  const [tamanhoCardDireita, setTamanhoCardDireita] = useState(80);

  useEffect(() => {
    TemaService.listarTemas()
      .then((response) => {
        setTemas(response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (temas && temas.length > 0 && !temaAtivo) setTemaAtivo(temas[0]);
    if (temaAtivo) {
      let tamanho = (
        (document.getElementById("tema-expandido-id").offsetHeight * 100) /
        window.innerHeight
      ).toFixed(2);
      if (tamanho !== tamanhoCardDireita) setTamanhoCardDireita(tamanho);
    }
  }, [temas, temaAtivo]);

  return (
    <>
      <div className="tema-header">
        <div className="container">
          <TemasHeader paginaSelecionada={props.paginaSelecionada} />
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
