import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./ListaTemas.css";

function ListaTemas() {
  const [temas, setTemas] = useState(undefined);
  const [showCard, setShowCard] = useState(null);

  useEffect(() => {
    listarTemas();
  }, []);

  useEffect(() => {
    console.log(temas);
  }, [temas]);

  const listarTemas = async () => {
    await api
      .get("/tema/listarTemas", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("get sucesso: ", response.data);
        setTemas(response.data);
      })
      .catch((error) => {
        console.log("erro get :: ", error);
      });
  };

  return (
    <div>
      {temas &&
        temas.map((tema, index) => (
          <div className="card" key={index}>
            <div
              className="card-header card-item"
              onClick={() => {
                showCard === index ? setShowCard(null) : setShowCard(index);
              }}
            >
              <span>{`${index}# ${tema.titulo}`}</span>
            </div>
            <div className={`collapse ${showCard === index ? "show" : ""}`}>
              <div className="card-body">
                <span>{tema.descricao}</span>
              </div>
              <button type="button" className="btn btn-primary m-3">
                Candidatar-se
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListaTemas;
