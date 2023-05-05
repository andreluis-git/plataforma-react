import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./InstPageHeader.css";

const InstPageHeader = (props) => {
  const { pagina } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <span className="titulo-pagina fw-bold">{pagina}</span>
          </div>
          <div className="col-6 d-flex align-items-center">
            <form onSubmit={handleSubmit} className="w-100">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite o tema ou assunto de interesse"
                  id="buscarTitulo"
                />
                <div className="input-group-append">
                  <button className="btn btn-icon" type="submit">
                    <SearchIcon />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstPageHeader;
