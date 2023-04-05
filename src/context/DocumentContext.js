import { useState, createContext } from "react";

const Context = createContext();

function DocumentProvider({ children }) {
  const [currentDocument, setCurrentDocument] = useState({});

  return (
    <Context.Provider
      value={{
        currentDocument,
        setCurrentDocument,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, DocumentProvider };
