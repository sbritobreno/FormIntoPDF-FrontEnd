import styles from "./CheckboxContainer.module.css";

function CheckboxContainer({ title, name, handleOnChange }) {
  return (
    <div className={styles.checkbox_container}>
      <input type="checkbox" name={name} onChange={handleOnChange} />
      <label>{title}</label>
    </div>
  );
}

export default CheckboxContainer;
