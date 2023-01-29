import { useState } from "react";
import styles from "./Form1.module.css";
import Input from "../../form/Input";
import Select from "../../form/Select";
import { useNavigate  } from "react-router-dom";

function Form1() {
  const [form, setForm] = useState({});
  const reinstatement = ["Permanent", "Temporary"];
  const status = ["Completed", "In progress"];
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleReinstatement(e) {
    setForm({
      ...form,
      reinstatement: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleStatus(e) {
    setForm({
      ...form,
      status: e.target.options[e.target.selectedIndex].text,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className={styles.form_container}>
      <h1>Form 1</h1>
      {/* That would be actually a simple button to set location and coordinates on the form */}
      <Input
        text="Location / Coordinates"
        type="button"
        value="Set hole location / coordinates"
        onClick={() => navigate('/map')}
      />
      <form onSubmit={handleSubmit}>
        <div className={styles.form_control}>
          <input
            type="text"
            name="location"
            placeholder="Location address"
            readOnly
          />
        </div>
        <div className={styles.form_control}>
          <input
            type="text"
            name="coordinates"
            placeholder="Coordinates"
            readOnly
          />
        </div>
        <fieldset>
          <legend>Size M sq:</legend>
          <Input
            text="Length"
            type="text"
            name="length"
            placeholder="Type hole length"
            handleOnChange={handleChange}
          />
          <Input
            text="Width"
            type="text"
            name="width"
            placeholder="Type hole width"
            handleOnChange={handleChange}
          />
          <Input
            text="Area"
            type="text"
            name="area"
            placeholder="Type hole area"
            handleOnChange={handleChange}
          />
        </fieldset>
        <Input
          text="Surface Category"
          type="text"
          name="local_authority_license"
          placeholder="e.g. Granite slabs, Concrete footpath etc."
          handleOnChange={handleChange}
        />
        <Select
          text="Reinstatement"
          name="reinstatement"
          options={reinstatement}
          handleOnChange={handleReinstatement}
          value={form.reinstatement || ""}
        />
        <Select
          text="Status"
          name="status"
          options={status}
          handleOnChange={handleStatus}
          value={form.status || ""}
        />
        <Input
          text="Add new comment"
          type="text"
          name="comment"
          placeholder="*Optional"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default Form1;
