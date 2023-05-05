import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { rxSetTemaEdicao } from "../../../redux/slices/editarTemaSlice";
import { rxSetListaTemas } from "../../../redux/slices/listaTemasSlice";
import { rxSetShowNovoTemaModal } from "../../../redux/slices/showNovoTemaModalSlice";
import TemaService from "../../../services/TemaService";
import { useAuth } from "../../hooks/useAuth";
import NovoTemaModal from "../../temas/modais/NovoTemaModal";
import "./Header.css";

const Header = (props) => {
  const showNovoTemaModal = useSelector(
    (state) => state.showNovoTemaModal.showModal
  );

  const dispatch = useDispatch();

  const { onLogout } = useAuth();

  const buscarTemasLista = useCallback(
    (pagina) => {
      TemaService.buscarTemaPorPagina(pagina).then((response) => {
        dispatch(rxSetListaTemas(response));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    buscarTemasLista(window.location.pathname.replace("/", ""));
  }, [buscarTemasLista]);

  return (
    <>
      <div className="header">
        <div className="container d-flex justify-content-between">
          <div className="d-flex align-items-center itens-esquerda">
            <img src={logo} alt="logo" className="logo-bg" />
            <Link to="/temas" style={{ textDecoration: "none" }}>
              <button
                type="button"
                className="btn btn-site fw-bold mr-1"
                onClick={() => buscarTemasLista("temas")}
              >
                Temas
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-site fw-bold"
              onClick={() => {
                dispatch(rxSetShowNovoTemaModal(true));
                dispatch(rxSetTemaEdicao(null));
                buscarTemasLista(window.location.pathname.replace("/", ""));
              }}
            >
              Anunciar tema
            </button>
          </div>
          <div className="d-flex align-items-center itens-direita">
            <div className="custom-dropdown" style={{ left: "left" }}>
              <button
                type="button"
                className="btn btn-site"
                style={{ cursor: "default" }}
              >
                <span className="fw-bold">Meus temas</span>
                <ArrowDropDownIcon fontSize="small" />
              </button>
              <div className={"custom-dropdown-content"} style={{ left: "0" }}>
                <Link
                  to="/anunciados"
                  style={{ textDecoration: "none" }}
                  onClick={() => buscarTemasLista("anunciados")}
                >
                  Anunciados
                </Link>
                <Link
                  to="/candidaturas"
                  style={{ textDecoration: "none" }}
                  onClick={() => buscarTemasLista("candidaturas")}
                >
                  Candidaturas
                </Link>
              </div>
            </div>
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
                <Link to="/perfil" style={{ textDecoration: "none" }}>
                  Perfil
                </Link>
                <Link onClick={onLogout}>Logout</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showNovoTemaModal && <NovoTemaModal />}
    </>
  );
};

export default Header;
