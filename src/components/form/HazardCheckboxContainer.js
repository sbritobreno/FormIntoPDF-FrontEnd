import styles from "./HazardCheckboxContainer.module.css";

function HazardCheckboxContainer({
  title,
  name,
  checked,
  value,
  handleOnChange,
}) {
  return (
    <>
      <div className={styles.hazard_check_container}>
        <input
          type="checkbox"
          name={name}
          onChange={handleOnChange}
          checked={checked}
        />
        <label>{title}</label>
      </div>
      <textarea
        className={styles.hazard_comments}
        rows="2"
        name={name}
        value={value}
        maxLength="48"
        placeholder="*Optional"
        onChange={handleOnChange}
        autoComplete="off"
      ></textarea>
    </>
  );
}

export default HazardCheckboxContainer;
