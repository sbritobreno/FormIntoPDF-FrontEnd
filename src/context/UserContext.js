import { createContext } from "react";
import UserService from "../services/user/user.service";

const UserContext = createContext();

function UserProvider({ children }) {
  const {
    setCurrentUser,
    currentUser,
    authenticated,
    isAdmin,
    userList,
    login,
    logout,
    register,
    deleteUserAccount,
    deleteUserAccountByAdmin,
    resetPassword,
    updateProfile,
    toggleUserAdmin,
  } = UserService();

  return (
    <UserContext.Provider
      value={{
        setCurrentUser,
        currentUser,
        authenticated,
        isAdmin,
        userList,
        login,
        logout,
        register,
        deleteUserAccount,
        deleteUserAccountByAdmin,
        resetPassword,
        updateProfile,
        toggleUserAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
