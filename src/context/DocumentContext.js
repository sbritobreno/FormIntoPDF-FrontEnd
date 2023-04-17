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
    newDocument,
    addAttendance,
    removeAttendance,
    updateSiteSetup,
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
    removeHoleSequenceImage,
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
        newDocument,
        addAttendance,
        removeAttendance,
        updateSiteSetup,
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
        removeHoleSequenceImage,
        removeHoleSequence,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export { DocumentContext, DocumentProvider };
