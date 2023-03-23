import React from "react";

function truncate(str, length) {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  } else return str;
}

const CardLista = (props) => {
  const { temas } = props;

  return (
    <>
      {temas &&
        temas.map((tema, idx) => (
          <div
            className="card mb-2 card-lista"
            key={idx}
            onClick={() => props.setTemaAtivo(tema)}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{tema.titulo}</h5>
                <span>{tema.dataCriacao}</span>
              </div>
              <p className="card-text">{truncate(tema.descricao, 300)}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardLista;
