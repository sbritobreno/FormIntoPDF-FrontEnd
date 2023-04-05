import styles from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import DisplayPDF from "./DisplayPDF";
import DisplayReinstatementSheets from "./DisplayReinstatementSheets";
import { Context } from "../../../context/UserContext";

function Home() {
  const { setCurrentPdf } = useContext(Context);
  const [homeDisplay, setHomeDisplay] = useState("PDF");

  useEffect(() => {
    setCurrentPdf(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
