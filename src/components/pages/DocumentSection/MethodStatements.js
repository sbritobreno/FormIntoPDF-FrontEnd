import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Doc.module.css";
import Input from "../../form/Input";

function MethodStatements() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState("");

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <section className={styles.form_container}>
      <h1>Method Statements</h1>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.form_subheading}>Job Information</h2>
        <Input
          text="MS ID"
          type="text"
          name="ms_id"
          placeholder="Type MS ID"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Revision"
          type="text"
          name="ms_revision"
          placeholder="Type revision"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Project"
          type="text"
          name="ms_project"
          placeholder="Type project"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Site"
          type="text"
          name="ms_site"
          placeholder="Type site"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Client"
          type="text"
          name="ms_client"
          placeholder="Type client"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <label>Location Photograph:</label>
        <br />
        <input
          className={styles.single_image}
          text="Image"
          type="file"
          name="loc_photograph_image"
          onChange={onFileChange}
        />
        <div className={styles.preview_image}>
          {(form.image || preview) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/users/${form.image}`
              }
              alt="Sketch img"
            />
          )}
        </div>
        <input className={styles.btn_form_save} type="submit" value="Save" />
      </form>
    </section>
  );
}

export default MethodStatements;
