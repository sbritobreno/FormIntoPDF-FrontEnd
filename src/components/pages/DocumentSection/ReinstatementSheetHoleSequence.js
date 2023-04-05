import { useState, useEffect, useContext, useRef } from "react";
import styles from "./Doc.module.css";
import Input from "../../form/Input";
import TextArea from "../../form/TextArea";
import Select from "../../form/Select";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import { MdAddCircle } from "react-icons/md";

function ReinstatementSheetHoleSequence() {
  const hiddenFileInput = useRef(null);
  const { currentDocument } = useContext(DocumentContext);
  const { id } = useParams();

  // This state come from map component with location and coordinates
  const { state } = useLocation();
  const [form, setForm] = useState({
    address: state?.location,
    coordinates: state?.coordinates,
  });

  const [preview, setPreview] = useState([]);
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

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setForm({ ...form, images: [...e.target.files] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate(`/document/${id}/update/reinstatementsheet_table`);
  }

  async function handleClickAddImage(e) {
    e.preventDefault();
    hiddenFileInput.current.click();
  }

  return (
    <section className={styles.form_container}>
      <h1>Reinstatement Sheet</h1>
      <form onSubmit={handleSubmit} className={styles.form_reinstatement}>
        {/* That would be actually a simple button to set location and coordinates on the form */}
        <Input
          className={styles.btn_set_loc_coords}
          text="Location / Coordinates"
          type="button"
          value="Set hole location / coordinates"
          onClick={() =>
            navigate("/map", {
              state: { page_link: window.location.pathname },
            })
          }
        />
        <div className={styles.form_control}>
          <input
            value={currentDocument.address || ""}
            type="text"
            name="location"
            placeholder="Location address"
            readOnly
          />
        </div>
        <div className={styles.form_control}>
          <input
            value={form.coordinates || ""}
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
            autoComplete="off"
          />
          <Input
            text="Width"
            type="text"
            name="width"
            placeholder="Type hole width"
            handleOnChange={handleChange}
            autoComplete="off"
          />
          <Input
            text="Area"
            type="text"
            name="area"
            value={form.length && form.width && form.length * form.width}
            placeholder="Area will be calculated automatically"
            handleOnChange={handleChange}
            readOnly
          />
        </fieldset>
        <Input
          text="Surface Category"
          type="text"
          name="surface_category"
          placeholder="e.g. Granite slabs, Concrete footpath etc."
          handleOnChange={handleChange}
          autoComplete="off"
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
        <TextArea
          title={"Add new comment"}
          name={"comments"}
          handleOnChange={handleChange}
        />
        <div className={styles.preview_form_images}>
          {preview.length > 0
            ? preview.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt="job_image"
                  key={`${index}`}
                />
              ))
            : form.images &&
              form.images.map((image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}/images/forms/${image}`}
                  alt="job_image"
                  key={`${index}`}
                />
              ))}
          <button
            className={styles.add_image_btn}
            onClick={handleClickAddImage}
          >
            <MdAddCircle
              style={{
                padding: "20px",
                fontSize: "130px",
                color: "#fff",
                cursor: "pointer",
              }}
            />
          </button>
          <input
            type="file"
            name="images"
            ref={hiddenFileInput}
            onChange={onFileChange}
            style={{ display: "none" }}
            multiple={true}
          ></input>
        </div>
        {/* <Input
          text="Job image"
          type="file"
          name="images"
          handleOnChange={onFileChange}
          multiple={true}
        />
        <div className={styles.preview_form_images}>
          {preview.length > 0
            ? preview.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt="job_image"
                  key={`${index}`}
                />
              ))
            : form.images &&
              form.images.map((image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}/images/forms/${image}`}
                  alt="job_image"
                  key={`${index}`}
                />
              ))}
        </div> */}

        <input type="submit" value="Save" />
      </form>
    </section>
  );
}

export default ReinstatementSheetHoleSequence;
