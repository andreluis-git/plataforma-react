import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./PageHeader.css";

const PageHeader = (props) => {
  const { pagina, buscarTemaPorTitulo } = props;
  // const [focusOrdenacaoItem, setFocusOrdenacaoItem] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    buscarTemaPorTitulo(document.getElementById("buscarTitulo").value);
    document.getElementById("buscarTitulo").value = "";
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <span className="titulo-pagina fw-bold">{pagina}</span>
            {/* {pagina.toLowerCase() === "temas" && (
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
            )} */}
          </div>
          <div className="col-6 d-flex align-items-center">
            {pagina.toLowerCase() !== "perfil" && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
