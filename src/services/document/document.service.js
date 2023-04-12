import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFlashMessage from "../../hooks/useFlashMessage";

export default function DocumentService() {
  const [currentDocument, setCurrentDocument] = useState({});
  const [documentList, setDocumentList] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    // Get list of documents
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
  }, [token]);

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

  return {
    documentList,
    currentDocument,
    setCurrentDocument,
    getDocument,
    removeDocument,
    downloadPDF,
    attachFile,
  };
}
