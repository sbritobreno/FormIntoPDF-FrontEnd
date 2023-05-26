import styles from "./CheckboxContainer.module.css";

function CheckboxContainer({ title, name, checked, handleOnChange, bold=false }) {
  return (
    <div className={styles.checkbox_container}>
      <input type="checkbox" name={name} onChange={handleOnChange} checked={checked}/>
      {bold ? <label><b>{title}</b></label> : <label>{title}</label>}
    </div>
  );
}

export default CheckboxContainer;
