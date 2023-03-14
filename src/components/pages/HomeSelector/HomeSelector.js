import styles from "./HomeSelector.module.css";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context/UserContext";

function HomeSelector() {
  const navigate = useNavigate();
  const { setCurrentPdf } = useContext(Context);

  useEffect(() => {
    // Anything in here is fired on component mount.
    document.querySelector("main").style.backgroundColor = "transparent";
    document.querySelector("main").style.boxShadow = "unset";

    return () => {
      // Anything in here is fired on component unmount.
      document.querySelector("main").style.backgroundColor = "#fff";
      document.querySelector("main").style.boxShadow =
        "0 0.5rem 1rem rgb(0 0 0 / 15%)";
      setCurrentPdf(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.homeselector_section}>
      <div className={styles.heading}>
        <h1>Welcome {"username"}!</h1>
      </div>
      <div className={styles.btns_container}>
        <button
          onClick={() => {
            navigate("/document/new");
          }}
        >
          New Document
        </button>
        <button
          onClick={() => {
            navigate("/FormIntoPDF-FrontEnd/update_doc");
          }}
        >
          Update Document
        </button>
        <button
          onClick={() => {
            navigate("/FormIntoPDF-FrontEnd/home");
          }}
        >
          Access All Document
        </button>
      </div>
    </section>
  );
}

export default HomeSelector;
