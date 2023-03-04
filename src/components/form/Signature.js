import styles from "./Signature.module.css";
import SignaturePad from "react-signature-canvas";
import { useRef } from "react";

function Signature({ title = "Signature:", handleChange }) {
  let sigPad = useRef({});
  let data = "";
  const handler = handleChange;

  function clear(e) {
    e.preventDefault();
    sigPad.current.clear();
  }

  function save(e) {
    e.preventDefault();
    data = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
    handler(data);
    data = '';
  }

  return (
    <>
      <label>{title}</label>
      <div className={styles.container}>
        <div className={styles.signature_container}>
          <SignaturePad
            canvasProps={{ className: styles.sigPad }}
            ref={sigPad}
            penColor="black"
          />
        </div>
        <div>
          <button className={styles.btn_clear} onClick={clear}>
            Clear
          </button>
          <button className={styles.btn_save} onClick={save}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Signature;
