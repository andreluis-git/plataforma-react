import React from "react";
import Temas from "../temas/Temas";
import Header from "../shared/Header";

const Home = (props) => {
  return (
    <>
      <div className="">
        <Header />
        <Temas pagina={props.pagina} />
      </div>
    </>
  );
};

export default Home;
