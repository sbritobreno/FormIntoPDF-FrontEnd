import { useState, useEffect, useContext, useRef } from "react";
import styles from "./Doc.module.css";
import Input from "../../form/Input";
import TextArea from "../../form/TextArea";
import Select from "../../form/Select";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import { MdAddCircle } from "react-icons/md";

function EditReinstatementSheetHoleSequence() {
  const { documentId, id } = useParams();
  const {
    getReinstatementSheet,
    getHoleSequence,
    editHoleSequence,
    removeHoleSequenceImage,
  } = useContext(DocumentContext);
  const [reinstatementSheet, setReinstatementSheet] = useState({});
  // This state come from map component with location and coordinates
  const { state } = useLocation();
  const [holeSequence, setHoleSequence] = useState({});
  const [preview, setPreview] = useState([]);
  const hiddenFileInput = useRef(null);
  const reinstatementOptions = ["Permanent", "Temporary"];
  const statusOptions = ["Completed", "In progress"];
  const navigate = useNavigate();

  useEffect(() => {
    getReinstatementSheet(documentId)
      .then((res) => setReinstatementSheet(res))
      .catch((err) => {
        return err;
      });
    getHoleSequence(id)
      .then((res) => setHoleSequence(res))
      .catch((err) => {
        return err;
      });
  }, [id]);

  if (state && state.coordinates !== holeSequence.coordinates) {
    setHoleSequence({ ...holeSequence, coordinates: state.coordinates });
  }

  function handleChange(e) {
    setHoleSequence({ ...holeSequence, [e.target.name]: e.target.value });
  }

  function handleReinstatement(e) {
    setHoleSequence({
      ...holeSequence,
      reinstatement: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleStatus(e) {
    setHoleSequence({
      ...holeSequence,
      status: e.target.options[e.target.selectedIndex].text,
    });
  }

  function onFileChange(e) {
    const newArray = preview.concat(Array.from(e.target.files));
    setPreview(newArray);
    setHoleSequence({ ...holeSequence, images: newArray });
  }

  function handleClickAddImage(e) {
    e.preventDefault();
    hiddenFileInput.current.click(); // triggers onFileChange
  }

  function handleClickRemoveImage(index) {
    const newArray = preview.filter((item, i) => i !== index);
    setPreview(newArray);
    setHoleSequence({ ...holeSequence, images: newArray });
  }

  // This one removes the images that are coming from the database not the preview
  function removeImage(index) {
    const imageToRemove = holeSequence.reinstatement_images[index];
    removeHoleSequenceImage(imageToRemove.id);
    const newArray = holeSequence.reinstatement_images.filter(
      (item, i) => i !== index
    );
    setHoleSequence({ ...holeSequence, reinstatement_images: newArray });
  }

  function handleSubmit(e) {
    e.preventDefault();
    editHoleSequence(documentId, id, holeSequence);
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
          value="Set hole coordinates"
          onClick={() =>
            navigate("/map", {
              state: { originPage: window.location.pathname },
            })
          }
        />
        <div className={styles.form_control}>
          <input
            type="text"
            name="location"
            value={
              reinstatementSheet.location ||
              "Location should be set on Reinstatement sheet information"
            }
            readOnly
          />
        </div>
        <div className={styles.form_control}>
          <input
            type="text"
            name="coordinates"
            placeholder="Coordinates"
            value={holeSequence?.coordinates || ""}
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
            value={holeSequence?.length || ""}
            handleOnChange={handleChange}
            autoComplete="off"
          />
          <Input
            text="Width"
            type="text"
            name="width"
            placeholder="Type hole width"
            value={holeSequence?.width || ""}
            handleOnChange={handleChange}
            autoComplete="off"
          />
          <Input
            text="Area"
            type="text"
            name="area"
            value={
              holeSequence.length && holeSequence.width
                ? holeSequence.length * holeSequence.width
                : ""
            }
            placeholder="Area will be calculated automatically"
            readOnly
          />
        </fieldset>
        <Input
          text="Surface Category"
          type="text"
          name="surface_category"
          placeholder="e.g. Granite slabs, Concrete footpath etc."
          value={holeSequence?.surface_category || ""}
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Select
          text="Reinstatement"
          name="reinstatement"
          options={reinstatementOptions}
          handleOnChange={handleReinstatement}
          value={holeSequence.reinstatement || ""}
        />
        <Select
          text="Status"
          name="status"
          options={statusOptions}
          handleOnChange={handleStatus}
          value={holeSequence.status || ""}
        />
        <Input
          text="Completed at"
          type="date"
          name="date_complete"
          handleOnChange={handleChange}
          value={
            holeSequence.date_complete
              ? new Date(holeSequence.date_complete.split(" ")[0])
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          autoComplete="off"
        />
        <TextArea
          title="Add new comment"
          name="comments"
          handleOnChange={handleChange}
          value={holeSequence.comments || ""}
        />
        <div className={styles.preview_form_images}>
          {holeSequence.reinstatement_images?.length > 0 &&
            holeSequence.reinstatement_images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/documents/${image.image}`}
                alt="job_image"
                key={`${image.image}`}
                onClick={() => removeImage(index)}
              />
            ))}
          {preview.length > 0 &&
            preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt="job_image"
                key={index}
                onClick={() => handleClickRemoveImage(index)}
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
            accept=".png,.jpg"
            ref={hiddenFileInput}
            onChange={onFileChange}
            style={{ display: "none" }}
            multiple={true}
          ></input>
        </div>
        <input type="submit" value="Save" />
      </form>
    </section>
  );
}

export default EditReinstatementSheetHoleSequence;
