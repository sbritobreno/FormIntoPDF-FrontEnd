import styles from "./NewDocument.module.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NewDocument() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const sectionBtns = useRef([]);
  const [lastSectionCompleted, setLastSectionCompleted] = useState(null);

  useEffect(() => {
    sectionBtns[0].style.opacity = 1;
    if (state) {
      setLastSectionCompleted(state.sectionIndex);
      sectionCompleted(Number(lastSectionCompleted));
    };

    // Anything in here is fired on component mount.
    document.querySelector("main").style.backgroundColor = "#1466B6";
    document.querySelector("main").style.boxShadow = "unset";

    return () => {
      // Anything in here is fired on component unmount.
      document.querySelector("main").style.backgroundColor = "#fff";
      document.querySelector("main").style.boxShadow =
        "0 0.5rem 1rem rgb(0 0 0 / 15%)";
    };
  }, [state, lastSectionCompleted]);

  function sectionCompleted(sectionBtnIndex) {
    sectionBtns[sectionBtnIndex].textContent = sectionBtns[
      sectionBtnIndex
    ].textContent
      .toString()
      .replace("...", "✔️");

    // change the opacity of the next button and make it clickable
    sectionBtns[sectionBtnIndex + 1].style.opacity = 1;
    sectionBtns[sectionBtnIndex + 1].disabled = false;
  }

  function saveDocument() {}

  return (
    <section className={styles.newdocument_section}>
      <div className={styles.heading}>
        <h1>Create a new document!</h1>
        <p>
          Complete each section in order to create a new PDF document, you can
          save it after completing at least 1 section, then you can finish it
          later on by clicking "Update Document" on home page.
        </p>
      </div>
      <div className={styles.btns_container}>
        <button
          ref={(el) => (sectionBtns[0] = el)}
          className={styles.siteattendance_btn}
          onClick={() => {
            navigate("/document/new/siteattendance");
          }}
        >
          Site Attendance ...
        </button>
        <button
          ref={(el) => (sectionBtns[1] = el)}
          disabled={false}
          className={styles.sitesetup_btn}
          onClick={() => {
            navigate("/document/new/sitesetup");
          }}
        >
          Site Setup ...
        </button>
        <button
          ref={(el) => (sectionBtns[2] = el)}
          disabled={false}
          className={styles.forms_btn}
          onClick={() => {
            navigate("/document/new/forms");
          }}
        >
          Forms ...
        </button>
        <button
          ref={(el) => (sectionBtns[3] = el)}
          disabled={false}
          className={styles.methodstatements_btn}
          onClick={() => {
            navigate("/document/new/methodstatements");
          }}
        >
          Method Statements ...
        </button>
        <button
          ref={(el) => (sectionBtns[4] = el)}
          disabled={false}
          className={styles.statementssheet_btn}
          onClick={() => {
            navigate("/document/new/reinstatementsheet");
          }}
        >
          Reinstatement Sheet ...
        </button>
        <button
          ref={(el) => (sectionBtns[5] = el)}
          className={styles.submit_btn}
          onClick={() => {
            saveDocument();
          }}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default NewDocument;
