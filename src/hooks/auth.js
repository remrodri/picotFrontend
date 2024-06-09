import { useState } from "react";
import { loginRequest, logoutRequest } from "../services/userService";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = async (values) => {
    try {
      const response = await loginRequest(values);
      // console.log("token::: ", response);
      if (response.success) {
        setIsAuth(true);
        localStorage.setItem("token", response.token);
      }
      // if (token) {
      //   setIsAuth(true);
      //   localStorage.setItem("token", token);
      // }
    } catch (error) {
      console.error("Error en el inicio de sesion: ", error.message);
    }
    // setIsAuth(true);
  };

  const decodeTokenRoleName = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.roleName;
      } else {
        return "";
      }
    } catch (error) {
      console.error("No hay Token para decodificar", error);
    }
  };

  const decodeTokenRandomQuestionAnswer = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken;
      } else {
        return null;
      }
    } catch (error) {
      console.error("No hay Token para decodificar: ", error);
    }
  };

  const decodedTokenFirstLogin = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.firstLogin;
      } else {
        return "";
      }
    } catch (error) {
      console.error("No hay Token para decodificar", error);
    }
  };

  const decodeTokenUserId = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
      } else {
        return "";
      }
    } catch (error) {
      console.error("No hay token para decodificar: ", error);
    }
  };

  const handleLogout = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        logoutRequest(decodedToken.userId);
      }
      setIsAuth(false);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } catch (error) {
      console.error("No hay token para decodificar: ", error);
    }
  };
  return {
    isAuth,
    handleLogin,
    decodeTokenRoleName,
    handleLogout,
    decodedTokenFirstLogin,
    decodeTokenUserId,
    decodeTokenRandomQuestionAnswer,
  };
};
export default useAuth;
