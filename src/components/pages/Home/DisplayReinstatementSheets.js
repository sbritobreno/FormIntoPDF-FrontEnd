import styles from "./Home.module.css";
import { useState, useRef, useContext } from "react";
import { DocumentContext } from "../../../context/DocumentContext";
import { useNavigate } from "react-router-dom";
import Pagination from "../../layout/Pagination";
import form_img from "../../../assets/form_img.png";
import Spinner from "../../layout/Spinner";

function DisplayReinstatementSheets() {
  const { documentList, downloadReinstatementSheet } =
    useContext(DocumentContext);
  const reinstatementSheets = documentList
    .map((doc) => doc.reinstatement_sheet)
    .filter((element) => element !== null && element !== undefined);
  const navigate = useNavigate();
  const checkbox = useRef(null);
  const [searchfield, setSearchfield] = useState("");
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const resultsPerPage = 5;
  let numberOfPages = 1;
  const [isLoading, setIsLoading] = useState(false);

  const filteredReinstatementSheets = searchFilter();

  function searchFilter() {
    // filter by Address
    let resultAddress = reinstatementSheets.filter((form) => {
      return form.location
        ?.toLowerCase()
        .includes(searchfield.toLowerCase().trim());
    });

    // filter by Date
    let resultDate = reinstatementSheets.filter((form) => {
      return form.createdAt
        ?.toLowerCase()
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
    const result = list.filter((sheet) => {
      return sheet.esbn_hole_number === null || sheet.esbn_hole_number === "";
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

  async function handleDownload(docId) {
    setIsLoading(true);
    downloadReinstatementSheet(docId).then(() => setIsLoading(false));
  }

  return (
    <section>
      {isLoading && <Spinner />}
      <div className={styles.search_box}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by Address or Date"
          onChange={onSearchChange}
        />
      </div>
      <div className={styles.filter}>
        <label>Filter No ESBN number:</label>
        <input
          ref={checkbox}
          className={styles.search}
          type="checkbox"
          onChange={checkFilter}
        />
      </div>
      <div className={styles.pdfs_container}>
        {filteredReinstatementSheets.length > 0 &&
          filteredReinstatementSheets.map((form) => (
            <div className={styles.pdf_card} key={form.id}>
              <img src={form_img} alt="Form_image" />
              <div className={styles.pdf_card_subcontainer}>
                <div className={styles.pdf_details}>
                  <p>
                    <span className="bold">Address: </span> {form.location}
                  </p>
                  <p>
                    <span className="bold">ESBN No.: </span>{" "}
                    {form.esbn_hole_number}
                  </p>
                  <p>
                    <span className="bold">Local Authority Licence No.: </span>{" "}
                    {form.local_authority_licence_number}
                  </p>
                  <p>
                    <span className="bold">Traffic Impact No.: </span>{" "}
                    {form.traffic_impact_number}
                  </p>
                  <p>
                    <span className="bold">Date: </span> {form.createdAt}
                  </p>
                </div>
                <div className={styles.pdf_card_buttons}>
                  <button
                    className={styles.pdf_btn_edit}
                    onClick={() =>
                      navigate(
                        `/document/${form.DocumentId}/update/reinstatementsheet_table`
                      )
                    }
                  >
                    Update
                  </button>
                  <button
                    className={styles.pdf_btn_download}
                    onClick={() => handleDownload(form.DocumentId)}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        {filteredReinstatementSheets.length === 0 && (
          <p>There is no Single Reinstatement form...</p>
        )}
      </div>
      <Pagination setPage={setPage} page={page} numberOfPages={numberOfPages} />
    </section>
  );
}

export default DisplayReinstatementSheets;
