import styles from "../Pdf.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Input from "../../../form/Input";
import { pdfsData } from "../../../../data";

function CompleteNewPdf() {
  // This state come from LoadSingleHoles component with selected holes for pdf
  const { state } = useLocation();
  const [pdf, setPdf] = useState({
    ...pdfsData[1],
    holes: state?.holesSelected,
  });

  function handleChange(e) {
    setPdf({ ...pdf, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <h1>Edit PDF</h1>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <Input
          value={pdf.esbh_hole_no || ""}
          text="ESBH Hole No."
          type="text"
          name="esbh_hole_no"
          placeholder="Type ESBH hole number"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          value={pdf.address || ""}
          text="Street"
          type="text"
          name="street"
          placeholder="Type street name"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          value={pdf.local_authority_licence_number || ""}
          text="Local Authority Licence No. T4/T2"
          type="text"
          name="local_authority_licence_number"
          placeholder="Type local authority licence number T4/T2"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          value={pdf.traffic_impact_number || ""}
          text="Traffic Impact No."
          type="text"
          name="traffic_impact_number"
          placeholder="Type traffic impact number"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <label>Single Holes Selected:</label>
        <div className={styles.container}>
          {pdf.holes.map((hole) => (
            <div className={styles.card} key={hole.id}>
              <img src={hole.image} alt="hole_image" />
              <div className={styles.card_subcontainer}>
                <div>
                  <p>
                    <span className="bold">Address: </span> {hole.address}
                  </p>
                  <p>
                    <span className="bold">Coordinates: </span>{" "}
                    {hole.coordinates}
                  </p>
                  <p>
                    <span className="bold">Reinstatement: </span>{" "}
                    {hole.reinstatement}
                  </p>
                  <p>
                    <span className="bold">Status: </span> {hole.status}
                  </p>
                  <p>
                    <span className="bold">Date: </span> {hole.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.btn_submit_container}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </section>
  );
}

export default CompleteNewPdf;
