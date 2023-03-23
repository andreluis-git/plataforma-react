import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import "./Header.css";

const Header = (props) => {
  const [temasDropdown, setTemasDropdown] = useState(false);
  const dropMenu = useRef(null);

  const closeOpenMenus = (e) => {
    if (
      dropMenu.current &&
      temasDropdown &&
      !dropMenu.current.contains(e.target)
    ) {
      setTemasDropdown(false);
    }
  };

  document.addEventListener("mousedown", closeOpenMenus);

  return (
    <>
      <div className="header">
        <div className="container d-flex justify-content-between">
          <div className="d-flex align-items-center itens-esquerda">
            <img src={logo} alt="logo" className="logo-bg" />
            <div
              className={"btn-header"}
              onClick={(e) => {
                props.setPaginaSelecionada(e.target.innerText);
              }}
            >
              TEMAS
            </div>
            <div className={"btn-header"}>ANUNCIAR TEMA</div>
          </div>
          <div className="d-flex align-items-center itens-direita">
            <div>
              <div onClick={() => setTemasDropdown(!temasDropdown)}>
                <div ref={dropMenu} className={"btn-header"}>
                  MEUS TEMAS
                </div>
              </div>
              <div
                className={`dropdown-menu ${temasDropdown ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
                ref={dropMenu}
              >
                <div
                  className="dropdown-item"
                  onClick={(e) => {
                    props.setPaginaSelecionada(e.target.innerText);
                    setTemasDropdown(false);
                  }}
                >
                  Anunciados
                </div>
                <div
                  className="dropdown-item"
                  onClick={(e) => {
                    props.setPaginaSelecionada(e.target.innerText);
                    setTemasDropdown(false);
                  }}
                >
                  Candidaturas
                </div>
              </div>
            </div>
            <div className="perfil-icon">
              <AccountCircleIcon
                style={{ width: "45px", height: "45px", color: "white" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
