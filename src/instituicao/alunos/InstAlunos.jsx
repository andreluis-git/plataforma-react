import React, { useEffect, useState } from "react";
import AlunoService from "../../services/AlunoService";
import InstNavBar from "../navBar/InstNavBar";
import InstPageHeader from "../pageHeader/InstPageHeader";

import "./InstAlunos.css";

const InstAlunos = () => {
  const [alunos, setAlunos] = useState();

  useEffect(() => {
    buscarAlunosPorInstituicaoId();
  }, []);

  const buscarAlunosPorInstituicaoId = () => {
    AlunoService.buscarAlunosPorInstituicaoId()
      .then((response) => {
        setAlunos(response);
      })
      .catch((error) => console.log("Erro ao buscarAlunos"));
  };

  const buscarAlunosPorInstituicaoIdAndEmail = (texto) => {
    AlunoService.buscarAlunosPorInstituicaoIdAndEmail(texto)
      .then((response) => {
        setAlunos(response);
      })
      .catch((error) =>
        console.log("Erro ao buscarAlunosPorInstituicaoIdAndEmail")
      );
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
          <button className="btn btn-site">Cadastrar aluno</button>
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
                    onClick={() => {}}
                  >
                    Editar
                  </button>
                  <button className="btn btn-danger">Deletar</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default InstAlunos;
