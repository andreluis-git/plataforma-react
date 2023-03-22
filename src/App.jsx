import React, { useEffect } from "react";
import "./App.css";
import Api from "./services/Api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

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
        email: "aluno1@email.com",
        password: "senha",
      })
      .then((response) => {
        console.log("sucesso::: ", response);
        localStorage.setItem("token", response.data);
      })
      .catch((error) => {
        console.log("erro:::: ", error);
      });
  };

  return (
    <div className="container">
      <Router>
        <div>
          <Routes>
            <Route exact path="/temas" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
