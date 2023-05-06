import React from "react";
import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <section>
      <div className={styles.spinner_container}>
        <div className={styles.loading_spinner}></div>
      </div>
      <div className={styles.overlay}></div>
    </section>
  );
}

export default Spinner;