import styles from "./CreateOrUpdateDocument.module.css";
import { useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { Context } from "../../../context/UserContext";
import { pdfsData } from "../../../data";

function CreateOrUpdateDocument() {
  const { setCurrentPdf } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const sectionBtns = useRef([]);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    if (id) {
      setCurrentPdf(id);
      sectionsCompleted(id);
    }
    sectionBtns[0].style.opacity = 1;

    // Anything in here is fired on component mount.
    document.querySelector("main").style.backgroundColor = "transparent";
    document.querySelector("main").style.boxShadow = "unset";

    return () => {
      // Anything in here is fired on component unmount.
      document.querySelector("main").style.backgroundColor = "#fff";
      document.querySelector("main").style.boxShadow =
        "0 0.5rem 1rem rgb(0 0 0 / 15%)";
        setCurrentPdf(0) // Unset currentPdf when leaving this page
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setCurrentPdf]);

  function sectionsCompleted(id) {
    const secCompleted = pdfsData.filter((doc) => {return doc.id === +id})[0]

    const sectionsNumber = Object.keys(sectionBtns);
    sectionsNumber.forEach((index) => {
      if (index <= secCompleted.pdf_sections_completed - 1) {
        // After at least one section being completed allow user to save it
        sectionBtns[6].style.opacity = 1;
        sectionBtns[6].disabled = false;

        sectionBtns[Number(index) + 1].style.opacity = 1;
        sectionBtns[Number(index) + 1].disabled = false;
        sectionBtns[index].textContent = sectionBtns[index].textContent
          .toString()
          .replace("...", "✔️");
      }
    });
  }

  function saveDocument() {
    let msgText = "A new PDF was created!";
    let msgType = "success";

    navigate("/FormIntoPDF-FrontEnd");
    setFlashMessage(msgText, msgType);
  }

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
          className={styles.approvedform_btn}
          onClick={() => {
            navigate("/document/new/approvedform");
          }}
        >
          Approved Form (AF3) ...
        </button>
        <button
          ref={(el) => (sectionBtns[3] = el)}
          disabled={false}
          className={styles.forms_btn}
          onClick={() => {
            navigate("/document/new/forms");
          }}
        >
          Forms ...
        </button>
        <button
          ref={(el) => (sectionBtns[4] = el)}
          disabled={false}
          className={styles.methodstatements_btn}
          onClick={() => {
            navigate("/document/new/methodstatements");
          }}
        >
          Method Statements ...
        </button>
        <button
          ref={(el) => (sectionBtns[5] = el)}
          disabled={false}
          className={styles.statementssheet_btn}
          onClick={() => {
            navigate("/document/new/reinstatementsheet");
          }}
        >
          Reinstatement Sheet ...
        </button>
        <button
          ref={(el) => (sectionBtns[6] = el)}
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

export default CreateOrUpdateDocument;
