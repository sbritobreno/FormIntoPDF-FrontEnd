import { createContext } from "react";
import DocumentService from "../services/document/document.service";

const DocumentContext = createContext();

function DocumentProvider({ children }) {
  const {
    documentList,
    getDocumentList,
    getDocument,
    newDocument,
    addAttendance,
    removeAttendance,
    updateSiteSetup,
    updateSiteSetupAddImage,
    updateApprovedForm,
    updateForms,
    updateMethodStatements,
    removeDocument,
    downloadPDF,
    attachFile,
    getReinstatementSheet,
    editReinstatementSheetInfo,
    downloadReinstatementSheet,
    getHoleSequence,
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
        getDocument,
        newDocument,
        addAttendance,
        removeAttendance,
        updateSiteSetup,
        updateSiteSetupAddImage,
        updateApprovedForm,
        updateForms,
        updateMethodStatements,
        removeDocument,
        downloadPDF,
        attachFile,
        getReinstatementSheet,
        editReinstatementSheetInfo,
        downloadReinstatementSheet,
        getHoleSequence,
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
