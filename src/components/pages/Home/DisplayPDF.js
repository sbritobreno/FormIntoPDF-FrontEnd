import styles from "./Home.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import { DocumentContext } from "../../../context/DocumentContext";
import { useNavigate } from "react-router-dom";
import ConfirmWindow from "../Extras/ConfirmWindow";
import Pagination from "../../layout/Pagination";
import pdf_img from "../../../assets/pdf_img.png";
import Spinner from "../../layout/Spinner";
import { MdAttachFile } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FiDownload } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function DisplayPDF() {
  const {
    documentList,
    getDocumentList,
    downloadPDF,
    removeDocument,
    attachFile,
  } = useContext(DocumentContext);
  const navigate = useNavigate();
  const checkbox = useRef(null);
  const [searchfield, setSearchfield] = useState("");
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  let numberOfPages = 1;
  const hiddenFileInput = useRef([]);
  const [rerender, setRerender] = useState(false); // create a state variable
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const btnText = "Delete";
  const message = "Are you sure you want to delete this document ?";
  const [documentToBeDeletedId, setDocumentToBeDeletedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getDocumentList();
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const filteredDocuments = searchFilter();

  function searchFilter() {
    // filter by Address
    let resultAddress = documentList.filter((doc) => {
      return doc.created_by
        .toLowerCase()
        .includes(searchfield.toLowerCase().trim());
    });

    // filter by Date
    let resultDate = documentList.filter((doc) => {
      return new Date(doc.createdAt)
        .toLocaleDateString("en-GB")
        .toLowerCase()
        .startsWith(searchfield.toLowerCase().trim());
    });

    let result =
      resultAddress.length > resultDate.length ? resultAddress : resultDate;
    if (filter) result = setupFilter(result);
    numberOfPages = Math.ceil(result.length / resultsPerPage);
    result = getPageResults(page, result);

    return result;
  }

  function getPageResults(pageNumber = 1, list) {
    const start = (pageNumber - 1) * resultsPerPage;
    const end = pageNumber * resultsPerPage;

    return list.slice(start, end);
  }

  function setupFilter(list) {
    const result = list.filter((doc) => {
      return doc.file_attached === null;
    });

    return result;
  }

  function onSearchChange(event) {
    setSearchfield(event.target.value);
  }

  function checkFilter() {
    setPage(1);
    setFilter(checkbox.current.checked);
  }

  async function handleClickAttachFile(e, index) {
    e.preventDefault();
    hiddenFileInput[index].click();
  }

  async function onFileChange(e, id) {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    await attachFile(id, formData);
    setRerender(!rerender);
  }

  async function HandleremoveDocument(id) {
    setDocumentToBeDeletedId(id);
    setConfirmWindowOpen(true);
  }

  async function confirmAction(confirmed = false) {
    setConfirmWindowOpen(false);
    if (confirmed) {
      await removeDocument(documentToBeDeletedId);
    }
    setDocumentToBeDeletedId(null);
    setRerender(!rerender);
  }

  async function handleDownload(docId) {
    setIsLoading(true);
    downloadPDF(docId).then(() => setIsLoading(false));
  }

  return (
    <section>
      {isLoading && <Spinner />}
      {confirmWindowOpen && (
        <ConfirmWindow
          message={message}
          btnText={btnText}
          actionResponse={confirmAction}
        />
      )}
      <div className={styles.search_box}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by Address or Date"
          onChange={onSearchChange}
        />
      </div>
      <div className={styles.filter}>
        <label>Filter PDFs with no file attached:</label>
        <input
          ref={checkbox}
          className={styles.search}
          type="checkbox"
          onChange={checkFilter}
        />
      </div>
      <div className={styles.pdfs_container}>
        {filteredDocuments.length > 0 &&
          filteredDocuments.map((doc, index) => (
            <div className={styles.pdf_card} key={doc.id}>
              <img src={pdf_img} alt="PDF_image" />
              <div className={styles.pdf_card_subcontainer}>
                <div className={styles.pdf_details}>
                  <p>
                    <span className="bold">PDF name: </span> {doc.created_by}
                  </p>
                  <p>
                    <span className="bold">Date: </span>{" "}
                    {new Date(doc.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <span className="bold">Address: </span>{" "}
                    {doc.reinstatement_sheet?.location}
                  </p>
                  <p>
                    <span className="bold">Last updated by: </span>
                    {doc.last_updated_by}
                  </p>
                  <p>
                    <span className="bold">File attached: </span>
                    {doc.file_attached ? doc.file_attached : "No file attached"}
                  </p>
                </div>
                <div className={styles.pdf_card_buttons}>
                  <>
                    <button
                      className={styles.pdf_btn_attach_file}
                      onClick={(e) => handleClickAttachFile(e, index)}
                    >
                      {isMobile ? <MdAttachFile /> : "Attach File"}
                    </button>
                    <input
                      type="file"
                      name="file"
                      accept=".pdf"
                      ref={(el) => (hiddenFileInput[index] = el)}
                      onChange={(e) => onFileChange(e, doc.id)}
                      style={{ display: "none" }}
                    ></input>
                  </>
                  <button
                    className={styles.pdf_btn_edit}
                    onClick={() => navigate(`/document/${doc.id}/update`)}
                  >
                    {isMobile ? <RxUpdate /> : "Update"}
                  </button>
                  <button
                    className={styles.pdf_btn_download}
                    onClick={() => handleDownload(doc.id)}
                  >
                    {isMobile ? <FiDownload /> : "Download"}
                  </button>
                  <button
                    className={styles.pdf_btn_remove}
                    onClick={() => HandleremoveDocument(doc.id)}
                  >
                    {isMobile ? <RiDeleteBin6Line /> : "Remove"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        {filteredDocuments.length === 0 && <p>There is no PDF...</p>}
      </div>
      <Pagination setPage={setPage} page={page} numberOfPages={numberOfPages} />
    </section>
  );
}

export default DisplayPDF;
