import styles from "./Home.module.css";
import { useState, useRef } from "react";
import { formsData } from "../../../data";
import { useNavigate } from "react-router-dom";

function DisplayReinstatementSheets() {
  const navigate = useNavigate();
  const checkbox = useRef(null);
  const forms = formsData;
  const [searchfield, setSearchfield] = useState("");
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const resultsPerPage = 3;
  let numberOfPages = 1;

  const filteredForms = searchFilter();

  function searchFilter() {
    // filter by Address
    let resultAddress = forms.filter((form) => {
      return form.address
        .toLowerCase()
        .includes(searchfield.toLowerCase().trim());
    });

    // filter by Date
    let resultDate = forms.filter((form) => {
      return form.date
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
    const result = list.filter((sheet) => {
      return sheet.esbh_hole_no === null;
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

  function downloadReinstatementSheet(id) {}

  function deleteSingleReinstatement(id) {}

  function updatePdf(id) {
    navigate(`/document/only_update/reinstatementsheet/${id}`);
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
        <label>Filter No HSBH number:</label>
        <input
          ref={checkbox}
          className={styles.search}
          type="checkbox"
          onChange={checkFilter}
        />
      </div>
      <div className={styles.pdfs_container}>
        {forms.length > 0 &&
          filteredForms.map((form) => (
            <div className={styles.pdf_card} key={form.id}>
              <img src={form.image} alt="PDF_image" />
              <div className={styles.pdf_card_subcontainer}>
                <div className={styles.pdf_details}>
                  <p>
                    <span className="bold">Address: </span> {form.address}
                  </p>
                  <p>
                    <span className="bold">Coordinates: </span>{" "}
                    {form.coordinates}
                  </p>
                  <p>
                    <span className="bold">Reinstatement: </span>{" "}
                    {form.reinstatement}
                  </p>
                  <p>
                    <span className="bold">Status: </span> {form.status}
                  </p>
                  <p>
                    <span className="bold">Date: </span> {form.date}
                  </p>
                </div>
                <div className={styles.pdf_card_buttons}>
                  <button
                    className={styles.pdf_btn_edit}
                    onClick={() => updatePdf(form.id)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.pdf_btn_download}
                    onClick={() => downloadReinstatementSheet(form.id)}
                  >
                    Download
                  </button>
                  <button
                    className={styles.pdf_btn_remove}
                    onClick={() => deleteSingleReinstatement(form.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        {forms.length === 0 && <p>There is no Single hole form...</p>}
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

export default DisplayReinstatementSheets;
