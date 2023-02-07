import { useEffect, useState } from "react";
import styles from "./NewForm.module.css";
import Input from "../../form/Input";
import Select from "../../form/Select";
import { useNavigate, useLocation } from "react-router-dom";
import { formsData } from "../../../data";

function EditForm() {
  const forms = formsData;
  // This state come from map component with location and coordinates
  const { state } = useLocation();
  const [form, setForm] = useState(forms[1]);
  const [preview, setPreview] = useState([]);
  const reinstatement = ["Permanent", "Temporary"];
  const status = ["Completed", "In progress"];
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setForm({
        ...form,
        address: state?.location,
        coordinates: state?.coordinates,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }

  return (
    <section className={styles.form_container}>
      <h1>Edit Form</h1>
      {/* That would be actually a simple button to set location and coordinates on the form */}
      <Input
        text="Location / Coordinates"
        type="button"
        value="Set hole location / coordinates"
        onClick={() =>
          navigate("/map", { state: { page_link: `/form/edit/${form.id}` } })
        }
      />
      <form onSubmit={handleSubmit}>
        <div className={styles.form_control}>
          <input
            value={form.address || ""}
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
            value={form.length || ""}
            placeholder="Type hole length"
            handleOnChange={handleChange}
            autoComplete="off"
          />
          <Input
            text="Width"
            type="text"
            name="width"
            value={form.width || ""}
            placeholder="Type hole width"
            handleOnChange={handleChange}
            autoComplete="off"
          />
          <Input
            text="Area"
            type="text"
            name="area"
            value={form.length && form.width && form.length * form.width}
            placeholder="Type hole area"
            handleOnChange={handleChange}
            autoComplete="off"
          />
        </fieldset>
        <Input
          text="Surface Category"
          type="text"
          name="surface_category"
          value={form.surface_category || ""}
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
        <Input
          text="Add new comment"
          type="text"
          name="comments"
          value={form.comments.map((comment) => `${comment} `) || ""}
          placeholder="*Optional"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
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
        </div>

        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default EditForm;
