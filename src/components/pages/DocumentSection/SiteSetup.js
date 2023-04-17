import api from "../../../utils/api";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../../form/Input";
import styles from "./Doc.module.css";
import CheckboxContainer from "../../form/CheckboxContainer";
import HazardCheckboxContainer from "../../form/HazardCheckboxContainer";
import { DocumentContext } from "../../../context/DocumentContext";

function SiteSetup() {
  const [token] = useState(localStorage.getItem("token"));
  const { id } = useParams();
  const [currentDocument, setCurrentDocument] = useState({});
  const [preview, setPreview] = useState("");
  const { updateSiteSetup } = useContext(DocumentContext);

  useEffect(() => {
    api
      .get(`/document/get/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setCurrentDocument(response.data.document);
      })
      .catch((err) => {
        return err.response.data.message;
      });
  }, [id, token]);

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setCurrentDocument({
      ...currentDocument,
      [e.target.name]: e.target.files[0],
    });
  }

  function handleChangeHazard(e) {
    const hazardName = e.target.name;
    const hazardValue = {
      checked:
        e.target.type === "checkbox"
          ? e.target.checked
          : currentDocument.Hazards[hazardName]?.checked || false,
      comment:
        e.target.type === "textarea"
          ? e.target.value
          : currentDocument.Hazards[hazardName]?.comment || "",
    };
    const hazardObject = { [hazardName]: hazardValue };
    const newHazards = { ...currentDocument.Hazards, ...hazardObject };
    setCurrentDocument({ ...currentDocument, Hazards: newHazards });
  }

  function handleDailyMethodStatement(e) {
    const dailyMethodStatementName = e.target.name;
    const dailyMethodStatementObject = {
      [dailyMethodStatementName]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    const newDailyMethodStatement = {
      ...currentDocument.daily_method_statement_and_traffic_management_check,
      ...dailyMethodStatementObject,
    };
    setCurrentDocument({
      ...currentDocument,
      daily_method_statement_and_traffic_management_check:
        newDailyMethodStatement,
    });
  }

  function handleEmergencies(e) {
    const emergencyName = e.target.name;
    const emergencyObject = {
      [emergencyName]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    const newEmergency = { ...currentDocument.Emergency, ...emergencyObject };
    setCurrentDocument({ ...currentDocument, Emergency: newEmergency });
  }

  function handleTrafficManagementComplianceChecksheet(e) {
    const tmccName = e.target.name;
    const tmccObject = {
      [tmccName]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    const newTmcc = {
      ...currentDocument.traffic_management_compliance_checksheet,
      ...tmccObject,
    };
    setCurrentDocument({
      ...currentDocument,
      traffic_management_compliance_checksheet: newTmcc,
    });
  }

  function handleTrafficManagementSLGChecklist(e) {
    const tmscName = e.target.name;
    const tmscObject = {
      [tmscName]: e.target.checked,
    };
    const newtmsc = {
      ...currentDocument.traffic_management_slg_checklist,
      ...tmscObject,
    };
    setCurrentDocument({
      ...currentDocument,
      traffic_management_slg_checklist: newtmsc,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateSiteSetup(currentDocument);
  }

  return (
    <section className={styles.form_container}>
      <h1>Site Setup</h1>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.form_subheading}>Hazards</h2>
        <HazardCheckboxContainer
          title={"Pedestrians/Cyclists"}
          name={"hazard_pedestrians_cyclists"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Road Traffic"}
          name={"road_traffic"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Work at Height"}
          name={"work_at_height"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"U/G services"}
          name={"ug_services"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Overhead Cables"}
          name={"overhead_cables"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Lifting Operations"}
          name={"lifting_operations"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Abrasive Wheels"}
          name={"abrasive_wheels"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Hand Tools"}
          name={"hand_tools"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Dust"}
          name={"dust"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Plant & Equipment"}
          name={"plant_and_equipment"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Ladders"}
          name={"ladders"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Work Near Water"}
          name={"work_near_water"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Excavation"}
          name={"excavation"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Falling Objects"}
          name={"falling_objects"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Haz Substances"}
          name={"haz_substances"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Bitumen Boiler"}
          name={"bitumen_boiler"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Noise"}
          name={"noise"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Concrete/Formwork"}
          name={"concrete_formwork"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Slips, trips, falls"}
          name={"slips_trips_falls"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Hot Works"}
          name={"hot_works"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Manual Handling"}
          name={"manual_handling"}
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Other"}
          name={"other"}
          handleOnChange={handleChangeHazard}
        />
        <h2 className={styles.form_subheading}>
          Daily Method Statement & Traffic Management Checks
        </h2>
        <Input
          text="Method Statement being used for today's work"
          type="text"
          name="method_statement_for_the_day"
          placeholder="Type Method Statement being used today"
          handleOnChange={handleDailyMethodStatement}
          autoComplete="off"
        />
        <CheckboxContainer
          title={
            "1.Will completion of the task involve any discharges to drains/water course?"
          }
          name={"daily_method_statement_question_one"}
          handleOnChange={handleDailyMethodStatement}
        />
        <CheckboxContainer
          title={
            "2.Are spill containment measures available (spill kit, drip tray etc.)?"
          }
          name={"daily_method_statement_question_two"}
          handleOnChange={handleDailyMethodStatement}
        />
        <CheckboxContainer
          title={
            "3.Are all fuel containers labelled (diesel, petrol etc)? and safety data sheets on site?"
          }
          name={"daily_method_statement_question_three"}
          handleOnChange={handleDailyMethodStatement}
        />
        <h2 className={styles.form_subheading}>Emergencies</h2>
        <CheckboxContainer
          title={
            "1.Is there an emergency procedure in place and are staff aware of its contents?"
          }
          name={"emergencies_question_one"}
          handleOnChange={handleEmergencies}
        />
        <Input
          text="Location of assembly point in the event of an emergency"
          type="text"
          name="emergency_location_of_assembly_point"
          placeholder="Type location of assembly point"
          handleOnChange={handleEmergencies}
          autoComplete="off"
        />
        <Input
          text="Name of First Aider"
          type="text"
          name="emergency_name_of_first_aider"
          placeholder="Type the name of the first aider"
          handleOnChange={handleEmergencies}
          autoComplete="off"
        />
        <Input
          text="Name of SLG Operative"
          type="text"
          name="emergency_slg_operative"
          placeholder="Type the name of SLG operative"
          handleOnChange={handleEmergencies}
          autoComplete="off"
        />
        <h2 className={styles.form_subheading}>
          Traffic Management Compliance Checksheet
        </h2>
        <Input
          text="TMP number set up on site"
          type="text"
          name="traffic_management_compliance_checksheet_tmp_number"
          placeholder="Type TMP number"
          handleOnChange={handleTrafficManagementComplianceChecksheet}
          autoComplete="off"
        />
        <CheckboxContainer
          title={
            "Is traffic management set up as per TMP in use? is TM amendment sheet required?"
          }
          name={"traffic_management_compliance_checksheet_question_one"}
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={"Are parked vehicles preventing proper TMP set up?"}
          name={"traffic_management_compliance_checksheet_question_two"}
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={
            "Are other local conditions preventing set up of traffic management as per TMP?"
          }
          name={"traffic_management_compliance_checksheet_question_three"}
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={"1.Are all excavations adequately fenced off and or covered?"}
          name={"traffic_management_compliance_checksheet_question_sub_one"}
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={
            "2.Are footways/pedestrians walkways free from trip hazards and obstructions?"
          }
          name={"traffic_management_compliance_checksheet_question_sub_two"}
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={
            "3.Are all footpath plates properly pinned to the ground surface?"
          }
          name={"traffic_management_compliance_checksheet_question_sub_three"}
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={"4.Are all required traffic management measures in plate?"}
          name={"traffic_management_compliance_checksheet_question_sub_four"}
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <h2 className={styles.form_subheading}>
          Traffic Management/SLG Checklist
        </h2>
        <h3>1.Installation Checks</h3>
        <CheckboxContainer
          title={"Does TM conform to the Design Layout and Parameters?"}
          name={"traffic_management_slg_checklist_question_1.1.1"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Have all the hazards been addresses in TM Plan?"}
          name={"traffic_management_slg_checklist_question_1.1.2"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Has allowance been made for the delivery and removal of materials?"
          }
          name={"traffic_management_slg_checklist_question_1.1.3"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />

        <CheckboxContainer
          title={"Is the traffic management for any detour routes in place?"}
          name={"traffic_management_slg_checklist_question_1.1.4"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of any Traffic Lights / Stop&Go Boards in use?"
          }
          name={"traffic_management_slg_checklist_question_1.1.5"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of Roadworks Speed Limits being introduced?"
          }
          name={"traffic_management_slg_checklist_question_1.1.6"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h3>2.Operation Checks</h3>
        <CheckboxContainer
          title={
            "Are safety zones being kept clear of operatives, plant and materials?"
          }
          name={"traffic_management_slg_checklist_question_2.1.1"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are all the signs and cones in good condition/ do all the cones have sleeves?"
          }
          name={"traffic_management_slg_checklist_question_2.1.2"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are vision lines to signs clear and free from bends, hills, dips, parked vehicles and hedges etc?"
          }
          name={"traffic_management_slg_checklist_question_2.1.3"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Will the site be safe at night in wind, fog, snow or rain?"}
          name={"traffic_management_slg_checklist_question_2.1.4"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are all misleading permanent signs and road markings covered?"
          }
          name={"traffic_management_slg_checklist_question_2.1.5"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Is the carriageway/footway being kept clear of mud and surplus equipment?"
          }
          name={"traffic_management_slg_checklist_question_2.1.6"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are materials/plant that are left on verges or in layby's being properly guarded and lit?"
          }
          name={"traffic_management_slg_checklist_question_2.1.7"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h3>2.2.Traffic Checks</h3>
        <CheckboxContainer
          title={"Is there safe access adjacent to premises?"}
          name={"traffic_management_slg_checklist_question_2.2.1"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Does Signing & Guarding meet the (changing) conditions?"}
          name={"traffic_management_slg_checklist_question_2.2.2"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are traffic control arrangements working at the optimum level to reduce traffic delays?"
          }
          name={"traffic_management_slg_checklist_question_2.2.3"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "If present, are the needs of cyclists or horse riders incorporated into the layout?"
          }
          name={"traffic_management_slg_checklist_question_2.2.4"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h3>2.3.Pedestrians & Vulnerable User Checks</h3>
        <CheckboxContainer
          title={
            "Have the needs of pedestrians and vulnerable users been addressed in the layout?"
          }
          name={"traffic_management_slg_checklist_question_2.3.1"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "If pedestrians route blocked, has a suitable alternative route been provided?"
          }
          name={"traffic_management_slg_checklist_question_2.3.2"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Are pedestrians routes clearly evident/indicated?"}
          name={"traffic_management_slg_checklist_question_2.3.3"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "If a footway in the road is to be used, are ramps to the kerb provided?"
          }
          name={"traffic_management_slg_checklist_question_2.3.4"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Are pedestrians hazards sufficiently guarded at night?"}
          name={"traffic_management_slg_checklist_question_2.3.5"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h3>3.Work Complete Checks</h3>
        <CheckboxContainer
          title={"Have all the signs, cones, barriers and lamps been removed?"}
          name={"traffic_management_slg_checklist_question_3.1.1"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Have any covered permanent signs been restored?"}
          name={"traffic_management_slg_checklist_question_3.1.2"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of any Traffic Lights / Stop&Go removed?"
          }
          name={"traffic_management_slg_checklist_question_3.1.3"}
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h2 className={styles.form_subheading}>Permit To Dig Checklist</h2>
        <label>
          Sketch indicating location and number of Services (Attach picture):
        </label>
        <br />
        <input
          className={styles.single_image}
          text="Image"
          type="file"
          name="permit_to_dig_sketch_image"
          onChange={onFileChange}
        />
        <div className={styles.preview_image}>
          {(currentDocument.permit_to_dig_sketch_image || preview) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/documents/${currentDocument.permit_to_dig_sketch_image}`
              }
              alt="Sketch img"
            />
          )}
        </div>
        <input className={styles.btn_form_save} type="submit" value="Save" />
      </form>
    </section>
  );
}

export default SiteSetup;
