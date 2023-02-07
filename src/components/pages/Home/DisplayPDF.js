import styles from "./Home.module.css";
import { useState, useContext } from "react";
import { pdfsData } from "../../../data";
import { Context } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

function DisplayPDF() {
  const pdfs = pdfsData;
  const { isAdmin } = useContext(Context);
  const [searchfieldType, setSearchfieldType] = useState("");
  const [searchfieldAddress, setSearchfieldAddress] = useState("");
  const [searchfieldDate, setSearchfieldDate] = useState("");
  const filteredPDFs = searchFilter();
  const navigate = useNavigate();

  function searchFilter() {
    // filter by type
    let result = pdfs.filter((pdf) => {
      return pdf.type.toLowerCase().startsWith(searchfieldType.toLowerCase());
    });

    // filter by Address
    result = result.filter((pdf) => {
      return pdf.address
        .toLowerCase()
        .startsWith(searchfieldAddress.toLowerCase());
    });

    // filter by Date
    result = result.filter((pdf) => {
      return pdf.date.toLowerCase().startsWith(searchfieldDate.toLowerCase());
    });

    return result;
  }

  function onSearchChangeType(event) {
    setSearchfieldType(event.target.value);
  }
  function onSearchChangeAddress(event) {
    setSearchfieldAddress(event.target.value);
  }
  function onSearchChangeDate(event) {
    setSearchfieldDate(event.target.value);
  }

  return (
    <section>
      <div className={styles.search_box}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by Type"
          onChange={onSearchChangeType}
        />
        <input
          className={styles.search}
          type="search"
          placeholder="Search by Address"
          onChange={onSearchChangeAddress}
        />
        <input
          className={styles.search}
          type="search"
          placeholder="Search by Date"
          onChange={onSearchChangeDate}
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
                </div>
                <div className={styles.pdf_card_buttons}>
                  <button
                    className={styles.pdf_btn_edit}
                    disabled={!isAdmin}
                    onClick={() => navigate(`/pdf/edit/${pdf.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.pdf_btn_remove}
                    disabled={!isAdmin}
                    onClick={() => navigate(`/pdf/edit/${pdf.id}`)}
                  >
                    Remove
                  </button>
                  <button
                    className={styles.pdf_btn_download}
                    disabled={!isAdmin}
                    onClick={() => navigate(`/pdf/edit/${pdf.id}`)}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        {pdfs.length === 0 && <p>There is no PDF...</p>}
      </div>
    </section>
  );
}

export default DisplayPDF;
