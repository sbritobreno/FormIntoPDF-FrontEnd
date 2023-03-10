import styles from "./Home.module.css";
import { useState } from "react";
import DisplayPDF from "./DisplayPDF";
import DisplaySingleHole from "./DisplaySingleHole";

function Home() {
  const path = window.location.pathname;
  const updateDocUrl = path.includes("update_doc") ? true : false;
  const [homeDisplay, setHomeDisplay] = useState("PDF");

  return (
    <section>
      {updateDocUrl ? (
        <div className={styles.home_header}>
          <h1>Update a PDF!</h1>
        </div>
      ) : (
        <>
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
              onClick={() => setHomeDisplay("PDF")}
            >
              PDF's
            </button>
            <button
              className={
                homeDisplay === "SINGLE HOLE"
                  ? styles.btn_selector_active
                  : styles.btn_selector
              }
              onClick={() => setHomeDisplay("SINGLE HOLE")}
            >
              Single Hole
            </button>
          </div>
        </>
      )}
      {homeDisplay === "PDF" ? <DisplayPDF updateDocUrl={updateDocUrl}/> : <DisplaySingleHole />}
    </section>
  );
}

export default Home;
