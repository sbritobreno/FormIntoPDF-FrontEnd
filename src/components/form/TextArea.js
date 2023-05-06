import styles from "./TextArea.module.css";

function TextArea({ title, name, handleOnChange, value, maxlength }) {
  return (
    <>
      <label>{title}:</label>
      <textarea
        className={styles.comments_textarea}
        rows="2"
        name={name}
        value={value}
        maxlength={maxlength}
        placeholder="*Optional"
        onChange={handleOnChange}
        autoComplete="off"
      ></textarea>
    </>
  );
}

export default TextArea;
