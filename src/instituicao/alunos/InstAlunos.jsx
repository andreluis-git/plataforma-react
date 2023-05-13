import React, { useEffect, useState } from "react";
import AlunoService from "../../services/AlunoService";
import InstNavBar from "../navBar/InstNavBar";
import InstPageHeader from "../pageHeader/InstPageHeader";

import { useNavigate } from "react-router-dom";
import "./InstAlunos.css";
import { toast } from "react-toastify";

const InstAlunos = () => {
  const [alunos, setAlunos] = useState();

  useEffect(() => {
    buscarAlunosPorInstituicaoId();
  }, []);

  const navigate = useNavigate();

  const buscarAlunosPorInstituicaoId = () => {
    AlunoService.buscarAlunosPorInstituicaoId()
      .then((response) => {
        setAlunos(response);
      })
      .catch((error) => console.log("Erro ao buscarAlunos", error));
  };

  const buscarAlunosPorInstituicaoIdAndEmail = (texto) => {
    if (texto) {
      AlunoService.buscarAlunosPorInstituicaoIdAndEmail(texto)
        .then((response) => {
          setAlunos(response);
        })
        .catch((error) =>
          console.log("Erro ao buscarAlunosPorInstituicaoIdAndEmail", error)
        );
    } else {
      buscarAlunosPorInstituicaoId();
    }
  };

  const alterarStatusAluno = (alunoId) => {
    AlunoService.alterarStatusAluno(alunoId)
      .then((response) => {
        toast.success("Sucesso ao alterar status do aluno!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        let texto = document.getElementById("buscarTitulo").value;
        if (texto) {
          buscarAlunosPorInstituicaoIdAndEmail(texto);
        } else {
          buscarAlunosPorInstituicaoId();
        }
      })
      .catch((error) => {
        toast.error("Erro ao alterar status do aluno!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const deletarAluno = (alunoId) => {
    AlunoService.deletarAluno(alunoId)
      .then((response) => {
        toast.success("Sucesso ao deletar aluno!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        buscarAlunosPorInstituicaoIdAndEmail(
          document.getElementById("buscarTitulo").value
        );
      })
      .catch((error) => {
        toast.error("Erro ao deletar aluno!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <InstNavBar />
      <div className="instituicao-header">
        <InstPageHeader
          pagina={"Alunos"}
          pesquisar={buscarAlunosPorInstituicaoIdAndEmail}
        />
      </div>
      <div className="instituicao-body container pt-3">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-site"
            onClick={() => {
              navigate(window.location.pathname + "/novoAluno");
            }}
          >
            Cadastrar aluno
          </button>
        </div>
        <ul className="list-group lst-group-alunos">
          {alunos &&
            alunos.map((aluno, idx) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={idx}
              >
                <span>{aluno.nome}</span>
                <span>{aluno.email}</span>
                <div>
                  <button
                    className="btn btn-site m-2 mt-0 mb-0"
                    onClick={() => {
                      alterarStatusAluno(aluno.id);
                    }}
                  >
                    {aluno.ativo ? "Desativar" : "Ativar"}
                  </button>
                  <button
                    className="btn btn-site m-2 mt-0 mb-0"
                    onClick={() => {
                      navigate(
                        `${window.location.pathname}/alterarAluno/${aluno.id}`
                      );
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deletarAluno(aluno.id);
                    }}
                  >
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

export default InstAlunos;
