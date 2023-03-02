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
    console.log("eee");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/document/new", { state: { sectionIndex: 4 } });
  }

  return (
    <section className={styles.form_container}>
      <h1>Method Statements</h1>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.form_subheading}>Job Information</h2>
        <h3>Job</h3>
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
        <div className={styles.preview_images}>
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
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default MethodStatements;
