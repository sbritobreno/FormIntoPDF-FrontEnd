import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const [token] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, [token]);

  async function login(user) {
    let msgText = "You are now logged in!";
    let msgType = "success";

    try {
      const data = await api.post("/user/login", user).then((response) => {
        msgText = response.data.message;
        return response.data;
      });

      await authUser(data);
      await checkIfUserIsAdmin();
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/home");
  }

  async function logout() {
    const msgText = "You are now logged out!";
    const msgType = "success";

    setAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/login");

    setFlashMessage(msgText, msgType);
  }

  async function checkIfUserIsAdmin() {
    try {
      const data = await api
        .get("/user/checkuser", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          return response.data;
        });
      if (data.admin) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function register(user) {
    let msgText = "A new user was created!";
    let msgType = "success";

    try {
      await api.post("/user/register", user).then((response) => {
        return response.data;
      });
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function deleteUserAccount() {
    let msgText = "Account deleted!";
    let msgType = "success";

    try {
      await api
        .delete("/user/deleteaccount", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/login");

    setFlashMessage(msgText, msgType);
  }

  async function deleteUserAccountByAdmin(username, id) {
    let msgText = `${username}'s account deleted!`;
    let msgType = "success";

    try {
      await api
        .delete(`/user/deleteaccount/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function resetPassword(email) {
    let msgText = `A new password was sent to ${email}`;
    let msgType = "success";

    try {
      await api.patch("/user/resetpassword", email).then((response) => {
        return response.data;
      });
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  return {
    login,
    logout,
    checkIfUserIsAdmin,
    register,
    deleteUserAccount,
    deleteUserAccountByAdmin,
    resetPassword,
    authenticated,
    isAdmin,
  };
}
