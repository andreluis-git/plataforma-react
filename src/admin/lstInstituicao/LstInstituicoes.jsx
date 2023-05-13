import React, { useEffect, useState } from "react";
import "./LstInstituicoes.css";
import AdmPageHeader from "../pageHeader/AdmPageHeader";
import AdmNavBar from "../navBar/AdmNavBar";
import { useNavigate } from "react-router-dom";
import InstituicaoService from "../../services/InstituicaoService";
import { toast } from "react-toastify";

const LstInstituicoes = () => {
  const [instituicoes, setInstituicoes] = useState();
  const navigate = useNavigate();

  const listarInstituicoes = () => {
    InstituicaoService.listarInstituicoes()
      .then((response) => {
        console.log("SUCESSO AO BUSCAR INSTITUICOES", response);
        setInstituicoes(response);
      })
      .catch((error) => {
        toast.error("Erro ao editar instituição!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const buscarInstituicaoPorNome = (nome) => {
    if (nome) {
      InstituicaoService.listarInstituicaoPorNome(nome)
        .then((response) => {
          setInstituicoes(response);
        })
        .catch((error) =>
          console.log("Erro ao  buscarInstituicaoPorNome LstInstituicoes.jsx")
        );
    } else {
      listarInstituicoes();
    }
  };

  useEffect(() => {
    listarInstituicoes();
  }, []);

  return (
    <>
      <AdmNavBar />
      <div className="admin-header">
        <AdmPageHeader
          pagina={"Instituições"}
          pesquisar={buscarInstituicaoPorNome}
        />
      </div>
      <div className="admin-body container pt-3">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-site"
            onClick={() => {
              navigate(window.location.pathname + "/novaInstituicao");
            }}
          >
            Cadastrar instituição
          </button>
        </div>
        <ul className="list-group">
          {instituicoes &&
            instituicoes.map((instituicao, idx) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={idx}
              >
                <span>{instituicao.nome}</span>
                <div>
                  <button
                    className="btn btn-site m-2 mt-0 mb-0"
                    onClick={() => {
                      navigate(
                        window.location.pathname +
                          "/editarInstituicao/" +
                          instituicao.id
                      );
                    }}
                  >
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => {}}>
                    Deletar
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default LstInstituicoes;
