import styles from "./TextArea.module.css";

function TextArea({ title, name, handleChange }) {
  return (
    <>
      <label>{title}:</label>
      <textarea
        className={styles.comments_textarea}
        rows="2"
        name={name}
        placeholder="*Optional"
        onChange={handleChange}
        autoComplete="off"
      ></textarea>
    </>
  );
}

export default TextArea;
