import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Doc.module.css";
import Input from "../../form/Input";

function ReinstatementSheetInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
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
          name="esbh_hole_number"
          placeholder="Type ESBN hole number"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Address"
          type="text"
          name="address"
          placeholder="Type address"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Local Authority Licence No. T4/T2"
          type="text"
          name="local_authority_licence_number"
          placeholder="Type local authority licence number"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Traffic Impact No."
          type="text"
          name="traffic_impact_number"
          placeholder="Type traffic impact number"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <input className={styles.btn_form_save} type="submit" value="Save" />
      </form>
    </section>
  );
}

export default ReinstatementSheetInfo;
