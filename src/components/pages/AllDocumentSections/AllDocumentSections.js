import styles from "./AllDocumentSections.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { DocumentContext } from "../../../context/DocumentContext";

function AllDocumentSections() {
  const { getDocument } = useContext(DocumentContext);
  const { id } = useParams();
  const [currentDocument, setCurrentDocument] = useState({});
  const navigate = useNavigate();
  const sectionBtns = useRef([]);
  const { setFlashMessage } = useFlashMessage();
  const numberOfSectionsCompleted = currentDocument.sections_completed;

  useEffect(() => {
    // Anything in here is fired on component mount.
    getDocument(id)
      .then((res) => setCurrentDocument(res))
      .catch((err) => {
        return err;
      });
    document.querySelector("main").style.backgroundColor = "transparent";
    document.querySelector("main").style.boxShadow = "unset";

    return () => {
      // Anything in here is fired on component unmount.
      document.querySelector("main").style.backgroundColor = "#fff";
      document.querySelector("main").style.boxShadow =
        "0 0.5rem 1rem rgb(0 0 0 / 15%)";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  sectionsCompleted();
  function sectionsCompleted() {
    // Reset values to default
    Object.keys(sectionBtns).forEach((index) => {
      if (Number(index) === 0) {
        sectionBtns[index].style.opacity = 1;
        sectionBtns[index].textContent = sectionBtns[index].textContent
          .toString()
          .replace("✔️", "...");
      }
      if (index > 0 && index < 7) {
        sectionBtns[index].style.opacity = 0.5;
        sectionBtns[index].disabled = false;
        sectionBtns[index].textContent = sectionBtns[index].textContent
          .toString()
          .replace("✔️", "...");
      }
    });

    // set new values
    Object.keys(sectionBtns).forEach((index) => {
      if (index < numberOfSectionsCompleted) {
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
    navigate("/");
    setFlashMessage("The document was saved!", "success");
  }

  return (
    <section className={styles.newdocument_section}>
      <div className={styles.heading}>
        <h1>Update the current document!</h1>
        <p>
          You can save the current state of the document and continue updating
          it later on by clicking on "Update" button of the document on home
          page.
        </p>
      </div>
      <div className={styles.btns_container}>
        <button
          ref={(el) => (sectionBtns[0] = el)}
          className={styles.siteattendance_btn}
          onClick={() => navigate(`/document/${id}/update/siteattendance`)}
        >
          Site Attendance ...
        </button>
        <button
          ref={(el) => (sectionBtns[1] = el)}
          disabled={numberOfSectionsCompleted >= 1 ? false : true}
          className={styles.sitesetup_btn}
          onClick={() => {
            navigate(`/document/${id}/update/sitesetup`);
          }}
        >
          Site Setup ...
        </button>
        <button
          ref={(el) => (sectionBtns[2] = el)}
          disabled={numberOfSectionsCompleted >= 2 ? false : true}
          className={styles.approvedform_btn}
          onClick={() => {
            navigate(`/document/${id}/update/approvedform`);
          }}
        >
          Approved Form (AF3) ...
        </button>
        <button
          ref={(el) => (sectionBtns[3] = el)}
          disabled={numberOfSectionsCompleted >= 3 ? false : true}
          className={styles.forms_btn}
          onClick={() => {
            navigate(`/document/${id}/update/forms`);
          }}
        >
          Forms ...
        </button>
        <button
          ref={(el) => (sectionBtns[4] = el)}
          disabled={numberOfSectionsCompleted >= 4 ? false : true}
          className={styles.methodstatements_btn}
          onClick={() => {
            navigate(`/document/${id}/update/methodstatements`);
          }}
        >
          Method Statements ...
        </button>
        <button
          ref={(el) => (sectionBtns[5] = el)}
          disabled={numberOfSectionsCompleted >= 5 ? false : true}
          className={styles.statementssheet_btn}
          onClick={() => {
            navigate(`/document/${id}/update/reinstatementsheet_table`);
          }}
        >
          Reinstatement Sheet ...
        </button>
        <button
          ref={(el) => (sectionBtns[6] = el)}
          disabled={numberOfSectionsCompleted >= 1 ? false : true}
          className={styles.submit_btn}
          onClick={saveDocument}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default AllDocumentSections;
