import styles from "./HomeSelector.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeSelector() {
  const navigate = useNavigate();

  useEffect(() => {
    // Anything in here is fired on component mount.
    document.querySelector("main").style.backgroundColor = "#1466B6";
    document.querySelector("main").style.boxShadow = "unset";

    return () => {
      // Anything in here is fired on component unmount.
      document.querySelector("main").style.backgroundColor = "#fff";
      document.querySelector("main").style.boxShadow =
        "0 0.5rem 1rem rgb(0 0 0 / 15%)";
    };
  }, []);

  return (
    <section className={styles.homeselector_section}>
      <div className={styles.heading}>
        <h1>Welcome {"username"}!</h1>
      </div>
      <div className={styles.btns_container}>
        <button onClick={() => {navigate("/document/new")}}>New Document</button>
        <button onClick={() => {navigate("/FormIntoPDF-FrontEnd/home")}}>Update Document</button>
        <button onClick={() => {navigate("/FormIntoPDF-FrontEnd/home")}}>Access All Document</button>
      </div>
    </section>
  );
}

export default HomeSelector;
