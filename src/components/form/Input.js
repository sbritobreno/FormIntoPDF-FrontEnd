import styles from "./Input.module.css";

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  onClick,
  value,
  multiple,
  autoComplete,
  readOnly,
}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        onClick={onClick}
        value={value}
        readOnly={readOnly}
        autoComplete={autoComplete}
        {...(multiple ? { multiple } : "")}
      />
    </div>
  );
}

export default Input;
