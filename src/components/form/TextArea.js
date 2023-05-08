import styles from "./TextArea.module.css";

function TextArea({ title, name, handleOnChange, value, maxLength }) {
  return (
    <>
      <label>{title}:</label>
      <textarea
        className={styles.comments_textarea}
        rows="2"
        name={name}
        value={value}
        maxLength={maxLength}
        placeholder="*Optional"
        onChange={handleOnChange}
        autoComplete="off"
      ></textarea>
    </>
  );
}

export default TextArea;
