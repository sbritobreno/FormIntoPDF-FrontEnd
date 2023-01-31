import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useFlashMessage from "./useFlashMEssage";

export default function useAuth() {
  //const [token] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  if(authenticated){
    //this block can be deleted
  }
  
  async function login(user) {
    let msgText = "You are now logged in!";
    let msgType = "success";
    
    await authUser();
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
  
  async function deleteUserAccount() {
  }

  async function resetPassword() {
  }
  
  async function authUser() {
    navigate("/FormIntoPDF-FrontEnd");
  }

  return { register, logout, login, deleteUserAccount, resetPassword };
}
