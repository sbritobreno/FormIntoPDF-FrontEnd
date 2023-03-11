import styles from "./Home.module.css";
import { useState, useContext, useRef } from "react";
import { pdfsData } from "../../../data";
import { Context } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

function DisplayPDF({ updateDocUrl }) {
  const pdfs = pdfsData;
  const navigate = useNavigate();
  const checkbox = useRef(null);
  const { isAdmin } = useContext(Context);
  const [searchfield, setSearchfield] = useState("");
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const resultsPerPage = 3;
  let numberOfPages = 1;

  const filteredPDFs = searchFilter();

  function searchFilter() {
    // filter by Address
    let resultAddress = pdfs.filter((pdf) => {
      return pdf.address
        .toLowerCase()
        .includes(searchfield.toLowerCase().trim());
    });

    // filter by Date
    let resultDate = pdfs.filter((pdf) => {
      return pdf.date
        .toLowerCase()
        .startsWith(searchfield.toLowerCase().trim());
    });

    let result =
      resultAddress.length > resultDate.length ? resultAddress : resultDate;

    if (filter) result = setupFilter(result);

    numberOfPages = Math.ceil(result.length / resultsPerPage);

    result = getDocumentResultsPage(page, result);

    return result;
  }

  function getDocumentResultsPage(pageNumber = 1, list) {
    const start = (pageNumber - 1) * resultsPerPage;
    const end = pageNumber * resultsPerPage;

    return list.slice(start, end);
  }

  function setupFilter(list) {
    const result = list.filter((pdf) => {
      return pdf.final_file_attached !== null;
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

  function downloadPDF(id) {}

  function deletePDF(id) {}

  function attachFile(id) {}

  function updatePdf(id) {
    navigate(`/document/update/${id}`);
  }

  return (
    <section>
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
        {pdfs.length > 0 &&
          filteredPDFs.map((pdf) => (
            <div className={styles.pdf_card} key={pdf.id}>
              <img src={pdf.image} alt="PDF_image" />
              <div className={styles.pdf_card_subcontainer}>
                <div className={styles.pdf_details}>
                  <p>
                    <span className="bold">PDF name: </span> {pdf.name}
                  </p>
                  <p>
                    <span className="bold">Date: </span> {pdf.date}
                  </p>
                  <p>
                    <span className="bold">Address: </span> {pdf.address}
                  </p>
                  <p>
                    <span className="bold">Last updated by: </span>{" "}
                    {pdf.last_updated_by}
                  </p>
                </div>
                <div className={styles.pdf_card_buttons}>
                  {pdf.final_file_attached ? (
                    <button
                      className={styles.pdf_btn_attach_file}
                      disabled={!isAdmin}
                      onClick={() => attachFile(pdf.id)}
                    >
                      Add File
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    className={styles.pdf_btn_edit}
                    disabled={!isAdmin}
                    onClick={() => updatePdf(pdf.id)}
                  >
                    Update
                  </button>
                  {!updateDocUrl ? (
                    <>
                      <button
                        className={styles.pdf_btn_download}
                        disabled={!isAdmin}
                        onClick={() => downloadPDF(pdf.id)}
                      >
                        Download
                      </button>
                      <button
                        className={styles.pdf_btn_remove}
                        disabled={!isAdmin}
                        onClick={() => deletePDF(pdf.id)}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        {pdfs.length === 0 && <p>There is no PDF...</p>}
      </div>
      <div className={styles.pagination_container}>
        <button
          style={
            page > 1 ? { visibility: "visible" } : { visibility: "hidden" }
          }
          onClick={() => setPage(page - 1)}
        >
          {"<<  "}page {page - 1}
        </button>
        <p>{page}</p>
        <button
          style={
            page < numberOfPages
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
          onClick={() => setPage(page + 1)}
        >
          page {page + 1}
          {"  >>"}
        </button>
      </div>
    </section>
  );
}

export default DisplayPDF;
