import styles from "./HazardAndControls.module.css";

function HazardAndControls({ name, handleOnChange }) {
  return (
    <div className={styles.hazard_and_controls}>
      <label>Hazard:</label>
      <input
        name={name + "_hazard"}
        placeholder="*Optional"
        onChange={handleOnChange}
        autoComplete="off"
      />
      <label>Controls:</label>
      <textarea
        rows="2"
        name={name + "_controls"}
        placeholder="*Optional"
        onChange={handleOnChange}
        autoComplete="off"
      ></textarea>
    </div>
  );
}

export default HazardAndControls;
