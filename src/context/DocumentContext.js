import { useState, createContext } from "react";

const DocumentContext = createContext();

function DocumentProvider({ children }) {
  const [currentDocument, setCurrentDocument] = useState({});

  return (
    <DocumentContext.Provider
      value={{
        currentDocument,
        setCurrentDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export { DocumentContext, DocumentProvider };
