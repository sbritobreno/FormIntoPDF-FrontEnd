import styles from "./Input.module.css";
import * as React from "react";

function Inputt(
  {
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
    accept,
  },
  ref
) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        ref={ref}
        type={type}
        accept={accept}
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

const Input = React.forwardRef(Inputt);

export default Input;
