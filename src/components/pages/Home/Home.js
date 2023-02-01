import styles from "./Home.module.css";
import { useState } from "react";
import DisplayPDF from "./DisplayPDF";
import DisplaySingleHole from "./DisplaySingleHole";

function Home() {
  const [homeDisplay, setHomeDisplay] = useState("PDF");

  function handleBtnSelector() {
    if (homeDisplay === "PDF") {
      setHomeDisplay("SINGLE HOLE");
    } else {
      setHomeDisplay("PDF");
    }
  }

  return (
    <section>
      <div className={styles.home_header}>
        <h1>See here all PDFs!</h1>
      </div>
      <div className={styles.home_selector}>
        <button
          className={
            homeDisplay === "PDF"
              ? styles.btn_selector_active
              : styles.btn_selector
          }
          onClick={handleBtnSelector}
        >
          PDF's
        </button>
        <button
          className={
            homeDisplay === "SINGLE HOLE"
              ? styles.btn_selector_active
              : styles.btn_selector
          }
          onClick={handleBtnSelector}
        >
          Single Hole
        </button>
      </div>
      {homeDisplay === "PDF" ? <DisplayPDF /> : <DisplaySingleHole />}
    </section>
  );
}

export default Home;
