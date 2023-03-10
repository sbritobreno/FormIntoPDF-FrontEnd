import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
  const {
    authenticated,
    isAdmin,
    register,
    logout,
    login,
    deleteUserAccount,
    resetPassword,
    setCurrentPdf,
    getCurrentPdf,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        authenticated,
        isAdmin,
        register,
        logout,
        login,
        deleteUserAccount,
        resetPassword,
        setCurrentPdf,
        getCurrentPdf,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
