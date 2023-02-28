import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../form/Input";
import DPICheckboxForm from "../../form/DailyPlantInspectionCheckboxForm";
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
          <label>
            Gas cylinders secured in a vertical position on a trolley
          </label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_5" />
          <label>
            Gas cylinders fitted with a regulator and flashback arrestor
          </label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="hot_work_precautions_box_6" />
          <label>
            Other personnel who may be affected by the work removed from the
            area
          </label>
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
        <h2 className={styles.form_subheading}>Daily Plant Inspection</h2>
        <DPICheckboxForm title={"1. Flashing Beacon"} name={"flashing_beacon"}/>
        <DPICheckboxForm title={"2. Mirrors"} name={"mirrors"}/>
        <DPICheckboxForm title={"3. Reverse Camera"} name={"reverse_camera"}/>
        <DPICheckboxForm title={"4. Wipers"} name={"wipers"}/>
        <DPICheckboxForm title={"5. Lights"} name={"lights"}/>
        <DPICheckboxForm title={"6. Horn"} name={"horn"}/>
        <DPICheckboxForm title={"7. Lab belt"} name={"lab_belt"}/>
        <DPICheckboxForm title={"8. Steps"} name={"steps"}/>
        <DPICheckboxForm title={"9. Hand Rails"} name={"hand_rails"}/>
        <DPICheckboxForm title={"10. Emergency Stop"} name={"emergency_stop"}/>
        <DPICheckboxForm title={"11. Hand Brake"} name={"hand_brake"}/>
        <DPICheckboxForm title={"12. Brakes"} name={"brakes"}/>
        <DPICheckboxForm title={"13. Drivers Seat"} name={"drivers_seat"}/>
        <DPICheckboxForm title={"14. Windows"} name={"windows"}/>
        <DPICheckboxForm title={"15. Fire Extinguisher"} name={"fire_extinguisher"}/>
        <DPICheckboxForm title={"16. Guards in Place"} name={"guards_in_place"}/>
        <DPICheckboxForm title={"17. Gas Bottles Secure"} name={"gas_bottles_secure"}/>
        <DPICheckboxForm title={"18. Battery Condition"} name={"battery_condition"}/>
        <DPICheckboxForm title={"19. Tyres"} name={"tyres"}/>
        <DPICheckboxForm title={"20. Steering"} name={"steering"}/>
        <DPICheckboxForm title={"21. Quick Hitch Pin"} name={"quick_hitch_pin"}/>
        <DPICheckboxForm title={"22. FOPS"} name={"fops"}/>
        <DPICheckboxForm title={"23. ROPS"} name={"rops"}/>
        <DPICheckboxForm title={"24. Straps in good condition"} name={"straps_in_good_condition"}/>
        <DPICheckboxForm title={"25. Transmission Oil"} name={"transmission_oil"}/>
        <DPICheckboxForm title={"26. Engine Oil"} name={"engine_oil"}/>
        <DPICheckboxForm title={"27. Hydraulic Oil"} name={"hydraulic_oil"}/>
        <DPICheckboxForm title={"28. Water"} name={"water"}/>
        <DPICheckboxForm title={"29. Fuel"} name={"fuel"}/>
        <DPICheckboxForm title={"30. Brake Fluid"} name={"brake_fluid"}/>
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default Forms;
