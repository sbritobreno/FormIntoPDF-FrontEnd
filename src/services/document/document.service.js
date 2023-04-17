import api from "../../utils/api";
import { useState } from "react";
import useFlashMessage from "../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";

export default function DocumentService() {
  const [token] = useState(localStorage.getItem("token"));
  const [documentList, setDocumentList] = useState([]);
  const [currentDocument, setCurrentDocument] = useState({});
  const [currentReinstatementSheet, setCurrentReinstatementSheet] = useState(
    {}
  );
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function getDocumentList() {
    api
      .get("/document/all_documents", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setDocumentList(response.data.documents);
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  async function getDocument(id) {
    await api
      .get(`/document/get/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setCurrentDocument(response.data.document);
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function newDocument() {
    await api
      .post("/document/new", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        navigate(`/document/${response.data.document.id}/update`);
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  async function addAttendance(documentId, newAttendandce) {
    let msgType = "success";
    await api
      .post(`/document/${documentId}/add/attendance`, newAttendandce, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, msgType);
      })
      .catch((err) => {
        msgType = "error";
        setFlashMessage(err.response.data.message, msgType);
      });

    // this boolean will be use on the fron end
    if (msgType === "error") return false;
    if (msgType === "success") return true;
  }

  async function removeAttendance(id) {
    await api
      .delete(`/document/remove/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function updateSiteSetup(document) {
    const formData = new FormData();
    Object.keys(document).forEach((key) => {
      if (
        key === "approved_forms" ||
        key === "daily_plant_inspections" ||
        key === "futher_hazards_and_controls_requireds" ||
        key === "reinstatement_sheet" ||
        key === "site_attendances"
        )
        return;
        
      const value = document[key];
      if (Array.isArray(value)) {
        // If the value is an array, loop through each item and append it to the formData
        value.forEach((item) => {
          formData.append(`${key}[]`, item); // the server side will parse it back to array :)
        });
      } else {
        // If the value is not an array, append it to the formData with the key
        formData.append(key, value);
      }
    });

    await api
    .patch(`/document/${document.id}/update/sitesetup`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      setFlashMessage(response.data.message, "success");
      navigate(`/document/${document.id}/update`);
    })
    .catch((err) => {
      setFlashMessage("Something went wrong!", "error");
    });
  }

  async function removeDocument(id) {
    await api
      .delete(`/document/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function downloadPDF(id) {
    await api
      .get(`/document/download_pdf/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function attachFile(id, file) {
    await api
      .patch(`/document/attach_file/${id}`, file, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function getReinstatementSheet(id) {
    await api
      .get(`/document/${id}/reinstatementsheet`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setCurrentReinstatementSheet(response.data.reinstatementSheet);
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function editReinstatementSheetInfo(id, data) {
    await api
      .patch(`document/${id}/update/reinstatementsheetinfo`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function downloadReinstatementSheet(id) {
    await api
      .get(`/document/download/${id}/reinstatementsheet`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function createHoleSequence(id, holeSequence) {
    const formData = new FormData();

    Object.keys(holeSequence).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < holeSequence[key].length; i++) {
          formData.append("images", holeSequence[key][i]);
        }
      } else {
        formData.append(key, holeSequence[key]);
      }
    });

    await api
      .post(`/document/${id}/new_holesequence`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
        navigate(`/document/${id}/update/reinstatementsheet_table`);
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function editHoleSequence(documentId, id, holeSequence) {
    const formData = new FormData();

    Object.keys(holeSequence).forEach((key) => {
      if (key === "reinstatement_images") {
        return;
      } else if (key === "images") {
        for (let i = 0; i < holeSequence[key].length; i++) {
          formData.append("images", holeSequence[key][i]);
        }
      } else {
        formData.append(key, holeSequence[key]);
      }
    });

    await api
      .patch(`document/update_holesequence/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
        navigate(`/document/${documentId}/update/reinstatementsheet_table`);
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function removeHoleSequenceImage(imageId) {
    await api
      .delete(`document/holesequence/remove_image/${imageId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function removeHoleSequence(id) {
    await api
      .delete(`/document/remove_holesequence/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  return {
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
  };
}