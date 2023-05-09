import { useState, useEffect, useContext, useRef } from "react";
import styles from "./Doc.module.css";
import Input from "../../form/Input";
import TextArea from "../../form/TextArea";
import Select from "../../form/Select";
import ConfirmWindow from "../Extras/ConfirmWindow";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import { MdAddCircle } from "react-icons/md";

function NewReinstatementSheetHoleSequence() {
  const { id } = useParams();
  const { getReinstatementSheet, createHoleSequence } =
    useContext(DocumentContext);
  // This state come from map component with location and coordinates
  const { state } = useLocation();
  const [reinstatementSheet, setReinstatementSheet] = useState({});
  const [newHoleSequence, setNewHoleSequence] = useState({});
  const hiddenFileInput = useRef(null);
  const [preview, setPreview] = useState([]);
  const reinstatementOptions = ["Permanent", "Temporary"];
  const statusOptions = ["Completed", "In progress"];
  const navigate = useNavigate();
  const [imageToBeDeleted, setImageToBeDeleted] = useState({});
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const btnText = "Remove Image";
  const message = "Are you sure you want to remove this image ?";

  useEffect(() => {
    getReinstatementSheet(id)
      .then((res) => setReinstatementSheet(res))
      .catch((err) => {
        return err;
      });
    if (state)
      setNewHoleSequence({
        ...newHoleSequence,
        coordinates: state.coordinates,
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleChange(e) {
    setNewHoleSequence({ ...newHoleSequence, [e.target.name]: e.target.value });
  }

  function handleReinstatement(e) {
    setNewHoleSequence({
      ...newHoleSequence,
      reinstatement: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleStatus(e) {
    setNewHoleSequence({
      ...newHoleSequence,
      status: e.target.options[e.target.selectedIndex].text,
    });
  }

  function onFileChange(e) {
    const newArray = preview.concat(Array.from(e.target.files));
    setPreview(newArray);
    setNewHoleSequence({ ...newHoleSequence, images: newArray });
  }

  function handleClickAddImage(e) {
    e.preventDefault();
    hiddenFileInput.current.click();
  }

  function handleClickRemoveImage(index) {
    setImageToBeDeleted({ index: index });
    setConfirmWindowOpen(true);
  }

  async function confirmAction(confirmed = false) {
    setConfirmWindowOpen(false);

    if (confirmed) {
      const newArray = preview.filter(
        (item, i) => i !== imageToBeDeleted.index
      );
      setPreview(newArray);
      setNewHoleSequence({ ...newHoleSequence, images: newArray });
    }

    setImageToBeDeleted({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    createHoleSequence(id, newHoleSequence);
  }

  return (
    <section className={styles.form_container}>
      {confirmWindowOpen && (
        <ConfirmWindow
          message={message}
          btnText={btnText}
          actionResponse={confirmAction}
        />
      )}
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
              reinstatementSheet?.location ||
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
            value={newHoleSequence.coordinates || ""}
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
            value={
              newHoleSequence.length && newHoleSequence.width
                ? newHoleSequence.length * newHoleSequence.width
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
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Select
          text="Reinstatement"
          name="reinstatement"
          options={reinstatementOptions}
          handleOnChange={handleReinstatement}
          value={newHoleSequence.reinstatement || ""}
        />
        <Select
          text="Status"
          name="status"
          options={statusOptions}
          handleOnChange={handleStatus}
          value={newHoleSequence.status || ""}
        />
        <Input
          text="Completed at"
          type="date"
          name="date_complete"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <TextArea
          title="Add new comment"
          name="comments"
          handleOnChange={handleChange}
        />
        <div className={styles.preview_form_images}>
          {preview.length > 0 &&
            preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt="job_image"
                key={`${index}`}
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

export default NewReinstatementSheetHoleSequence;
