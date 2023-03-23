import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./TemasHeader.css";

const TemasHeader = (props) => {
  const { paginaSelecionada } = props;
  const [focusOrdenacaoItem, setFocusOrdenacaoItem] = useState(0);

  function firstLetterUpperCase(paginaSelecionada) {
    console.log(paginaSelecionada);
    return (
      paginaSelecionada[0].toUpperCase() +
      paginaSelecionada.slice(1).toLowerCase()
    );
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-6">
            <h3>{firstLetterUpperCase(paginaSelecionada)}</h3>
            {paginaSelecionada.toLowerCase() === "temas" && (
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
            )}
          </div>
          <div className="col-6 d-flex align-items-center">
            <div className="input-group">
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
      </div>
    </>
  );
};

export default TemasHeader;
