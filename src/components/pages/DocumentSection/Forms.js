import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../form/Input";
import styles from "./Doc.module.css";

function Forms() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/document/new", { state: { sectionIndex: 3 } });
  }

  return (
    <section className={styles.form_container}>
      <h1>Forms</h1>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.form_subheading}>Hot Work Permit</h2>
        <h3>PART 1 - Details of Hot Work</h3>
        <Input
          text="Site"
          type="text"
          name="site"
          placeholder="Type site"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Floor/Level"
          type="text"
          name="floor_level"
          placeholder="Type floor/level"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Nature of work (include exact location)"
          type="text"
          name="nature_of_work"
          placeholder="Type nature of work"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Date"
          type="date"
          name="date"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <h3>PART 2 - Hot Work Permit Precautions</h3>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_1" />
          <label>Loose combustible material cleared</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_2" />
          <label>Non-movable combustible material covered</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_3" />
          <label>Suitable extinguishers to hand</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_4" />
          <label>Gas cylinders secured in a vertical position on a trolley</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_5" />
          <label>Gas cylinders fitted with a regulator and flashback arrestor</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_6" />
          <label>Other personnel who may be affected by the work removed from the area</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_7" />
          <label>Opposite side checked and combustibles moved away</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_8" />
          <label>Work area screened to contain sparks</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_9" />
          <label>Gas cylinders at least 3m from the burner</label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_10" />
          <label>If sited on the roof, heat insulating base provided</label>
        </div>
        <h3>PART 3 - Details of Persons and Times of Permit</h3>
        <h4>Permit issued by:</h4>
        <Input
          text="Name"
          type="text"
          name="issued_by_name"
          placeholder="Type name"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Signature"
          type="text"
          name="issued_by_signature"
          placeholder="Type signature"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Company"
          type="text"
          name="issued_by_company"
          placeholder="Type company name"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <h4>Permit received by:</h4>
        <Input
          text="Name"
          type="text"
          name="received_by_name"
          placeholder="Type name"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Signature"
          type="text"
          name="received_by_signature"
          placeholder="Type signature"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Company"
          type="text"
          name="received_by_company"
          placeholder="Type company name"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <h3>PART 4 - Final Check Up</h3>
        <h4>Final check by:</h4>
        <Input
          text="Name"
          type="text"
          name="final_checkup_name"
          placeholder="Type name"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Signature"
          type="text"
          name="final_checkup_signature"
          placeholder="Type signature"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Time"
          type="time"
          name="final_checkup_time"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default Forms;
