import React, { useEffect, useState } from "react";
import Temas from "../temas/Temas";
import Header from "../shared/Header";

const Home = () => {
  const [paginaSelecionada, setPaginaSelecionada] = useState("TEMAS");

  return (
    <>
      <div className="">
        <Header setPaginaSelecionada={setPaginaSelecionada} />
        <Temas paginaSelecionada={paginaSelecionada} />
      </div>
    </>
  );
};

export default Home;
