import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFlashMessage from "../../hooks/useFlashMessage";

export default function UserService() {
  const [currentUser, setCurrentUser] = useState({});
  const [userList, setUserList] = useState([]);
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

      // Get current user
      api
        .get("/user/checkuser", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          setCurrentUser(response.data);
          if (response.data.admin) {
            setIsAdmin(true);
          }
        })
        .catch((err) => {
          return err.response.data;
        });
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  // Get list of users
  async function getUsersList() {
    api
      .get("/user/allusers", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUserList(response.data.users);
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function login(user) {
    let msgText = "You are now logged in!";
    let msgType = "success";

    try {
      const data = await api.post("/user/login", user).then((response) => {
        msgText = response.data.message;
        return response.data;
      });

      await authUser(data);
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
    setCurrentUser({});
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/login");

    setFlashMessage(msgText, msgType);
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

    if (msgType === "error") return false;
    if (msgType === "success") return true;
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
    setCurrentUser({});
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

  async function resetPassword(user) {
    let msgText = `A new password was sent to ${user.email}`;
    let msgType = "success";

    try {
      await api.patch("/user/resetpassword", user).then((response) => {
        return response.data;
      });
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function updateProfile(user) {
    let msgType = "success";
    const formData = new FormData();

    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    const data = await api
      .patch(`/user/edit`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function toggleUserAdmin(id) {
    await api
      .patch(`/user/toggleuseradmin/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  return {
    setCurrentUser,
    currentUser,
    authenticated,
    isAdmin,
    userList,
    getUsersList,
    login,
    logout,
    register,
    deleteUserAccount,
    deleteUserAccountByAdmin,
    resetPassword,
    updateProfile,
    toggleUserAdmin,
  };
}
