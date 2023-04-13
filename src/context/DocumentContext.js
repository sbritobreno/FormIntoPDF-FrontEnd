import { createContext } from "react";
import DocumentService from "../services/document/document.service";

const DocumentContext = createContext();

function DocumentProvider({ children }) {
  const {
    documentList,
    currentDocument,
    setCurrentDocument,
    getDocument,
    removeDocument,
    downloadPDF,
    attachFile,
    currentReinstatementSheet,
    setCurrentReinstatementSheet,
    getReinstatementSheet,
    editReinstatementSheet,
    downloadReinstatementSheet,
  } = DocumentService();

  return (
    <DocumentContext.Provider
      value={{
        documentList,
        currentDocument,
        setCurrentDocument,
        getDocument,
        removeDocument,
        downloadPDF,
        attachFile,
        currentReinstatementSheet,
        setCurrentReinstatementSheet,
        getReinstatementSheet,
        editReinstatementSheet,
        downloadReinstatementSheet,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export { DocumentContext, DocumentProvider };
