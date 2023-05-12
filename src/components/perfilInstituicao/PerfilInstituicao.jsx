import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageHeader from "../shared/pageHeader/PageHeader";

import InstNavBar from "../../instituicao/navBar/InstNavBar";
import InstituicaoService from "../../services/InstituicaoService";
import "./PerfilInstituicao.css";

import { toast } from "react-toastify";

const PerfilInstituicao = (props) => {
  const { register, handleSubmit, setValue } = useForm();
  const [instituicao, setInstituicao] = useState(true);

  useEffect(() => {
    InstituicaoService.burcarInstituicao()
      .then((response) => {
        setInstituicao(response);
        setValue("id", response.id);
        setValue("nome", response.nome);
        setValue("email", response.email);
        console.log(response);
      })
      .catch((error) => console.log("Perfil.js buscarAluno ", error));
  }, [setValue]);

  const onSubmit = (event) => {
    console.log("Perfil instituicao", event);
    InstituicaoService.editarInstituicao(event)
      .then((response) => {
        console.log("Instituição editada com sucesso");
        toast.success("Perfil editado com sucesso!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Erro ao editar perfil!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Erro ao editar instituição PerfilInstituicao.jsx");
      });
  };

  return (
    <>
      <InstNavBar />
      <div className="tema-header">
        <PageHeader pagina={"Perfil"} />
      </div>
      {instituicao && (
        <div className="page-body container mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
              <label>Nome Instituicao</label>
              <input
                className="form-control"
                placeholder="Digite o nome da instituição"
                {...register("nome")}
              />
            </div>
            <div className="form-group mb-2">
              <label>E-mail*</label>
              <input className="form-control" {...register("email")} disabled />
            </div>
            <hr
              className="separador"
              style={{ color: "var(--st-fontePageHeader)" }}
            />
            <h5 className="mb-2" style={{ color: "var(--st-fontePageHeader)" }}>
              Alterar senha
            </h5>
            <div className="form-group mb-2 d-flex justify-content-between">
              <div style={{ width: "48%" }}>
                <label>Senha atual</label>
                <input
                  className="form-control"
                  {...register("senhaAtual")}
                  placeholder="Digite sua senha atual"
                  type="password"
                />
              </div>
              <div style={{ width: "48%" }}>
                <label>Nova senha</label>
                <input
                  className="form-control"
                  {...register("senhaNova")}
                  placeholder="Digite sua nova senha"
                  type="password"
                />
              </div>
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
      )}
    </>
  );
};

export default PerfilInstituicao;
