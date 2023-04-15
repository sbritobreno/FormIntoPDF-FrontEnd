import styles from "./TextArea.module.css";

function TextArea({ title, name, handleOnChange }) {
  return (
    <>
      <label>{title}:</label>
      <textarea
        className={styles.comments_textarea}
        rows="2"
        name={name}
        placeholder="*Optional"
        onChange={handleOnChange}
        autoComplete="off"
      ></textarea>
    </>
  );
}

export default TextArea;
