import styles from "./CheckboxContainer.module.css";

function CheckboxContainer({ title, name, checked, handleOnChange }) {
  return (
    <div className={styles.checkbox_container}>
      <input type="checkbox" name={name} onChange={handleOnChange} checked={checked}/>
      <label>{title}</label>
    </div>
  );
}

export default CheckboxContainer;
