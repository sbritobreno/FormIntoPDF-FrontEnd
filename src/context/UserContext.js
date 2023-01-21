import { createContext } from "react";

const Context = createContext();

function UserProvider({ children }) {
  return <Context.Provider>{children}</Context.Provider>;
}

export { Context, UserProvider };
