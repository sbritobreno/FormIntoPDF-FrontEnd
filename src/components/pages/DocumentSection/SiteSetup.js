import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../../form/Input";
import styles from "./Doc.module.css";
import CheckboxContainer from "../../form/CheckboxContainer";
import HazardCheckboxContainer from "../../form/HazardCheckboxContainer";
import { DocumentContext } from "../../../context/DocumentContext";

function SiteSetup() {
  const { id } = useParams();
  const [currentDocument, setCurrentDocument] = useState({});
  const [preview, setPreview] = useState("");
  const { updateSiteSetup, updateSiteSetupAddImage, getDocument } =
    useContext(DocumentContext);

  useEffect(() => {
    getDocument(id)
      .then((res) => setCurrentDocument(res))
      .catch((err) => {
        return err;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setCurrentDocument({
      ...currentDocument,
      [e.target.name]: e.target.files[0],
    });
  }

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let jobSSPlan = currentDocument.job_specific_safety_plan || {};
    jobSSPlan[e.target.name] = value;
    setCurrentDocument({
      ...currentDocument,
      job_specific_safety_plan: jobSSPlan,
    });
  }

  function handleChangeHazard(e) {
    const hazardName = e.target.name;
    const hazard = currentDocument.Hazards.find(
      (hazard) => hazard.name === hazardName
    );
    const hazardValue = {
      value:
        e.target.type === "checkbox"
          ? e.target.checked
          : hazard?.value || false,
      control:
        e.target.type === "textarea" ? e.target.value : hazard?.control || "",
      name: hazardName,
    };
    const hazardIndex = currentDocument.Hazards.findIndex(
      (hazard) => hazard.name === hazardName
    );
    const newHazards = [...currentDocument.Hazards];
    if (hazardIndex === -1) {
      newHazards.push(hazardValue);
    } else {
      newHazards[hazardIndex] = hazardValue;
    }
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

  async function handleSubmit(e) {
    e.preventDefault();
    await updateSiteSetupAddImage(
      currentDocument.permit_to_dig_sketch_image,
      id
    );
    await updateSiteSetup(currentDocument);
  }

  return (
    <section className={styles.form_container}>
      <h1>Site Setup</h1>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.form_subheading}>Job Specific Safety Plan</h2>
        <Input
          text="Date"
          type="date"
          name="date"
          value={
            currentDocument?.job_specific_safety_plan?.date
              ? new Date(
                  currentDocument.job_specific_safety_plan.date.split(" ")[0]
                )
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Crew Leader"
          type="text"
          name="crew_leader"
          value={currentDocument.job_specific_safety_plan?.crew_leader || ""}
          maxLength={"30"}
          placeholder="Type crew leader name"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Project Number"
          type="text"
          name="project_number"
          value={currentDocument.job_specific_safety_plan?.project_number || ""}
          maxLength={"30"}
          placeholder="Type project number"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <h3>
          Services identified on site after CAT scanning and complete a permit
        </h3>
        <CheckboxContainer
          bold={true}
          title={"Eletricity"}
          name={"services_eletricity"}
          checked={
            currentDocument.job_specific_safety_plan?.services_eletricity ||
            false
          }
          handleOnChange={handleChange}
        />
        <CheckboxContainer
          bold={true}
          title={"Traffic Lights "}
          name={"services_traffic_lights"}
          checked={
            currentDocument.job_specific_safety_plan?.services_traffic_lights ||
            false
          }
          handleOnChange={handleChange}
        />
        <CheckboxContainer
          bold={true}
          title={"Public Light"}
          name={"services_public_light"}
          checked={
            currentDocument.job_specific_safety_plan?.services_public_light ||
            false
          }
          handleOnChange={handleChange}
        />
        <CheckboxContainer
          bold={true}
          title={"Gas"}
          name={"services_gas"}
          checked={
            currentDocument.job_specific_safety_plan?.services_gas || false
          }
          handleOnChange={handleChange}
        />
        <CheckboxContainer
          bold={true}
          title={"Telecom"}
          name={"services_telecom"}
          checked={
            currentDocument.job_specific_safety_plan?.services_telecom || false
          }
          handleOnChange={handleChange}
        />
        <CheckboxContainer
          bold={true}
          title={"Water"}
          name={"services_water"}
          checked={
            currentDocument.job_specific_safety_plan?.services_water || false
          }
          handleOnChange={handleChange}
        />
        <CheckboxContainer
          bold={true}
          title={"No services found"}
          name={"services_no_services_found"}
          checked={
            currentDocument.job_specific_safety_plan
              ?.services_no_services_found || false
          }
          handleOnChange={handleChange}
        />
        <h2 className={styles.form_subheading}>Hazards</h2>
        <HazardCheckboxContainer
          title={"Pedestrians/Cyclists"}
          name={"hazard_pedestrians_cyclists"}
          checked={
            currentDocument.Hazards?.find(
              (el) => el.name === "hazard_pedestrians_cyclists"
            )?.value || false
          }
          value={
            currentDocument.Hazards?.find(
              (el) => el.name === "hazard_pedestrians_cyclists"
            )?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Road Traffic"}
          name={"road_traffic"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "road_traffic")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "road_traffic")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Work at Height"}
          name={"work_at_height"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "work_at_height")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "work_at_height")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"U/G services"}
          name={"ug_services"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "ug_services")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "ug_services")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Overhead Cables"}
          name={"overhead_cables"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "overhead_cables")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "overhead_cables")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Lifting Operations"}
          name={"lifting_operations"}
          checked={
            currentDocument.Hazards?.find(
              (el) => el.name === "lifting_operations"
            )?.value || false
          }
          value={
            currentDocument.Hazards?.find(
              (el) => el.name === "lifting_operations"
            )?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Abrasive Wheels"}
          name={"abrasive_wheels"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "abrasive_wheels")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "abrasive_wheels")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Hand Tools"}
          name={"hand_tools"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "hand_tools")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "hand_tools")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Dust"}
          name={"dust"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "dust")?.value ||
            false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "dust")?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Plant & Equipment"}
          name={"plant_and_equipment"}
          checked={
            currentDocument.Hazards?.find(
              (el) => el.name === "plant_and_equipment"
            )?.value || false
          }
          value={
            currentDocument.Hazards?.find(
              (el) => el.name === "plant_and_equipment"
            )?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Ladders"}
          name={"ladders"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "ladders")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "ladders")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Work Near Water"}
          name={"work_near_water"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "work_near_water")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "work_near_water")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Excavation"}
          name={"excavation"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "excavation")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "excavation")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Falling Objects"}
          name={"falling_objects"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "falling_objects")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "falling_objects")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Haz Substances"}
          name={"haz_substances"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "haz_substances")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "haz_substances")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Bitumen Boiler"}
          name={"bitumen_boiler"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "bitumen_boiler")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "bitumen_boiler")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Noise"}
          name={"noise"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "noise")?.value ||
            false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "noise")?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Concrete/Formwork"}
          name={"concrete_formwork"}
          checked={
            currentDocument.Hazards?.find(
              (el) => el.name === "concrete_formwork"
            )?.value || false
          }
          value={
            currentDocument.Hazards?.find(
              (el) => el.name === "concrete_formwork"
            )?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Slips, trips, falls"}
          name={"slips_trips_falls"}
          checked={
            currentDocument.Hazards?.find(
              (el) => el.name === "slips_trips_falls"
            )?.value || false
          }
          value={
            currentDocument.Hazards?.find(
              (el) => el.name === "slips_trips_falls"
            )?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Hot Works"}
          name={"hot_works"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "hot_works")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "hot_works")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Manual Handling"}
          name={"manual_handling"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "manual_handling")
              ?.value || false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "manual_handling")
              ?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <HazardCheckboxContainer
          title={"Other"}
          name={"other"}
          checked={
            currentDocument.Hazards?.find((el) => el.name === "other")?.value ||
            false
          }
          value={
            currentDocument.Hazards?.find((el) => el.name === "other")?.control
          }
          handleOnChange={handleChangeHazard}
        />
        <h2 className={styles.form_subheading}>
          Daily Method Statement & Traffic Management Checks
        </h2>
        <Input
          text="Method Statement being used for today's work"
          type="text"
          name="method_statement_for_the_day"
          maxLength={"75"}
          value={
            currentDocument.daily_method_statement_and_traffic_management_check
              ?.method_statement_for_the_day || ""
          }
          placeholder="Type Method Statement being used today"
          handleOnChange={handleDailyMethodStatement}
          autoComplete="off"
        />
        <CheckboxContainer
          title={
            "1.Will completion of the task involve any discharges to drains/water course?"
          }
          name={"daily_method_statement_question_one"}
          checked={
            currentDocument.daily_method_statement_and_traffic_management_check
              ?.daily_method_statement_question_one || false
          }
          handleOnChange={handleDailyMethodStatement}
        />
        <CheckboxContainer
          title={
            "2.Are spill containment measures available (spill kit, drip tray etc.)?"
          }
          name={"daily_method_statement_question_two"}
          checked={
            currentDocument.daily_method_statement_and_traffic_management_check
              ?.daily_method_statement_question_two || false
          }
          handleOnChange={handleDailyMethodStatement}
        />
        <CheckboxContainer
          title={
            "3.Are all fuel containers labelled (diesel, petrol etc)? and safety data sheets on site?"
          }
          name={"daily_method_statement_question_three"}
          checked={
            currentDocument.daily_method_statement_and_traffic_management_check
              ?.daily_method_statement_question_three || false
          }
          handleOnChange={handleDailyMethodStatement}
        />
        <h2 className={styles.form_subheading}>Emergencies</h2>
        <CheckboxContainer
          title={
            "1.Is there an emergency procedure in place and are staff aware of its contents?"
          }
          name={"emergencies_question_one"}
          checked={currentDocument.Emergency?.emergencies_question_one || false}
          handleOnChange={handleEmergencies}
        />
        <Input
          text="Location of assembly point in the event of an emergency"
          type="text"
          name="emergency_location_of_assembly_point"
          maxLength={"75"}
          value={
            currentDocument.Emergency?.emergency_location_of_assembly_point ||
            ""
          }
          placeholder="Type location of assembly point"
          handleOnChange={handleEmergencies}
          autoComplete="off"
        />
        <Input
          text="Name of First Aider"
          type="text"
          name="emergency_name_of_first_aider"
          maxLength={"75"}
          value={currentDocument.Emergency?.emergency_name_of_first_aider || ""}
          placeholder="Type the name of the first aider"
          handleOnChange={handleEmergencies}
          autoComplete="off"
        />
        <Input
          text="Name of SLG Operative"
          type="text"
          name="emergency_slg_operative"
          maxLength={"75"}
          value={currentDocument.Emergency?.emergency_slg_operative || ""}
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
          maxLength={"75"}
          value={
            currentDocument.traffic_management_compliance_checksheet
              ?.traffic_management_compliance_checksheet_tmp_number || ""
          }
          placeholder="Type TMP number"
          handleOnChange={handleTrafficManagementComplianceChecksheet}
          autoComplete="off"
        />
        <CheckboxContainer
          title={
            "Is traffic management set up as per TMP in use? is TM amendment sheet required?"
          }
          name={"traffic_management_compliance_checksheet_question_one"}
          checked={
            currentDocument.traffic_management_compliance_checksheet
              ?.traffic_management_compliance_checksheet_question_one || false
          }
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={"Are parked vehicles preventing proper TMP set up?"}
          name={"traffic_management_compliance_checksheet_question_two"}
          checked={
            currentDocument.traffic_management_compliance_checksheet
              ?.traffic_management_compliance_checksheet_question_two || false
          }
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={
            "Are other local conditions preventing set up of traffic management as per TMP?"
          }
          name={"traffic_management_compliance_checksheet_question_three"}
          checked={
            currentDocument.traffic_management_compliance_checksheet
              ?.traffic_management_compliance_checksheet_question_three || false
          }
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={"1.Are all excavations adequately fenced off and or covered?"}
          name={"traffic_management_compliance_checksheet_question_sub_one"}
          checked={
            currentDocument.traffic_management_compliance_checksheet
              ?.traffic_management_compliance_checksheet_question_sub_one ||
            false
          }
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={
            "2.Are footways/pedestrians walkways free from trip hazards and obstructions?"
          }
          name={"traffic_management_compliance_checksheet_question_sub_two"}
          checked={
            currentDocument.traffic_management_compliance_checksheet
              ?.traffic_management_compliance_checksheet_question_sub_two ||
            false
          }
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={
            "3.Are all footpath plates properly pinned to the ground surface?"
          }
          name={"traffic_management_compliance_checksheet_question_sub_three"}
          checked={
            currentDocument.traffic_management_compliance_checksheet
              ?.traffic_management_compliance_checksheet_question_sub_three ||
            false
          }
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <CheckboxContainer
          title={"4.Are all required traffic management measures in plate?"}
          name={"traffic_management_compliance_checksheet_question_sub_four"}
          checked={
            currentDocument.traffic_management_compliance_checksheet
              ?.traffic_management_compliance_checksheet_question_sub_four ||
            false
          }
          handleOnChange={handleTrafficManagementComplianceChecksheet}
        />
        <h2 className={styles.form_subheading}>
          Traffic Management/SLG Checklist
        </h2>
        <h3>1.Installation Checks</h3>
        <CheckboxContainer
          title={"Does TM conform to the Design Layout and Parameters?"}
          name={"installation_checks_one"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.installation_checks_one || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Have all the hazards been addresses in TM Plan?"}
          name={"installation_checks_two"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.installation_checks_two || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Has allowance been made for the delivery and removal of materials?"
          }
          name={"installation_checks_three"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.installation_checks_three || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Is the traffic management for any detour routes in place?"}
          name={"installation_checks_four"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.installation_checks_four || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of any Traffic Lights / Stop&Go Boards in use?"
          }
          name={"installation_checks_five"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.installation_checks_five || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of Roadworks Speed Limits being introduced?"
          }
          name={"installation_checks_six"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.installation_checks_six || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h3>2.Operation Checks</h3>
        <CheckboxContainer
          title={
            "Are safety zones being kept clear of operatives, plant and materials?"
          }
          name={"operation_checks_one"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.operation_checks_one || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are all the signs and cones in good condition/ do all the cones have sleeves?"
          }
          name={"operation_checks_two"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.operation_checks_two || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are vision lines to signs clear and free from bends, hills, dips, parked vehicles and hedges etc?"
          }
          name={"operation_checks_three"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.operation_checks_three || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Will the site be safe at night in wind, fog, snow or rain?"}
          name={"operation_checks_four"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.operation_checks_four || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are all misleading permanent signs and road markings covered?"
          }
          name={"operation_checks_five"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.operation_checks_five || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Is the carriageway/footway being kept clear of mud and surplus equipment?"
          }
          name={"operation_checks_six"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.operation_checks_six || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are materials/plant that are left on verges or in layby's being properly guarded and lit?"
          }
          name={"operation_checks_seven"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.operation_checks_seven || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h3>2.2.Traffic Checks</h3>
        <CheckboxContainer
          title={"Is there safe access adjacent to premises?"}
          name={"traffic_checks_one"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.traffic_checks_one || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Does Signing & Guarding meet the (changing) conditions?"}
          name={"traffic_checks_two"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.traffic_checks_two || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Are traffic control arrangements working at the optimum level to reduce traffic delays?"
          }
          name={"traffic_checks_three"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.traffic_checks_three || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "If present, are the needs of cyclists or horse riders incorporated into the layout?"
          }
          name={"traffic_checks_four"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.traffic_checks_four || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h3>2.3.Pedestrians & Vulnerable User Checks</h3>
        <CheckboxContainer
          title={
            "Have the needs of pedestrians and vulnerable users been addressed in the layout?"
          }
          name={"vulnerable_user_checks_one"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.vulnerable_user_checks_one || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "If pedestrians route blocked, has a suitable alternative route been provided?"
          }
          name={"vulnerable_user_checks_two"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.vulnerable_user_checks_two || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Are pedestrians routes clearly evident/indicated?"}
          name={"vulnerable_user_checks_three"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.vulnerable_user_checks_three || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "If a footway in the road is to be used, are ramps to the kerb provided?"
          }
          name={"vulnerable_user_checks_four"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.vulnerable_user_checks_four || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Are pedestrians hazards sufficiently guarded at night?"}
          name={"vulnerable_user_checks_five"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.vulnerable_user_checks_five || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <h3>3.Work Complete Checks</h3>
        <CheckboxContainer
          title={"Have all the signs, cones, barriers and lamps been removed?"}
          name={"work_complete_checks_one"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.work_complete_checks_one || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={"Have any covered permanent signs been restored?"}
          name={"work_complete_checks_two"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.work_complete_checks_two || false
          }
          handleOnChange={handleTrafficManagementSLGChecklist}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of any Traffic Lights / Stop&Go removed?"
          }
          name={"work_complete_checks_three"}
          checked={
            currentDocument.traffic_management_slg_checklist
              ?.work_complete_checks_three || false
          }
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
          accept=".png,.jpg"
          name="permit_to_dig_sketch_image"
          onChange={onFileChange}
        />{" "}
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
