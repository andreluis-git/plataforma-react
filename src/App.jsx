import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PerfilAluno from "./components/perfilAluno/PerfilAluno";
import PerfilInstituicao from "./components/perfilInstituicao/PerfilInstituicao";
import Temas from "./components/temas/Temas";
import InstHome from "./instituicao/home/InstHome";
import InstCursos from "./instituicao/lstCursos/InstCursos";
import InstAlunos from "./instituicao/alunos/InstAlunos";
import Curso from "./instituicao/lstCursos/curso/Curso";
import AlterarAluno from "./instituicao/alunos/alterarAluno/AlterarAluno";
import LstInstituicoes from "./admin/lstInstituicao/LstInstituicoes";
import Instituicao from "./admin/lstInstituicao/instituicao/Instituicao";

function App() {
  return (
    <Routes>
      {/* ROTAS ADM */}
      <Route
        exact
        path="/lstInstituicoes"
        element={
          <ProtectedRoute>
            <LstInstituicoes />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/lstInstituicoes/editarInstituicao/:id"
        element={
          <ProtectedRoute>
            <Instituicao />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/lstInstituicoes/novaInstituicao"
        element={
          <ProtectedRoute>
            <Instituicao />
          </ProtectedRoute>
        }
      />

      {/* ROTAS INSTITUICAO */}
      <Route
        exact
        path="/instHome"
        element={
          <ProtectedRoute>
            <InstHome />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/instCursos"
        element={
          <ProtectedRoute>
            <InstCursos />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/instAlunos"
        element={
          <ProtectedRoute>
            <InstAlunos />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/instAlunos/alterarAluno/:id"
        element={
          <ProtectedRoute>
            <AlterarAluno />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/instAlunos/novoAluno"
        element={
          <ProtectedRoute>
            <AlterarAluno />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/instCursos/novoCurso"
        element={
          <ProtectedRoute>
            <Curso />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/instCursos/editarCurso/:id"
        element={
          <ProtectedRoute>
            <Curso />
          </ProtectedRoute>
        }
      />

      {/* ROTAS USUARIO */}
      <Route exact path="/home" element={<Home />} />
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
        path="/perfilAluno"
        element={
          <ProtectedRoute>
            <PerfilAluno />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/perfilInstituicao"
        element={
          <ProtectedRoute>
            <PerfilInstituicao />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
