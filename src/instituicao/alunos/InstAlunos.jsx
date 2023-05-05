import React from "react";
import InstPageHeader from "../pageHeader/InstPageHeader";
import InstNavBar from "../navBar/InstNavBar";
import "./InstAlunos.css";

const InstAlunos = () => {
  return (
    <>
      <InstNavBar />
      <div className="instituicao-header">
        <InstPageHeader pagina={"Alunos"} />
      </div>
      <div className="instituicao-body container">
        <h1>Alunos INSTITUICAO</h1>
      </div>
    </>
  );
};

export default InstAlunos;
