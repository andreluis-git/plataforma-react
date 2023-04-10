import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Perfil from "./components/perfil/Perfil";
import Temas from "./components/temas/Temas";
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
          <Route exact path="/temas" element={<Temas pagina="Temas" />} />
          <Route
            exact
            path="/anunciados"
            element={<Temas pagina="Anunciados" />}
          />
          <Route
            exact
            path="/candidaturas"
            element={<Temas pagina="Candidaturas" />}
          />
          <Route exact path="/perfil" element={<Perfil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
