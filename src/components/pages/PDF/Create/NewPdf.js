import styles from "../Pdf.module.css";
import { useState } from "react";
import { formsData } from "../../../../data";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../../hooks/useFlashMessage";

function NewPdf() {
  const forms = formsData;
  const [selected, setSelected] = useState([]);
  const [searchfieldAddress, setSearchfieldAddress] = useState("");
  const [searchfieldDate, setSearchfieldDate] = useState("");
  const filteredForms = searchFilter();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

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
    // div "Pdf__card__2fSa-"
    const container = e.target.parentElement.parentElement;
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

  function completePdf() {
    if (selected <= 0) {
      setFlashMessage("There is no hole selected!", "error");
      return;
    }
    navigate("/pdf/new/completepdf", {
      state: {
        holesSelected: selected,
      },
    });
  }

  return (
    <>
      <section>
        <div className={styles.page_header}>
          <h1>Create new PDF's</h1>
          <p>Select multiple single holes to create a new PDF!</p>
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
                <div className={styles.card} key={form.id}>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      defaultChecked={false}
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
          Create new PDF
        </button>
      </div>
    </>
  );
}

export default NewPdf;
