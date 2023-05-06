import styles from "./HazardAndControls.module.css";

function HazardAndControls({ name, handleOnChange, nameValue, controlValue }) {
  return (
    <div className={styles.hazard_and_controls}>
      <label>Hazard:</label>
      <input
        name={name + "_name"}
        placeholder="*Optional"
        value={nameValue || ""}
        maxLength={"50"}
        onChange={handleOnChange}
        autoComplete="off"
      />
      <label>Controls:</label>
      <textarea
        rows="2"
        maxLength={"200"}
        name={name + "_control_required"}
        placeholder="*Optional"
        value={controlValue || ""}
        onChange={handleOnChange}
        autoComplete="off"
      ></textarea>
    </div>
  );
}

export default HazardAndControls;
