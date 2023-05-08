import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import styles from "./Doc.module.css";
import Input from "../../form/Input";

function MethodStatements() {
  const { id } = useParams();
  const { getDocument, updateMethodStatements } = useContext(DocumentContext);
  const [methodStatements, setMethodStatements] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    getDocument(id)
      .then((res) => setMethodStatements(res.method_statements_job_information))
      .catch((err) => {
        return err;
      });
  }, [id]);

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setMethodStatements({
      ...methodStatements,
      [e.target.name]: e.target.files[0],
    });
  }

  function handleChange(e) {
    setMethodStatements({
      ...methodStatements,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateMethodStatements(id, methodStatements)
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
          maxLength={"40"}
          placeholder="Type MS ID"
          value={methodStatements?.ms_id || ""} 
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Revision"
          type="text"
          name="ms_revision"
          maxLength={"40"}
          placeholder="Type revision"
          value={methodStatements?.ms_revision || ""} 
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Project"
          type="text"
          name="ms_project"
          maxLength={"40"}
          value={methodStatements?.ms_project || ""} 
          placeholder="Type project"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Site"
          type="text"
          name="ms_site"
          maxLength={"40"}
          value={methodStatements?.ms_site || ""} 
          placeholder="Type site"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Client"
          type="text"
          name="ms_client"
          maxLength={"40"}
          value={methodStatements?.ms_client || ""} 
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
          accept=".png,.jpg"
          name="loc_photograph_image"
          onChange={onFileChange}
        />
        <div className={styles.preview_image}>
          {(methodStatements?.loc_photograph_image || preview) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/documents/${methodStatements?.loc_photograph_image}`
              }
              alt="Location img"
            />
          )}
        </div>
        <input className={styles.btn_form_save} type="submit" value="Save" />
      </form>
    </section>
  );
}

export default MethodStatements;
