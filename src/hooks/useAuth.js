import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useFlashMessage from "./useFlashMessage";
import { pdfsData } from "../data";

export default function useAuth() {
  //const [token] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [pdf, setPdf] = useState({});
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  if (authenticated && isAdmin) {
    //this block can be deleted
  }

  async function setCurrentPdf(id = 0) {
    setPdf({});
    localStorage.removeItem("curentPdf");

    if (id > 0) {
      const document = pdfsData.filter((doc) => {
        return doc.id === +id;
      });

      setPdf(document[0]);
      localStorage.setItem("curentPdf", JSON.stringify(pdf));
    }
  }

  function getCurrentPdf() {
    return pdf;
  }

  async function login(user) {
    let msgText = "You are now logged in!";
    let msgType = "success";

    await authUser();
    await checkIfUserIsAdmin();
    setFlashMessage(msgText, msgType);
  }

  async function logout() {
    const msgText = "You are now logged out!";
    const msgType = "success";

    setAuthenticated(false);
    navigate("/login");

    setFlashMessage(msgText, msgType);
  }

  async function register(user) {
    let msgText = "A new user was created!";
    let msgType = "success";

    await authUser();
    setFlashMessage(msgText, msgType);
  }

  async function deleteUserAccount() {}

  async function resetPassword() {}

  async function authUser() {
    navigate("/FormIntoPDF-FrontEnd");
  }

  async function checkIfUserIsAdmin() {
    if (true) {
      setIsAdmin(true);
    }
  }

  return {
    register,
    logout,
    login,
    deleteUserAccount,
    resetPassword,
    setCurrentPdf,
    getCurrentPdf,
    isAdmin,
  };
}
