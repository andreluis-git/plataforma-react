import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./InstNavBar.css";
import { useAuth } from "../../components/hooks/useAuth";

const InstNavBar = (props) => {
  const { onLogout } = useAuth();

  return (
    <>
      <div className="header">
        <div className="container d-flex justify-content-between">
          <div className="d-flex align-items-center itens-esquerda">
            <img src={logo} alt="logo" className="logo-bg" />
            <Link to="/instCursos" style={{ textDecoration: "none" }}>
              <button
                type="button"
                className="btn btn-site fw-bold mr-1"
                onClick={() => {}}
              >
                Cursos
              </button>
            </Link>
            <Link to="/instAlunos" style={{ textDecoration: "none" }}>
              <button
                type="button"
                className="btn btn-site fw-bold mr-1"
                onClick={() => {}}
              >
                Alunos
              </button>
            </Link>
          </div>
          <div className="d-flex align-items-center itens-direita">
            <div className={"custom-dropdown"} style={{ float: "right" }}>
              <div className="btn-perfil btn-icon ml-1">
                <PersonOutlineIcon
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className={"custom-dropdown-content"}>
                <Link
                  to="/perfilInstituicao"
                  style={{ textDecoration: "none" }}
                >
                  Perfil
                </Link>
                <Link onClick={onLogout}>Sair</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstNavBar;
