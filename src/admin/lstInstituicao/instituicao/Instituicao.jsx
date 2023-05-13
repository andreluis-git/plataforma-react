import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InstituicaoService from "../../../services/InstituicaoService";
import AdmNavBar from "../../navBar/AdmNavBar";
import AdmPageHeader from "../../pageHeader/AdmPageHeader";
import "./Instituicao.css";

const Instituicao = () => {
  const { register, handleSubmit, setValue } = useForm();

  const [instituicao, setInstituicao] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname.includes("editarInstituicao")) {
      InstituicaoService.burcarInstituicaoPorId(
        window.location.pathname.split("/").pop()
      )
        .then((response) => {
          setInstituicao(response);
          setValue("nome", response.nome);
          setValue("email", response.email);
        })
        .catch((error) => console.log("Erro ao buscar aluno por id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (event) => {
    if (window.location.pathname.includes("editarInstituicao")) {
      let instituicaoEditada = { ...instituicao };
      Object.keys(event).map((key) => (instituicaoEditada[key] = event[key]));
      InstituicaoService.editarInstituicao(instituicaoEditada)
        .then((response) => {
          toast.success("Instituição editada com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/lstInstituicoes");
        })
        .catch((error) => {
          toast.error("Erro ao editar instituição!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      InstituicaoService.cadastrarInstituicao(event)
        .then((response) => {
          toast.success("Instituição cadastrada com sucesso!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/lstInstituicoes");
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar instituição!", {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  return (
    <>
      <AdmNavBar />
      <div className="tema-header">
        <AdmPageHeader
          pagina={instituicao ? "Editar instituição" : "Cadastrar instituição"}
        />
      </div>
      <div className="page-body container mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-2">
            <label>Nome instituição</label>
            <input
              className="form-control"
              placeholder="Digite o nome da instituição"
              {...register("nome")}
              defaultValue={instituicao ? instituicao.nome : ""}
            />
          </div>
          <div className="form-group mb-2">
            <label>E-mail instituição*</label>
            <input
              className="form-control"
              placeholder="Digite o e-mail da instituição"
              {...register("email")}
              defaultValue={instituicao ? instituicao.email : ""}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-site mt-2 mb-2"
              style={{ minWidth: "110px" }}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Instituicao;
