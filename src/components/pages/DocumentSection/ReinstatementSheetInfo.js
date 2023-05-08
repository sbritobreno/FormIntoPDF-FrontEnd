import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import styles from "./Doc.module.css";
import Input from "../../form/Input";

function ReinstatementSheetInfo() {
  const { id } = useParams();
  const { getReinstatementSheet, editReinstatementSheetInfo } =
    useContext(DocumentContext);
  const [reinstatementSheet, setReinstatementSheet] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getReinstatementSheet(id)
      .then((res) => setReinstatementSheet(res))
      .catch((err) => {
        return err;
      });
  }, [id]);

  function handleChange(e) {
    setReinstatementSheet({
      ...reinstatementSheet,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await editReinstatementSheetInfo(id, reinstatementSheet);
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
          maxLength={"6"}
          placeholder="Type ESBN hole number"
          value={reinstatementSheet?.esbn_hole_number || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Address"
          type="text"
          name="location"
          maxLength={"40"}
          placeholder="Type address"
          value={reinstatementSheet?.location || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Local Authority Licence No. T4/T2"
          type="text"
          name="local_authority_licence_number"
          maxLength={"6"}
          placeholder="Type local authority licence number"
          value={reinstatementSheet?.local_authority_licence_number || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Traffic Impact No."
          type="text"
          name="traffic_impact_number"
          maxLength={"6"}
          placeholder="Type traffic impact number"
          value={reinstatementSheet?.traffic_impact_number || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <input className={styles.btn_form_save} type="submit" value="Save" />
      </form>
    </section>
  );
}

export default ReinstatementSheetInfo;
