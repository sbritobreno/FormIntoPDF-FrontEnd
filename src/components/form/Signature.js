import styles from "./Signature.module.css";
import SignaturePad from "react-signature-canvas";
import { useRef, forwardRef } from "react";

function SignatureC({ title = "Signature:", handleChange, signImg }, ref) {
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
  }

  return (
    <>
      <div className={styles.label_image}>
        <label>{title}</label>
        {signImg ? (
          <img
            className={styles.signature_image}
            src={`${process.env.REACT_APP_API}/images/documents/${signImg}`}
            alt="signature"
          />
        ) : (
          ""
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.signature_container} ref={ref}>
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

const Signature = forwardRef(SignatureC);

export default Signature;
