import React from "react";
import { useSelector } from "react-redux";
import NovoTemaModal from "../modais/NovoTemaModal";
import Header from "../shared/Header";
import Temas from "../temas/Temas";

const Home = (props) => {
  // const [showNovoTemaModal, setShowNovoTemaModal] = useState(false);
  const showNovoTemaModal = useSelector(
    (state) => state.showNovoTemaModal.showModal
  );

  return (
    <>
      <div className="">
        <Header />
        <Temas pagina={props.pagina} />
      </div>
      {showNovoTemaModal && <NovoTemaModal />}
    </>
  );
};

export default Home;
