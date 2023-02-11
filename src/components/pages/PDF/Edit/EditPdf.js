import styles from "../Pdf.module.css";
import { useState, useRef, useEffect } from "react";
import { formsData, pdfsData } from "../../../../data";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../../hooks/useFlashMessage";

function EditPdf() {
  const itemEls = useRef([]);
  const forms = formsData;
  const pdfs = pdfsData;
  const [selected, setSelected] = useState([...pdfs[1].holes]);
  const [searchfieldAddress, setSearchfieldAddress] = useState("");
  const [searchfieldDate, setSearchfieldDate] = useState("");
  const filteredForms = searchFilter();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    forms.forEach((form) => {
      const f = selected.filter((f) => f.id === form.id)[0];
      if (f) itemEls.current[f.id].style.opacity = 1;
    });
  }, [forms, selected]);

  function searchFilter() {
    // filter by Address
    let result = forms.filter((form) => {
      return form.address
        .toLowerCase()
        .includes(searchfieldAddress.toLowerCase());
    });
    // filter by Date
    result = result.filter((form) => {
      return form.date.toLowerCase().startsWith(searchfieldDate.toLowerCase());
    });

    return result;
  }

  function onSearchChangeAddress(event) {
    setSearchfieldAddress(event.target.value);
  }

  function onSearchChangeDate(event) {
    setSearchfieldDate(event.target.value);
  }

  function handleChange(e, formId) {
    const container = itemEls.current[formId];
    const form = forms.filter((form) => form.id === formId);

    if (e.target.checked) {
      container.style.opacity = 1;
      setSelected([...selected, form[0]]);
    } else {
      container.style.opacity = 0.6;
      setSelected((current) => {
        return current.filter((form) => form.id !== formId);
      });
    }
  }

  function checkIfSelected(formId) {
    const form = selected.filter((form) => form.id === formId)[0];
    return form ? true : false;
  }

  function completePdf() {
    if (selected <= 0) {
      setFlashMessage("There is no hole selected!", "error");
      return;
    }
    navigate(`/pdf/edit/1/completepdf`, {
      state: {
        holesSelected: selected,
      },
    });
  }

  return (
    <>
      <section>
        <div className={styles.page_header}>
          <h1>Edit PDF</h1>
          <p>Add or remove single holes to edit this PDF</p>
        </div>
        <div>
          <div className={styles.search_box}>
            <input
              className={styles.search}
              type="search"
              placeholder="Search by Address"
              onChange={onSearchChangeAddress}
            />
            <input
              className={styles.search}
              type="search"
              placeholder="Search by Date"
              onChange={onSearchChangeDate}
            />
          </div>
          <div className={styles.container}>
            {forms.length > 0 &&
              filteredForms.map((form) => (
                <div
                  style={{ opacity: 0.7 }}
                  className={styles.card}
                  key={form.id}
                  ref={(el) => (itemEls.current[form.id] = el)}
                >
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      defaultChecked={checkIfSelected(form.id)}
                      onChange={(e) => handleChange(e, form.id)}
                    />
                    <img src={form.image} alt="form_image" />
                  </div>
                  <div className={styles.card_subcontainer}>
                    <div>
                      <p>
                        <span className="bold">Address: </span> {form.address}
                      </p>
                      <p>
                        <span className="bold">Coordinates: </span>{" "}
                        {form.coordinates}
                      </p>
                      <p>
                        <span className="bold">Reinstatement: </span>{" "}
                        {form.reinstatement}
                      </p>
                      <p>
                        <span className="bold">Status: </span> {form.status}
                      </p>
                      <p>
                        <span className="bold">Date: </span> {form.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            {forms.length === 0 && <p>There is no Single hole form...</p>}
          </div>
        </div>
      </section>
      <div className={styles.btn_container}>
        <button className={styles.btn} onClick={completePdf}>
          Continue
        </button>
      </div>
    </>
  );
}

export default EditPdf;
