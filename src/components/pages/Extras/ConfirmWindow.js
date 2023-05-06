import styles from "./ConfirmWindow.module.css";

function ConfirmWindow({ message, btnText, actionResponse }) {
  return (
    <section>
      <div className={styles.warning}>
        <button
          className={styles.close_warning}
          onClick={() => actionResponse(false)}
        >
          &times;
        </button>
        <h1 className={styles.warning_header}>Warning</h1>
        <div className={styles.message}>
          <p className={styles.message_p}>{message}</p>
        </div>
        <div className={styles.btns}>
          <button className={styles.btn1} onClick={() => actionResponse(false)}>
            Cancel
          </button>
          <button className={styles.btn2} onClick={() => actionResponse(true)}>
            {btnText}
          </button>
        </div>
      </div>
      <div
        className={styles.overlay}
        onClick={() => actionResponse(false)}
      ></div>
    </section>
  );
}

export default ConfirmWindow;
