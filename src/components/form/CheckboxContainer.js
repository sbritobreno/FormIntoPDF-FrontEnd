import styles from "./CheckboxContainer.module.css";

function CheckboxContainer({ title, name }) {
  return (
    <div className={styles.checkbox_container}>
      <input type="checkbox" name={name} />
      <label>{title}</label>
    </div>
  );
}

export default CheckboxContainer;
