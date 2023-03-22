import React, { useEffect, useState } from "react";
import TemaService from "../../services/TemaService";
import CardTemaExpandido from "./CardTemaExpandido";
import CardTemaLista from "./CardTemaLista";
import "./ListaTemas.css";
import SearchIcon from "@mui/icons-material/Search";

function ListaTemas() {
  const [temas, setTemas] = useState(undefined);
  const [temaAtivo, setTemaAtivo] = useState(undefined);
  const [focusOrdenacaoItem, setFocusOrdenacaoItem] = useState(0);

  useEffect(() => {
    TemaService.listarTemas()
      .then((response) => {
        setTemas(response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (temas && temas.length > 0 && !temaAtivo) setTemaAtivo(temas[0]);
  }, [temas, temaAtivo]);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <h3>Temas</h3>
          <div className="pb-3 pt-2">
            <span
              className={`classificacao-temas${
                focusOrdenacaoItem === 0 ? "-focus" : ""
              }`}
              onClick={() => setFocusOrdenacaoItem(0)}
            >
              Relevantes
            </span>
            <span
              className={`classificacao-temas${
                focusOrdenacaoItem === 1 ? "-focus" : ""
              }`}
              onClick={() => setFocusOrdenacaoItem(1)}
            >
              Rescentes
            </span>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar tema"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-6 coluna-esquerda bg-primary overflow-auto invisible-scrollbar">
          <CardTemaLista temas={temas} setTemaAtivo={setTemaAtivo} />
        </div>
        <div className="col-6 bg-success">
          <CardTemaExpandido temaAtivo={temaAtivo} />
        </div>
      </div>
    </>
  );
}

export default ListaTemas;
