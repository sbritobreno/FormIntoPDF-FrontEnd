import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useFlashMessage from "./useFlashMEssage";

export default function useAuth() {
  const [token] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  
  async function login(user) {
    let msgText = "You are now logged in!";
    let msgType = "success";
    
    await authUser();
    setFlashMessage(msgText, msgType);
  }
  
  async function logout() {
  }

  async function register(user) {
  }
  
  async function deleteUserAccount() {
  }

  async function resetPassword() {
  }
  
  async function authUser() {
    navigate("/");
  }

  return { register, logout, login, deleteUserAccount, resetPassword };
}
