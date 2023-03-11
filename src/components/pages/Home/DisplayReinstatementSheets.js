import styles from "./Home.module.css";
import { useState, useRef } from "react";
import { formsData } from "../../../data";
import { useNavigate } from "react-router-dom";

function DisplayReinstatementSheets() {
  const checkbox = useRef(null);
  const forms = formsData;
  const [searchfield, setSearchfield] = useState("");
  const [filter, setFilter] = useState(false);
  const filteredForms = searchFilter();
  const navigate = useNavigate();

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

    return result;
  }

  function setupFilter(list) {
    const result = list.filter((sheet) => {
      return sheet.status === "In progress";
    });

    return result;
  }

  function onSearchChange(event) {
    setSearchfield(event.target.value);
  }

  function checkFilter() {
    setFilter(checkbox.current.checked);
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
        <label>Filter Status=In progress:</label>
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
                    onClick={() =>
                      navigate(
                        `/document/only_update/reinstatementsheet/${form.id}`
                      )
                    }
                  >
                    Update
                  </button>
                  <button className={styles.pdf_btn_download}>Download</button>
                  <button className={styles.pdf_btn_remove}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        {forms.length === 0 && <p>There is no Single hole form...</p>}
      </div>
    </section>
  );
}

export default DisplayReinstatementSheets;
