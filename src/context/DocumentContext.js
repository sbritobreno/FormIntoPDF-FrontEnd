import { createContext } from "react";
import DocumentService from "../services/document/document.service";

const DocumentContext = createContext();

function DocumentProvider({ children }) {
  const {
    documentList,
    getDocumentList,
    currentDocument,
    setCurrentDocument,
    getDocument,
    removeDocument,
    downloadPDF,
    attachFile,
    currentReinstatementSheet,
    setCurrentReinstatementSheet,
    getReinstatementSheet,
    editReinstatementSheetInfo,
    downloadReinstatementSheet,
    createHoleSequence,
    editHoleSequence,
    removeHoleSequence,
  } = DocumentService();

  return (
    <DocumentContext.Provider
      value={{
        documentList,
        getDocumentList,
        currentDocument,
        setCurrentDocument,
        getDocument,
        removeDocument,
        downloadPDF,
        attachFile,
        currentReinstatementSheet,
        setCurrentReinstatementSheet,
        getReinstatementSheet,
        editReinstatementSheetInfo,
        downloadReinstatementSheet,
        createHoleSequence,
        editHoleSequence,
        removeHoleSequence,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export { DocumentContext, DocumentProvider };
