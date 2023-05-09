import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rxSetTemaEdicao } from "../../redux/slices/editarTemaSlice";
import { rxSetListaTemas } from "../../redux/slices/listaTemasSlice";
import { rxSetShowNovoTemaModal } from "../../redux/slices/showNovoTemaModalSlice";
import TemaService from "../../services/TemaService";
import Header from "../shared/header/Header";
import PageHeader from "../shared/pageHeader/PageHeader";
import "./Temas.css";
import CollapsibleCardTema from "./collapsibleCardTema/CollapsibleCardTema";
import ModalConfirmacao from "../shared/modalConfirmacao/ModalConfirmacao";
import { toast } from "react-toastify";

function Temas(props) {
  const temas = useSelector((state) => state.listaTemas.temas);

  const [temaExclusao, setTemaExclusao] = useState();

  const showModalConfirmacao = useSelector(
    (state) => state.showModalConfirmacao.showModal
  );

  const dispatch = useDispatch();

  const buscarTemaPorTitulo = (texto) => {
    switch (window.location.pathname) {
      case "/temas":
        TemaService.buscarTemasPorTitulo(texto)
          .then((response) => {
            dispatch(rxSetListaTemas(response));
          })
          .catch((error) => console.log("Temas.js buscarTemaPorTitulo", error));
        break;
      case "/anunciados":
        TemaService.buscarTemasAnunciadosPorTitulo(texto)
          .then((response) => {
            dispatch(rxSetListaTemas(response));
          })
          .catch((error) =>
            console.log("Temas.js buscarTemasAnunciadosPorTitulo", error)
          );
        break;
      case "/candidaturas":
        TemaService.buscarTemasCandidaturasPorTitulo(texto)
          .then((response) => {
            dispatch(rxSetListaTemas(response));
          })
          .catch((error) =>
            console.log("Temas.js buscarTemasCandidaturasPorTitulo", error)
          );
        break;
      default:
        dispatch(rxSetListaTemas([]));
    }
  };

  const deletarTema = () => {
    TemaService.deletarTema(temaExclusao.id)
      .then(() => {
        console.log("Tema deletado:: ", temaExclusao);
        TemaService.buscarTemaPorPagina(
          window.location.pathname.replace("/", "")
        ).then((response) => {
          dispatch(rxSetListaTemas(response));
          toast.success("Tema deletado com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      })
      .catch((error) => {
        toast.error("Erro ao deletar tema!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Erro ao deletar tema:: ", temaExclusao);
      });
  };

  return (
    <>
      <Header />
      <div className="tema-header">
        <PageHeader
          pagina={props.pagina}
          buscarTemaPorTitulo={buscarTemaPorTitulo}
        />
      </div>
      <div className="tema-body container pt-3">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-site mb-3"
            onClick={() => {
              dispatch(rxSetTemaEdicao(null));
              dispatch(rxSetShowNovoTemaModal(true));
            }}
          >
            Novo tema
          </button>
        </div>
        {temas &&
          temas.map((tema, idx) => (
            <CollapsibleCardTema
              tema={tema}
              key={idx}
              hasCandidatos={tema.candidatosTema.length > 0 ? true : false}
              setTemaExclusao={setTemaExclusao}
            ></CollapsibleCardTema>
          ))}
      </div>
      {showModalConfirmacao && (
        <ModalConfirmacao
          titulo="Excluir tema"
          descricao="Deseja realmente excluir o tema selecionado?"
          confirmar={deletarTema}
        />
      )}
    </>
  );
}

export default Temas;
