import styles from "./TextArea.module.css";

function TextArea({ title, name, handleOnChange, value }) {
  return (
    <>
      <label>{title}:</label>
      <textarea
        className={styles.comments_textarea}
        rows="2"
        name={name}
        value={value}
        placeholder="*Optional"
        onChange={handleOnChange}
        autoComplete="off"
      ></textarea>
    </>
  );
}

export default TextArea;
