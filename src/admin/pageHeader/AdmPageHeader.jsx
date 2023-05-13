import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./AdmPageHeader.css";

const AdmPageHeader = (props) => {
  const { pagina, pesquisar } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    let texto = document.getElementById("buscarTitulo").value;
    pesquisar(texto);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <span className="titulo-pagina fw-bold">{pagina}</span>
          </div>
          {pagina === "Instituições" && (
            <div className="col-6 d-flex align-items-center">
              <form
                onChange={handleSubmit}
                onSubmit={handleSubmit}
                className="w-100"
              >
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Digite o nome da instituição`}
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
          )}
        </div>
      </div>
    </>
  );
};

export default AdmPageHeader;
