import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import styles from "./Doc.module.css";
import Input from "../../form/Input";

function ReinstatementSheetInfo() {
  const {
    currentReinstatementSheet,
    setCurrentReinstatementSheet,
    getReinstatementSheet,
    editReinstatementSheet,
  } = useContext(DocumentContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getReinstatementSheet(id);
  }, [id]);

  function handleChange(e) {
    setCurrentReinstatementSheet({
      ...currentReinstatementSheet,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    editReinstatementSheet(id, currentReinstatementSheet);
    navigate(`/document/${id}/update/reinstatementsheet_table`);
  }

  return (
    <section className={styles.form_container}>
      <h1>Reinstatement Sheet</h1>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.form_subheading}>Information</h2>
        <Input
          text="ESBN Hole No."
          type="text"
          name="esbn_hole_number"
          placeholder="Type ESBN hole number"
          value={currentReinstatementSheet.esbn_hole_number || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Address"
          type="text"
          name="location"
          placeholder="Type address"
          value={currentReinstatementSheet.location || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Local Authority Licence No. T4/T2"
          type="text"
          name="local_authority_licence_number"
          placeholder="Type local authority licence number"
          value={currentReinstatementSheet.local_authority_licence_number || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Traffic Impact No."
          type="text"
          name="traffic_impact_number"
          placeholder="Type traffic impact number"
          value={currentReinstatementSheet.traffic_impact_number || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <input className={styles.btn_form_save} type="submit" value="Save" />
      </form>
    </section>
  );
}

export default ReinstatementSheetInfo;
