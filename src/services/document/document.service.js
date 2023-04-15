import api from "../../utils/api";
import { useState, useEffect } from "react";
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

  // Get list of documents
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

  async function removeDocument(id) {
    let msgType = "success";

    const data = await api
      .delete(`/document/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function downloadPDF(id) {
    let msgType = "success";

    const data = await api
      .get(`/document/download_pdf/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function attachFile(id, file) {
    let msgType = "success";

    const data = await api
      .patch(`/document/attach_file/${id}`, file, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
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
    let msgType = "success";

    const data = await api
      .get(`/document/download/${id}/reinstatementsheet`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function createHoleSequence(id, holeSequence) {
    let msgType = "success";
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

    const data = await api
      .post(`/document/${id}/new_holesequence`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
    if (msgType === "success")
      navigate(`/document/${id}/update/reinstatementsheet_table`);
  }

  async function editHoleSequence(id) {}

  
  async function removeHoleSequence(id) {
    let msgType = "success";

    const data = await api
      .delete(`/document/remove_holesequence/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return {
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
  };
}
