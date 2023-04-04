import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Api from "./services/Api";

function App() {
  useEffect(() => {
    login();
  });

  const login = async () => {
    await Api
      // .post("/login", {
      //   email: "admin@email.com",
      //   password: "senha",
      // })
      .post("/login", {
        email: "aluno0@email.com",
        password: "senha",
      })
      .then((response) => {
        console.log("sucesso Login :: ", response);
        localStorage.setItem("token", response.data);
      })
      .catch((error) => {
        console.log("erro Login :: ", error);
      });
  };

  return (
    <div className="container-fluid p-0 app-style">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/temas" replace />} />
          <Route exact path="/temas" element={<Home pagina="Temas" />} />
          <Route
            exact
            path="/anunciados"
            element={<Home pagina="Anunciados" />}
          />
          <Route
            exact
            path="/candidaturas"
            element={<Home pagina="Candidaturas" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
