import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../form/Input";
import Signature from "../../form/Signature";
import styles from "./Doc.module.css";
import CheckboxContainer from "../../form/CheckboxContainer";
import HazardCheckboxContainer from "../../form/HazardCheckboxContainer";

function SiteSetup() {
  const navigate = useNavigate();
  const [siteSetup, setSiteSetup] = useState({});
  const [preview, setPreview] = useState("");

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setSiteSetup({ ...siteSetup, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setSiteSetup({ ...siteSetup, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/document/new", { state: { sectionIndex: 1 } });
  }

  return (
    <section className={styles.form_container}>
      <h1>Site Setup</h1>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.form_subheading}>Hazards</h2>
        <HazardCheckboxContainer
          title={"Pedestrians/Cyclists"}
          name={"hazard_pedestrians_cyclists"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Road Traffic"}
          name={"road_traffic"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Work at Height"}
          name={"work_at_height"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"U/G services"}
          name={"ug_services"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Overhead Cables"}
          name={"overhead_cables"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Lifting Operations"}
          name={"lifting_operations"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Abrasive Wheels"}
          name={"abrasive_wheels"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Hand Tools"}
          name={"hand_tools"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Dust"}
          name={"dust"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Plant & Equipment"}
          name={"plant_and_equipment"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Ladders"}
          name={"ladders"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Work Near Water"}
          name={"work_near_water"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Excavation"}
          name={"excavation"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Falling Objects"}
          name={"falling_objects"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Haz Substances"}
          name={"haz_substances"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Bitumen Boiler"}
          name={"bitumen_boiler"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Noise"}
          name={"noise"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Concrete/Formwork"}
          name={"concrete_formwork"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Slips, trips, falls"}
          name={"slips_trips_falls"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Hot Works"}
          name={"hot_works"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Manual Handling"}
          name={"manual_handling"}
          handleOnChange={handleChange}
        />
        <HazardCheckboxContainer
          title={"Other"}
          name={"other"}
          handleOnChange={handleChange}
        />
        <h2 className={styles.form_subheading}>
          Daily Method Statement & Traffic Management Checks
        </h2>
        <Input
          text="Method Statement being used for today's work"
          type="text"
          name="method_statement_for_the_day"
          placeholder="Type Method Statement being used today"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <CheckboxContainer
          title={
            "1.Will completion of the task involve any discharges to drains/water course?"
          }
          name={"daily_method_statement_question_one"}
        />
        <CheckboxContainer
          title={
            "2.Are spill containment measures available (spill kit, drip tray etc.)?"
          }
          name={"daily_method_statement_question_two"}
        />
        <CheckboxContainer
          title={
            "3.Are all fuel containers labelled (diesel, petrol etc)? and safety data sheets on site?"
          }
          name={"daily_method_statement_question_three"}
        />
        <h2 className={styles.form_subheading}>Emergencies</h2>
        <CheckboxContainer
          title={
            "1.Is there an emergency procedure in place and are staff aware of its contents?"
          }
          name={"emergencies_question_one"}
        />
        <Input
          text="Location of assembly point in the event of an emergency"
          type="text"
          name="emergency_location_of_assembly_point"
          placeholder="Type location of assembly point"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Name of First Aider"
          type="text"
          name="emergency_name_of_first_aider"
          placeholder="Type the name of the first aider"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <Input
          text="Name of SLG Operative"
          type="text"
          name="emergency_slg_operative"
          placeholder="Type the name of SLG operative"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <h2 className={styles.form_subheading}>
          Traffic Management Compliance Checksheet
        </h2>
        <CheckboxContainer
          title={
            "Is traffic management set up as per TMP in use? is TM amendment sheet required?"
          }
          name={"traffic_management_compliance_checksheet_question_one"}
        />
        <Input
          text="TMP number set up on site"
          type="text"
          name="traffic_management_compliance_checksheet_tmp_number"
          placeholder="Type TMP number"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <CheckboxContainer
          title={"Are parked vehicles preventing proper TMP set up?"}
          name={"traffic_management_compliance_checksheet_question_two"}
        />
        <CheckboxContainer
          title={
            "Are other local conditions preventing set up of traffic management as per TMP?"
          }
          name={"traffic_management_compliance_checksheet_question_three"}
        />
        <CheckboxContainer
          title={"1.Are all excavations adequately fenced off and or covered?"}
          name={"traffic_management_compliance_checksheet_question_sub_one"}
        />
        <CheckboxContainer
          title={
            "2.Are footways/pedestrians walkways free from trip hazards and obstructions?"
          }
          name={"traffic_management_compliance_checksheet_question_sub_two"}
        />
        <CheckboxContainer
          title={
            "3.Are all footpath plates properly pinned to the ground surface?"
          }
          name={"traffic_management_compliance_checksheet_question_sub_three"}
        />
        <CheckboxContainer
          title={"4.Are all required traffic management measures in plate?"}
          name={"traffic_management_compliance_checksheet_question_sub_four"}
        />
        <Signature/>
        {/* <Input
          text="Signature"
          type="text"
          name="traffic_management_compliance_checksheet_signature"
          placeholder="Sign here..."
          handleOnChange={handleChange}
          autoComplete="off"
        /> */}
        <h2 className={styles.form_subheading}>
          Traffic Management/SLG Checklist
        </h2>
        <h3>1.Installation Checks</h3>
        <CheckboxContainer
          title={"Does TM conform to the Design Layout and Parameters?"}
          name={"traffic_management_slg_checklist_question_1.1.1"}
        />
        <CheckboxContainer
          title={"Have all the hazards been addresses in TM Plan?"}
          name={"traffic_management_slg_checklist_question_1.1.2"}
        />
        <CheckboxContainer
          title={
            "Has allowance been made for the delivery and removal of materials?"
          }
          name={"traffic_management_slg_checklist_question_1.1.3"}
        />

        <CheckboxContainer
          title={"Is the traffic management for any detour routes in place?"}
          name={"traffic_management_slg_checklist_question_1.1.4"}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of any Traffic Lights / Stop&Go Boards in use?"
          }
          name={"traffic_management_slg_checklist_question_1.1.5"}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of Roadworks Speed Limits being introduced?"
          }
          name={"traffic_management_slg_checklist_question_1.1.6"}
        />
        <h3>2.Operation Checks</h3>
        <CheckboxContainer
          title={
            "Are safety zones being kept clear of operatives, plant and materials?"
          }
          name={"traffic_management_slg_checklist_question_2.1.1"}
        />
        <CheckboxContainer
          title={
            "Are all the signs and cones in good condition/ do all the cones have sleeves?"
          }
          name={"traffic_management_slg_checklist_question_2.1.2"}
        />
        <CheckboxContainer
          title={
            "Are vision lines to signs clear and free from bends, hills, dips, parked vehicles and hedges etc?"
          }
          name={"traffic_management_slg_checklist_question_2.1.3"}
        />
        <CheckboxContainer
          title={"Will the site be safe at night in wind, fog, snow or rain?"}
          name={"traffic_management_slg_checklist_question_2.1.4"}
        />
        <CheckboxContainer
          title={
            "Are all misleading permanent signs and road markings covered?"
          }
          name={"traffic_management_slg_checklist_question_2.1.5"}
        />
        <CheckboxContainer
          title={
            "Is the carriageway/footway being kept clear of mud and surplus equipment?"
          }
          name={"traffic_management_slg_checklist_question_2.1.6"}
        />
        <CheckboxContainer
          title={
            "Are materials/plant that are left on verges or in layby's being properly guarded and lit?"
          }
          name={"traffic_management_slg_checklist_question_2.1.7"}
        />
        <h3>2.2.Traffic Checks</h3>
        <CheckboxContainer
          title={"Is there safe access adjacent to premises?"}
          name={"traffic_management_slg_checklist_question_2.2.1"}
        />
        <CheckboxContainer
          title={"Does Signing & Guarding meet the (changing) conditions?"}
          name={"traffic_management_slg_checklist_question_2.2.2"}
        />
        <CheckboxContainer
          title={
            "Are traffic control arrangements working at the optimum level to reduce traffic delays?"
          }
          name={"traffic_management_slg_checklist_question_2.2.3"}
        />
        <CheckboxContainer
          title={
            "If present, are the needs of cyclists or horse riders incorporated into the layout?"
          }
          name={"traffic_management_slg_checklist_question_2.2.4"}
        />
        <h3>2.3.Pedestrians & Vulnerable User Checks</h3>
        <CheckboxContainer
          title={
            "Have the needs of pedestrians and vulnerable users been addressed in the layout?"
          }
          name={"traffic_management_slg_checklist_question_2.3.1"}
        />
        <CheckboxContainer
          title={
            "If pedestrians route blocked, has a suitable alternative route been provided?"
          }
          name={"traffic_management_slg_checklist_question_2.3.2"}
        />
        <CheckboxContainer
          title={"Are pedestrians routes clearly evident/indicated?"}
          name={"traffic_management_slg_checklist_question_2.3.3"}
        />
        <CheckboxContainer
          title={
            "If a footway in the road is to be used, are ramps to the kerb provided?"
          }
          name={"traffic_management_slg_checklist_question_2.3.4"}
        />
        <CheckboxContainer
          title={"Are pedestrians hazards sufficiently guarded at night?"}
          name={"traffic_management_slg_checklist_question_2.3.5"}
        />
        <h3>3.Work Complete Checks</h3>
        <CheckboxContainer
          title={"Have all the signs, cones, barriers and lamps been removed?"}
          name={"traffic_management_slg_checklist_question_3.1.1"}
        />
        <CheckboxContainer
          title={"Have any covered permanent signs been restored?"}
          name={"traffic_management_slg_checklist_question_3.1.2"}
        />
        <CheckboxContainer
          title={
            "Have the Garda been informed of any Traffic Lights / Stop&Go removed?"
          }
          name={"traffic_management_slg_checklist_question_3.1.3"}
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
          name="sketch_image"
          onChange={onFileChange}
        />
        <div className={styles.preview_images}>
          {(siteSetup.image || preview) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/users/${siteSetup.image}`
              }
              alt="Sketch img"
            />
          )}
        </div>
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default SiteSetup;
