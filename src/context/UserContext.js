import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const UserContext = createContext();

function UserProvider({ children }) {
  const {
    login,
    logout,
    checkIfUserIsAdmin,
    register,
    deleteUserAccount,
    deleteUserAccountByAdmin,
    resetPassword,
    currentUser,
    authenticated,
    isAdmin,
  } = useAuth();

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        checkIfUserIsAdmin,
        register,
        deleteUserAccount,
        deleteUserAccountByAdmin,
        resetPassword,
        currentUser,
        authenticated,
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
