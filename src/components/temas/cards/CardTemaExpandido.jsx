import PrintIcon from "@mui/icons-material/Print";
import React, { useRef, useState } from "react";
import PrintTema from "../../../utils/PrintTemaUtil";
import "./CardTemaExpandido.css";

// ADICIONAR BOTÃO PARA DAR LIKE NOS TEMAS QUE GOSTA

const CardTemaExpandido = (props) => {
  const [shareDropdown, setShareDropdown] = useState(false);
  const dropMenu = useRef(null);
  const { temaAtivo } = props;

  const closeOpenMenus = (e) => {
    if (
      dropMenu.current &&
      shareDropdown &&
      !dropMenu.current.contains(e.target)
    ) {
      setShareDropdown(false);
    }
  };

  document.addEventListener("mousedown", closeOpenMenus);

  return (
    <>
      {props.temaAtivo && (
        <div className="card" id="tema-expandido-id">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{temaAtivo.titulo}</h5>
              <span>{temaAtivo.dataCriacao}</span>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">
              {temaAtivo.criadorTema.cursoAluno.nome}
            </h6>
            <hr className="separador" />
            <div className="d-flex align-items-center">
              <button className="btn btn-dark">Candidatar-se</button>
              {/* <div className="card-icons" style={{ marginLeft: "10px" }}>
                <div onClick={() => setShareDropdown(!shareDropdown)}>
                  <ShareIcon ref={dropMenu} className="m-2" />
                </div>
                <div
                  className={`dropdown-menu ${shareDropdown ? "show" : ""}`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="dropdown-item">Whatsapp</div>
                  <div className="dropdown-item">Another action</div>
                  <div className="dropdown-item">Something else here</div>
                </div>
              </div> */}
              <div
                className="card-icons ml-2"
                onClick={() => PrintTema.print(temaAtivo)}
                style={{ marginLeft: "10px" }}
              >
                <PrintIcon className="m-2" />
              </div>
            </div>
            <p className="card-text mt-3">{temaAtivo.descricao}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CardTemaExpandido;
