import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { onLogin } = useAuth();

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <label>E-mail</label>
      <input type="text" {...register("email")} />
      <label>Senha</label>
      <input type="password" {...register("senha")} />
      <button className="btn btn-primary" type="submit">
        Entrar
      </button>
    </form>
  );
};

export default Login;
