import styles from "./HazardCheckboxContainer.module.css";

function HazardCheckboxContainer({ title, name, value, handleOnChange }) {
  return (
    <>
      <div className={styles.hazard_check_container}>
        <input
          type="checkbox"
          name={name}
          onChange={handleOnChange}
          checked={value}
        />
        <label>{title}</label>
      </div>
      <textarea
        className={styles.hazard_comments}
        rows="2"
        name={name}
        placeholder="*Optional"
        onChange={handleOnChange}
        autoComplete="off"
      ></textarea>
    </>
  );
}

export default HazardCheckboxContainer;
