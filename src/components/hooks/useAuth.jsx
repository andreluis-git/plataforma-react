import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../services/Api";

const AuthContext = React.createContext(null);

function parseJwt(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

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
          let token = parseJwt(response.data);
          setToken(response.data);
          if (token.isInstituicao) {
            navigate("/instHome");
          } else {
            navigate("/temas");
          }
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
      setToken: setToken,
    }),
    [token, handleLogin, handleLogout, setToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
