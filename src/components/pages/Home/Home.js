import styles from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import DisplayPDF from "./DisplayPDF";
import DisplayReinstatementSheets from "./DisplayReinstatementSheets";
import { Context } from "../../../context/UserContext";

function Home() {
  const { setCurrentPdf } = useContext(Context);
  const path = window.location.pathname;
  const updateDocUrl = path.includes("update_doc") ? true : false;
  const [homeDisplay, setHomeDisplay] = useState("PDF");

  useEffect(() => {
    setCurrentPdf(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <section>
      {updateDocUrl ? (
        <div className={styles.home_header}>
          <h1>Update a PDF!</h1>
        </div>
      ) : (
        <>
          <div className={styles.home_header}>
            <h1>
              {homeDisplay === "PDF"
                ? "See here all PDFs!"
                : "See here all Single Reinstatements!"}
            </h1>
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
                homeDisplay === "SINGLEREINSTATEMENTS"
                  ? styles.btn_selector_active
                  : styles.btn_selector
              }
              onClick={() => setHomeDisplay("SINGLEREINSTATEMENTS")}
            >
              Single Reinstatements
            </button>
          </div>
        </>
      )}
      {homeDisplay === "PDF" ? (
        <DisplayPDF updateDocUrl={updateDocUrl} />
      ) : (
        <DisplayReinstatementSheets />
      )}
    </section>
  );
}

export default Home;
