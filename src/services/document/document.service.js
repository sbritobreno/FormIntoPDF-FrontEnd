import api from "../../utils/api";
import { useState } from "react";
import useFlashMessage from "../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";

export default function DocumentService() {
  const [token] = useState(localStorage.getItem("token"));
  const [documentList, setDocumentList] = useState([]);
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
    const data = await api
      .get(`/document/get/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data.document;
      })
      .catch((err) => {
        return err.response.data;
      });
    return data;
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
      const value = document[key];
      if (
        key === "Hazards" ||
        key === "daily_method_statement_and_traffic_management_check" ||
        key === "Emergency" ||
        key === "traffic_management_compliance_checksheet" ||
        key === "traffic_management_slg_checklist" ||
        key === "job_specific_safety_plan"
      ) {
        formData.append(key, JSON.stringify(value));
      } else {
        return;
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
        navigate(`/document/${document.id}/update`);
      })
      .catch((err) => {
        setFlashMessage("Something went wrong!", "error");
      });
  }

  async function updateSiteSetupAddImage(imageFile, id) {
    const formData = new FormData();
    formData.append("image", imageFile);

    await api
      .patch(`/document/${id}/update/sitesetup/add_sketch_image`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data.message;
      });
  }

  async function updateApprovedForm(id, approvedFormList) {
    const formData = new FormData();
    formData.append("approvedFormList", JSON.stringify(approvedFormList));

    await api
      .patch(`/document/${id}/update/approvedform`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate(`/document/${id}/update`);
      })
      .catch((err) => {
        setFlashMessage("Something went wrong!", "error");
      });
  }

  async function updateForms(id, newDocument) {
    const formData = new FormData();
    Object.keys(newDocument).forEach((key) => {
      const value = newDocument[key];
      if (
        key === "hot_work_permit" ||
        key === "daily_plant_inspections" ||
        key === "near_miss_report" ||
        key === "futher_hazards_and_controls_requireds"
      ) {
        formData.append(key, JSON.stringify(value));
      } else {
        return;
      }
    });

    await api
      .patch(`/document/${id}/update/forms`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate(`/document/${id}/update`);
      })
      .catch((err) => {
        setFlashMessage("Something went wrong!", "error");
      });
  }

  async function updateMethodStatements(id, methodStatements) {
    const formData = new FormData();

    Object.keys(methodStatements).forEach((key) => {
      formData.append(key, methodStatements[key]);
    });

    await api
      .patch(`/document/${id}/update/methodstatements`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate(`/document/${id}/update`);
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
      .get(`/pdf/download/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        responseType: "blob", // Set the response type to blob to receive binary data
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "document.pdf");
        document.body.appendChild(link);
        link.click();
        setFlashMessage("PDF downloaded successfully!", "success");
      })
      .catch((err) => {
        setFlashMessage("Something went wrong!", "error");
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
        setFlashMessage("Something went wrong!", "error");
      });
  }

  async function getReinstatementSheet(id) {
    const data = await api
      .get(`/document/${id}/reinstatementsheet`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data.reinstatementSheet;
      })
      .catch((err) => {
        return err.response.data.message;
      });
    return data;
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
      .get(`/pdf/download/${id}/reinstatementsheet`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        responseType: "blob", // Set the response type to blob to receive binary data
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reinstatementSheet.pdf");
        document.body.appendChild(link);
        link.click();
        setFlashMessage("PDF downloaded successfully!", "success");
      })
      .catch((err) => {
        setFlashMessage("Something went wrong!", "error");
      });
  }

  async function getHoleSequence(id) {
    const data = await api
      .get(`/document/holesequence/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data.holeSequence;
      })
      .catch((err) => {
        return err;
      });

    return data;
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
      .patch(`document/${documentId}/update_holesequence/${id}`, formData, {
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
        setFlashMessage("Something went wrong!", "error");
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
  };
}
