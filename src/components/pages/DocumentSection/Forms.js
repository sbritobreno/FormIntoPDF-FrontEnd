import { useState, useRef, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import useFlashMessage from "../../../hooks/useFlashMessage";
import Input from "../../form/Input";
import DPICheckboxForm from "../../form/DailyPlantInspectionCheckboxForm";
import CheckboxContainer from "../../form/CheckboxContainer";
import styles from "./Doc.module.css";
import TextArea from "../../form/TextArea";
import HazardAndControls from "../../form/HazardAndControls";
import Signature from "../../form/Signature";

function Forms() {
  const { id } = useParams();
  const { getDocument, updateForms } = useContext(DocumentContext);
  const [currentDocument, setCurrentDocument] = useState({});
  const inputs = useRef([]);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    getDocument(id)
      .then((res) => setCurrentDocument(res))
      .catch((err) => {
        return err;
      });
  }, [id]);

  function handleHotWorkPermit(e) {
    const hotWorkPermitName = e.target.name;
    const hotWorkPermitObject = {
      [hotWorkPermitName]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    const newHotWorkPermit = {
      ...currentDocument.hot_work_permit,
      ...hotWorkPermitObject,
    };
    setCurrentDocument({
      ...currentDocument,
      hot_work_permit: newHotWorkPermit,
    });
  }

  function handleDailyPlantInspection(e, fieldName) {
    const dailyPlantInspectionName = e.target.name;
    const index = findIndexByObjectName(
      currentDocument.daily_plant_inspections,
      fieldName
    );

    function findIndexByObjectName(array, targetName) {
      for (let i = 0; i < array.length; i++) {
        const objName = Object.keys(array[i])[0]; // get the name of the current object in the array
        if (objName === targetName) {
          return i; // return the index of the matching object
        }
      }
      return -1; // if no object matches the target name, return -1 to indicate failure
    }

    const dailyPlantInspectionObject =
      index >= 0
        ? currentDocument.daily_plant_inspections[index]
        : { [fieldName]: {} };

    dailyPlantInspectionObject[fieldName][dailyPlantInspectionName] =
      e.target.checked;

    const newDailyPlantInspection = [
      ...currentDocument.daily_plant_inspections,
    ];

    if (index === -1) {
      newDailyPlantInspection.push(dailyPlantInspectionObject);
    } else {
      newDailyPlantInspection[index] = dailyPlantInspectionObject;
    }

    setCurrentDocument({
      ...currentDocument,
      daily_plant_inspections: newDailyPlantInspection,
    });
  }

  function handlerNearMissReport(e) {
    const nearMissReportName = e.target.name;
    const nearMissReportObject = {
      [nearMissReportName]: e.target.value,
    };
    const newNearMissReport = {
      ...currentDocument.near_miss_report,
      ...nearMissReportObject,
    };
    setCurrentDocument({
      ...currentDocument,
      near_miss_report: newNearMissReport,
    });
  }

  function handleFutherHazards(e) {
    const index = e.target.name.split("_")[0];
    const futherHazardName = e.target.name.split("_")[1];
    const futherHazard =
      currentDocument.futher_hazards_and_controls_requireds[+index];

    let futherHazardsValue = {};
    if (futherHazardName === "name") {
      futherHazardsValue.name = e.target.value || "";
      futherHazardsValue.control_required =
        futherHazard?.control_required || "";
    } else {
      futherHazardsValue.name = futherHazard?.name || "";
      futherHazardsValue.control_required = e.target.value || "";
    }

    const newfutherHazardss = [
      ...currentDocument.futher_hazards_and_controls_requireds,
    ];
    newfutherHazardss[index] = futherHazardsValue;

    setCurrentDocument({
      ...currentDocument,
      futher_hazards_and_controls_requireds: newfutherHazardss,
    });
  }

  function handlerIssuedByCompanySign(data) {
    handler(data, "permit_issued_by_person_signature", 0);
  }

  function handlerReceivedByCompanySign(data) {
    handler(data, "permit_received_by_person_signature", 1);
  }

  function handlerFinalCheckUpSign(data) {
    handler(data, "final_check_signature", 2);
  }

  function handlerNearMissReportSign(data) {
    handler(data, "report_signature", 3);
  }

  function handler(data, name, index) {
    if (checkIfSignPadIsEmpty(index)) {
      const signature = { [name]: data.toString() };
      if (name === "report_signature") {
        const newDailyPlantInspection = {
          ...currentDocument.near_miss_report,
          ...signature,
        };
        setCurrentDocument({
          ...currentDocument,
          near_miss_report: newDailyPlantInspection,
        });
      } else {
        const newHotWorkPermit = {
          ...currentDocument.hot_work_permit,
          ...signature,
        };
        setCurrentDocument({
          ...currentDocument,
          hot_work_permit: newHotWorkPermit,
        });
      }
    }
  }

  function checkIfSignPadIsEmpty(index) {
    const canvas = inputs[index].childNodes[0];
    const isSignPadEmpty = canvas
      .getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height)
      .data.some((channel) => channel !== 0);

    return isSignPadEmpty;
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateForms(id, currentDocument);
  }

  function increaseHazardAndControlsQuantity(e) {
    e.preventDefault();
    const index = +currentDocument.futher_hazards_and_controls_requireds?.length - 1;
    const lastOnList = currentDocument.futher_hazards_and_controls_requireds[index]
    if (
      Object.keys(lastOnList).length === 0
    ) {
      setFlashMessage(
        'You have to finish the previous "futher hazard" before!',
        "error"
      );
      return;
    }

    let futherHazardsValue = {};
    const newfutherHazardss = [
      ...currentDocument.futher_hazards_and_controls_requireds,
    ];
    newfutherHazardss[+currentDocument.futher_hazards_and_controls_requireds?.length] = futherHazardsValue;
    setCurrentDocument({
      ...currentDocument,
      futher_hazards_and_controls_requireds: newfutherHazardss,
    });
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
          value={currentDocument.hot_work_permit?.site || ""}
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Input
          text="Floor/Level"
          type="text"
          name="floor_level"
          placeholder="Type floor/level"
          value={currentDocument.hot_work_permit?.floor_level || ""}
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Input
          text="Nature of work (include exact location)"
          type="text"
          name="nature_of_work"
          placeholder="Type nature of work"
          value={currentDocument.hot_work_permit?.nature_of_work || ""}
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Input
          text="Date"
          type="date"
          name="date"
          value={
            currentDocument.hot_work_permit?.date
              ? new Date(currentDocument.hot_work_permit?.date)
                  .toISOString()
                  .split("T")[0]
              : new Date()
          }
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <h3>PART 2 - Hot Work Permit Precautions</h3>
        <CheckboxContainer
          title={"Loose combustible material cleared"}
          name={"permit_precautions_one"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_one || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={"Non-movable combustible material covered"}
          name={"permit_precautions_two"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_two || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={"Suitable extinguishers to hand"}
          name={"permit_precautions_three"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_three || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={"Gas cylinders secured in a vertical position on a trolley"}
          name={"permit_precautions_four"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_four || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={"Gas cylinders fitted with a regulator and flashback arrestor"}
          name={"permit_precautions_five"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_five || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={
            "Other personnel who may be affected by the work removed from the area"
          }
          name={"permit_precautions_six"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_six || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={"Opposite side checked and combustibles moved away"}
          name={"permit_precautions_seven"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_seven || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={"Work area screened to contain sparks"}
          name={"permit_precautions_eight"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_eight || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={"Gas cylinders at least 3m from the burner"}
          name={"permit_precautions_nine"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_nine || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <CheckboxContainer
          title={"If sited on the roof, heat insulating base provided"}
          name={"permit_precautions_ten"}
          checked={
            currentDocument.hot_work_permit?.permit_precautions_ten || false
          }
          handleOnChange={handleHotWorkPermit}
        />
        <h3>PART 3 - Details of Persons and Times of Permit</h3>
        <h4>Permit issued by:</h4>
        <Input
          text="Company"
          type="text"
          name="permit_issued_by_company"
          placeholder="Type company name"
          value={
            currentDocument.hot_work_permit?.permit_issued_by_company || ""
          }
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Input
          text="Name"
          type="text"
          name="permit_issued_by_person"
          placeholder="Type name"
          value={currentDocument.hot_work_permit?.permit_issued_by_person || ""}
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Signature
          ref={(el) => (inputs[0] = el)}
          handleChange={handlerIssuedByCompanySign}
        />
        <h4>Permit received by:</h4>
        <Input
          text="Company"
          type="text"
          name="permit_received_by_company"
          placeholder="Type company name"
          value={
            currentDocument.hot_work_permit?.permit_received_by_company || ""
          }
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Input
          text="Name"
          type="text"
          name="permit_received_by_person"
          placeholder="Type name"
          value={
            currentDocument.hot_work_permit?.permit_received_by_person || ""
          }
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Signature
          ref={(el) => (inputs[1] = el)}
          handleChange={handlerReceivedByCompanySign}
        />
        <h3>PART 4 - Final Check Up</h3>
        <h4>Final check by:</h4>
        <Input
          text="Time"
          type="time"
          name="final_check_time"
          value={currentDocument.hot_work_permit?.final_check_time || ""}
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Input
          text="Name"
          type="text"
          name="final_check_name"
          placeholder="Type name"
          value={currentDocument.hot_work_permit?.final_check_name || ""}
          handleOnChange={handleHotWorkPermit}
          autoComplete="off"
        />
        <Signature
          ref={(el) => (inputs[2] = el)}
          handleChange={handlerFinalCheckUpSign}
        />
        <h2 className={styles.form_subheading}>Daily Plant Inspection</h2>
        <DPICheckboxForm
          title={"1. Flashing Beacon"}
          name={"flashing_beacon"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Flashing Beacon"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Flashing Beacon")
          }
        />
        <DPICheckboxForm
          title={"2. Mirrors"}
          name={"mirrors"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Mirrors"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Mirrors")}
        />
        <DPICheckboxForm
          title={"3. Reverse Camera"}
          name={"reverse_camera"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Reverse Camera"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Reverse Camera")
          }
        />
        <DPICheckboxForm
          title={"4. Wipers"}
          name={"wipers"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Wipers"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Wipers")}
        />
        <DPICheckboxForm
          title={"5. Lights"}
          name={"lights"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Lights"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Lights")}
        />
        <DPICheckboxForm
          title={"6. Horn"}
          name={"horn"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Horn"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Horn")}
        />
        <DPICheckboxForm
          title={"7. Lab belt"}
          name={"lab_belt"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Lab belt"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Lab belt")}
        />
        <DPICheckboxForm
          title={"8. Steps"}
          name={"steps"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Steps"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Steps")}
        />
        <DPICheckboxForm
          title={"9. Hand Rails"}
          name={"hand_rails"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Hand Rails"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Hand Rails")}
        />
        <DPICheckboxForm
          title={"10. Emergency Stop"}
          name={"emergency_stop"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Emergency Stop"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Emergency Stop")
          }
        />
        <DPICheckboxForm
          title={"11. Hand Brake"}
          name={"hand_brake"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Hand Brake"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Hand Brake")}
        />
        <DPICheckboxForm
          title={"12. Brakes"}
          name={"brakes"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Brakes"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Brakes")}
        />
        <DPICheckboxForm
          title={"13. Drivers Seat"}
          name={"drivers_seat"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Drivers Seat"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Drivers Seat")}
        />
        <DPICheckboxForm
          title={"14. Windows"}
          name={"windows"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Windows"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Windows")}
        />
        <DPICheckboxForm
          title={"15. Fire Extinguisher"}
          name={"fire_extinguisher"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Fire Extinguisher"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Fire Extinguisher")
          }
        />
        <DPICheckboxForm
          title={"16. Guards in Place"}
          name={"guards_in_place"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Guards in Place"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Guards in Place")
          }
        />
        <DPICheckboxForm
          title={"17. Gas Bottles Secure"}
          name={"gas_bottles_secure"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Gas Bottles Secure"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Gas Bottles Secure")
          }
        />
        <DPICheckboxForm
          title={"18. Battery Condition"}
          name={"battery_condition"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Battery Condition"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Battery Condition")
          }
        />
        <DPICheckboxForm
          title={"19. Tyres"}
          name={"tyres"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Tyres"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Tyres")}
        />
        <DPICheckboxForm
          title={"20. Steering"}
          name={"steering"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Steering"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Steering")}
        />
        <DPICheckboxForm
          title={"21. Quick Hitch Pin"}
          name={"quick_hitch_pin"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Quick Hitch Pin"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Quick Hitch Pin")
          }
        />
        <DPICheckboxForm
          title={"22. FOPS"}
          name={"fops"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "FOPS"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "FOPS")}
        />
        <DPICheckboxForm
          title={"23. ROPS"}
          name={"rops"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "ROPS"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "ROPS")}
        />
        <DPICheckboxForm
          title={"24. Straps in good condition"}
          name={"straps_in_good_condition"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Straps in good condition"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Straps in good condition")
          }
        />
        <DPICheckboxForm
          title={"25. Transmission Oil"}
          name={"transmission_oil"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Transmission Oil"
          )}
          handleOnChange={(e) =>
            handleDailyPlantInspection(e, "Transmission Oil")
          }
        />
        <DPICheckboxForm
          title={"26. Engine Oil"}
          name={"engine_oil"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Engine Oil"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Engine Oil")}
        />
        <DPICheckboxForm
          title={"27. Hydraulic Oil"}
          name={"hydraulic_oil"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Hydraulic Oil"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Hydraulic Oil")}
        />
        <DPICheckboxForm
          title={"28. Water"}
          name={"water"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Water"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Water")}
        />
        <DPICheckboxForm
          title={"29. Fuel"}
          name={"fuel"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Fuel"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Fuel")}
        />
        <DPICheckboxForm
          title={"30. Brake Fluid"}
          name={"brake_fluid"}
          list={currentDocument.daily_plant_inspections?.filter(
            (el) => el.tool_name === "Brake Fluid"
          )}
          handleOnChange={(e) => handleDailyPlantInspection(e, "Brake Fluid")}
        />

        <h2 className={styles.form_subheading}>Near Miss Report</h2>
        <TextArea
          title={"Details of Near Miss"}
          name={"details_comments"}
          value={currentDocument.near_miss_report?.details_comments || ""}
          handleOnChange={handlerNearMissReport}
        />
        <TextArea
          title={"Actions Taken (if any)"}
          name={"actions_taken_comments"}
          value={currentDocument.near_miss_report?.actions_taken_comments || ""}
          handleOnChange={handlerNearMissReport}
        />
        <TextArea
          title={"Suggestions to prevent Reoccurance"}
          name={"suggestion_to_prevent_reoccurance_comments"}
          value={currentDocument.near_miss_report?.suggestion_to_prevent_reoccurance_comments || ""}
          handleOnChange={handlerNearMissReport}
        />
        <Signature
          ref={(el) => (inputs[3] = el)}
          handleChange={handlerNearMissReportSign}
        />
        <h2 className={styles.form_subheading}>
          Identify any futher Hazards and what controls are required
        </h2>
        <div className={styles.hazard_and_controls_container}>
          {currentDocument.futher_hazards_and_controls_requireds?.map((el, index) => (
            <HazardAndControls
              key={index}
              name={+index}
              nameValue={el?.name || ""}
              controlValue={el?.control_required || ""}
              handleOnChange={handleFutherHazards}
            />
          ))}
        </div>
        <button
          className={styles.add_hazard_controls}
          onClick={increaseHazardAndControlsQuantity}
        >
          Add more
        </button>
        <input className={styles.btn_form_save} type="submit" value="Save" />
      </form>
    </section>
  );
}

export default Forms;
