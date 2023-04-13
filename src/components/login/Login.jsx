import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { onLogin } = useAuth();

  return (
    // <div className="container login-body">
    //   <form onSubmit={handleSubmit(onLogin)}>
    //     <label>E-mail</label>
    //     <input type="text" {...register("email")} />
    //     <label>Senha</label>
    //     <input type="password" {...register("senha")} />
    //     <button className="btn btn-site" type="submit">
    //       Entrar
    //     </button>
    //   </form>
    // </div>

    <div className="login-body">
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="card-header d-flex justify-content-center">
            <h5 className="card-title">Login</h5>
          </div>
          <div className="card-body m-5 mt-0">
            <div className="d-flex justify-content-center">
              <PersonOutlineIcon
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </div>
            <form onSubmit={handleSubmit(onLogin)} className=".form-signin">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  {...register("email")}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                  {...register("senha")}
                  required
                />
              </div>
              {/* <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              {...register("lembrar")}
            />
            <label className="form-check-label" for="exampleCheck1">
              {" "}
              Lembre-se de mim{" "}
            </label>
          </div> */}
              <div>
                <button className="btn btn-site w-100" type="submit">
                  Entrar
                </button>
              </div>
            </form>
            <Link>Esqueceu a senha?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
