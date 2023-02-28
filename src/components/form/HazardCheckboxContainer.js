import styles from "./HazardCheckboxContainer.module.css";

function HazardCheckboxContainer({ title, name, handleChange }) {
  return (
    <>
      <div className={styles.hazard_check_container}>
        <input type="checkbox" name={name} />
        <label>{title}</label>
      </div>
      <textarea
        className={styles.hazard_comments}
        rows="2"
        name={{ name } + "_comment"}
        placeholder="*Optional"
        onChange={handleChange}
        autoComplete="off"
      ></textarea>
    </>
  );
}

export default HazardCheckboxContainer;
