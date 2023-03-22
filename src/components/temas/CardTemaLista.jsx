import React from "react";

const CardLista = (props) => {
  const { temas } = props;

  return (
    <>
      {temas &&
        temas.map((tema, idx) => (
          <div
            className="card m-1 w-100 card-lista"
            key={idx}
            onClick={() => props.setTemaAtivo(tema)}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{tema.titulo}</h5>
                <span>{tema.dataCriacao}</span>
              </div>
              <p className="card-text">{tema.descricao}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardLista;
