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
    await api
      .post("/user/login", user)
      .then((response) => {
        setFlashMessage("You are now logged in!", "success");
        authUser(response.data);
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  }

  async function logout() {
    setAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser({});
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/login");

    setFlashMessage("You are now logged out!", "success");
  }

  async function register(user) {
    let msgType = "success";

    await api
      .post("/user/register", user)
      .then((response) => {
        setFlashMessage("A new user was created!", msgType);
      })
      .catch((err) => {
        msgType = "error";
        setFlashMessage(err.response.data.message, msgType);
      });

    if (msgType === "error") return false;
    if (msgType === "success") return true;
  }

  async function deleteUserAccount() {
    await api
      .delete("/user/deleteaccount", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })

      .then((response) => {
        setFlashMessage("Account deleted!", "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });

    setAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser({});
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/login");
  }

  async function deleteUserAccountByAdmin(username, id) {
    await api
      .delete(`/user/deleteaccount/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFlashMessage(`${username}'s account deleted!`, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
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
    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    await api
      .patch(`/user/edit`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage("Something went wrong!", "error");
      });
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
