import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./TemasHeader.css";

const TemasHeader = (props) => {
  const { pagina } = props;
  const [focusOrdenacaoItem, setFocusOrdenacaoItem] = useState(0);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-6">
            <h3>{pagina}</h3>
            {window.location.pathname === "/temas" && (
              <div className="pb-3 pt-2">
                <button
                  className={`classificacao-temas${
                    focusOrdenacaoItem === 0 ? "-focus" : ""
                  }`}
                  onClick={() => setFocusOrdenacaoItem(0)}
                >
                  Relevantes
                </button>
                <button
                  className={`classificacao-temas${
                    focusOrdenacaoItem === 1 ? "-focus" : ""
                  }`}
                  onClick={() => setFocusOrdenacaoItem(1)}
                >
                  Rescentes
                </button>
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
