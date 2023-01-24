import styles from "./Home.module.css";
import { useState } from "react";
import { pdfsData } from "../../../data";

function Home() {
  const pdfs = pdfsData;
  const [searchfieldType, setSearchfieldType] = useState("");
  const [searchfieldAddress, setSearchfieldAddress] = useState("");
  const [searchfieldDate, setSearchfieldDate] = useState("");
  const filteredPDFs = searchFilter();

  function searchFilter() {
    // filter by type
    let result = pdfs.filter((pdf) => {
      return pdf.type.toLowerCase().startsWith(searchfieldType.toLowerCase());
    });

    // filter by Address
    result = result.filter((activity) => {
      return activity.address
        .toLowerCase()
        .startsWith(searchfieldAddress.toLowerCase());
    });

    // filter by Date
    result = result.filter((activity) => {
      return activity.date
        .toLowerCase()
        .startsWith(searchfieldDate.toLowerCase());
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
      <div className={styles.home_header}>
        <h1>See here all PDFs!</h1>
        <p>View, edit, and delete any PDF.</p>
      </div>
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
                  <button className={styles.pdf_btn_edit}>Edit</button>
                  <button className={styles.pdf_btn_remove}>Remove</button>
                  <button className={styles.pdf_btn_download}>Download</button>
                </div>
              </div>
            </div>
          ))}
        {pdfs.length === 0 && <p>There is no PDF...</p>}
      </div>
    </section>
  );
}

export default Home;
