import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div>Home</div>
      <button className="btn btn-site" onClick={() => navigate("/login")}>
        Login
      </button>
    </>
  );
};

export default Home;
