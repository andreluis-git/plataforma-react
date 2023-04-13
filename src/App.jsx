import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import { AuthProvider } from "./components/hooks/useAuth";
import Login from "./components/login/Login";
import Perfil from "./components/perfil/Perfil";
import Temas from "./components/temas/Temas";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <div className="container-fluid p-0 app-style">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Login />} />
            <Route
              exact
              path="/temas"
              element={
                <ProtectedRoute>
                  <Temas pagina="Temas" />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/anunciados"
              element={
                <ProtectedRoute>
                  <Temas pagina="Anunciados" />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/candidaturas"
              element={
                <ProtectedRoute>
                  <Temas pagina="Candidaturas" />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
