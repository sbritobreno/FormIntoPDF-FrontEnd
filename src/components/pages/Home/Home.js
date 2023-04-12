import styles from "./Home.module.css";
import { useState } from "react";
import DisplayPDF from "./DisplayPDF";
import DisplayReinstatementSheets from "./DisplayReinstatementSheets";

function Home() {
  const [homeDisplay, setHomeDisplay] = useState("PDF");

  return (
    <section>
      <div className={styles.home_selector}>
        <button
          className={
            homeDisplay === "PDF"
              ? styles.btn_selector_active
              : styles.btn_selector
          }
          onClick={() => setHomeDisplay("PDF")}
        >
          PDF's
        </button>
        <button
          className={
            homeDisplay === "SINGLEREINSTATEMENTS"
              ? styles.btn_selector_active
              : styles.btn_selector
          }
          onClick={() => setHomeDisplay("SINGLEREINSTATEMENTS")}
        >
          Reinstatements
        </button>
      </div>
      {homeDisplay === "PDF" ? <DisplayPDF /> : <DisplayReinstatementSheets />}
    </section>
  );
}

export default Home;
