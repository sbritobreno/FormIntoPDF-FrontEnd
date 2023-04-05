import styles from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayPDF from "./DisplayPDF";
import DisplayReinstatementSheets from "./DisplayReinstatementSheets";
import { DocumentContext } from "../../../context/DocumentContext";
import { UserContext } from "../../../context/UserContext";

function Home() {
  const { authenticated } = useContext(UserContext);
  const { currentDocument } = useContext(DocumentContext);
  const [homeDisplay, setHomeDisplay] = useState("PDF");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authenticated) navigate("/login");
  // });

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
