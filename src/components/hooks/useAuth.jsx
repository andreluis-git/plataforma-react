import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../services/Api";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = React.useState(null);

  const handleLogin = useCallback(
    (data) => {
      console.log(data);
      Api.post("/login", {
        // email: "aluno2@email.com",
        // password: "senha",
        email: data.email,
        password: data.senha,
      })
        .then((response) => {
          console.log("sucesso Login :: ", response);
          localStorage.setItem("token", response.data);
          setToken(response);
          navigate("/temas");
        })
        .catch((error) => {
          console.log("erro Login :: ", error);
        });
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const value = useMemo(
    () => ({
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }),
    [token, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
