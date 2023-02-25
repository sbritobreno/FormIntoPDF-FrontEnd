import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../form/Input";
import styles from "./Doc.module.css";

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
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="hazard_pedestrians_cyclists" />
          <label>Pedestrians/Cyclists</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="hazard_pedestrians_cyclists_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="road_traffic" />
          <label>Road Traffic</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="road_traffic_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="work_at_height" />
          <label>Work at Height</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="work_at_height_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="ug_services" />
          <label>U/G services</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="ug_services_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="overhead_cables" />
          <label>Overhead Cables</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="overhead_cables_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="lifting_operations" />
          <label>Lifting Operations</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="lifting_operations_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="abrasive_wheels" />
          <label>Abrasive Wheels</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="abrasive_wheels_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="hand_tools" />
          <label>Hand Tools</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="hand_tools_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="dust" />
          <label>Dust</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="dust_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="plant_and_equipment" />
          <label>Plant & Equipment</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="plant_and_equipment_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="ladders" />
          <label>Ladders</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="ladders_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="work_near_water" />
          <label>Work Near Water</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="work_near_water_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="excavation" />
          <label>Excavation</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="excavation_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="falling_objects" />
          <label>Falling Objects</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="falling_objects_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="haz_substances" />
          <label>Haz Substances</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="haz_substances_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="bitumen_boiler" />
          <label>Bitumen Boiler</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="bitumen_boiler_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="noise" />
          <label>Noise</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="noise_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="concrete_formwork" />
          <label>Concrete/Formwork</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="concrete_formwork_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="slips_trips_falls" />
          <label>Slips, trips, falls</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="slips_trips_falls_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="hot_works" />
          <label>Hot Works</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="hot_works_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="manual_handling" />
          <label>Manual Handling</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="manual_handling_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
        <div className={styles.hazard_check_container}>
          <input type="checkbox" name="other" />
          <label>Other</label>
        </div>
        <textarea
          className={styles.hazard_comments}
          rows="2"
          name="other_comment"
          placeholder="*Optional"
          onChange={handleChange}
          autoComplete="off"
        ></textarea>
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
        <div className={styles.check_container}>
          <input type="checkbox" name="daily_method_statement_question_one" />
          <label>
            1.Will completion of the task involve any discharges to drains/water
            course?
          </label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="daily_method_statement_question_two" />
          <label>
            2.Are spill containment measures available (spill kit, drip tray
            etc.)?
          </label>
        </div>
        <div className={styles.check_container}>
          <input type="checkbox" name="daily_method_statement_question_three" />
          <label>
            3.Are all fuel containers labelled (diesel, petrol etc)? and safety
            data sheets on site?
          </label>
        </div>
        <h2 className={styles.form_subheading}>Emergencies</h2>
        <div className={styles.check_container}>
          <input type="checkbox" name="emergencies_question_one" />
          <label>
            1.Is there an emergency procedure in place and are staff aware of
            its contents?
          </label>
        </div>
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
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_compliance_checksheet_question_one"
          />
          <label>
            Is traffic management set up as per TMP in use? is TM amendment
            sheet required?
          </label>
        </div>
        <Input
          text="TMP number set up on site"
          type="text"
          name="traffic_management_compliance_checksheet_tmp_number"
          placeholder="Type TMP number"
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_compliance_checksheet_question_two"
          />
          <label>Are parked vehicles preventing proper TMP set up?</label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_compliance_checksheet_question_three"
          />
          <label>
            Are other local conditions preventing set up of traffic management
            as per TMP?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_compliance_checksheet_question_sub_one"
          />
          <label>
            1.Are all excavations adequately fenced off and or covered?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_compliance_checksheet_question_sub_two"
          />
          <label>
            2.Are footways/pedestrians walkways free from trip hazards and
            obstructions?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_compliance_checksheet_question_sub_three"
          />
          <label>
            3.Are all footpath plates properly pinned to the ground surface?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_compliance_checksheet_question_sub_four"
          />
          <label>
            4.Are all required traffic management measures in plate?
          </label>
        </div>
        <Input
          text="Signature"
          type="text"
          name="traffic_management_compliance_checksheet_signature"
          placeholder="Sign here..."
          handleOnChange={handleChange}
          autoComplete="off"
        />
        <h2 className={styles.form_subheading}>
          Traffic Management/SLG Checklist
        </h2>
        <h3>1.Installation Checks</h3>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_1.1.1"
          />
          <label>Does Tm conform to the Design Layout and Parameters?</label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_1.1.2"
          />
          <label>Have all the hazards been addresses in TM Plan?</label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_1.1.3"
          />
          <label>
            Has allowance been made for the delivery and removal of materials?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_1.1.4"
          />
          <label>
            Is the traffic management for any detour routes in place?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_1.1.5"
          />
          <label>
            Have the Garda been informed of any Traffic Lights / Stop&Go Boards
            in use?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_1.1.6"
          />
          <label>
            Have the Garda been informed of Roadworks Speed Limits being
            introduced?
          </label>
        </div>
        <h3>2.Operation Checks</h3>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.1.1"
          />
          <label>
            Are safety zones being kept clear of operatives, plant and
            materials?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.1.2"
          />
          <label>
            Are all the signs and cones in good condition/ do all the cones have
            sleeves?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.1.3"
          />
          <label>
            Are vision lines to signs clear and free from bends, hills, dips,
            parked vehicles and hedges etc?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.1.4"
          />
          <label>
            Will the site be safe at night in wind, fog, snow or rain?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.1.5"
          />
          <label>
            Are all misleading permanent signs and road markings covered?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.1.6"
          />
          <label>
            Is the carriageway/footway being kept clear of mud and surplus
            equipment?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.1.7"
          />
          <label>
            Are materials/plant that are left on verges or in layby's being
            properly guarded and lit?
          </label>
        </div>
        <h3>2.2.Traffic Checks</h3>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.2.1"
          />
          <label>Is there safe access adjacent to premises?</label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.2.2"
          />
          <label>Does Signing & Guarding meet the (changing) conditions?</label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.2.3"
          />
          <label>
            Are traffic control arrangements working at the optimum level to
            reduce traffic delays?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.2.4"
          />
          <label>
            If present, are the needs of cyclists or horse riders incorporated
            into the layout?
          </label>
        </div>
        <h3>2.3.Pedestrians & Vulnerable User Checks</h3>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.3.1"
          />
          <label>
            Have the needs of pedestrians and vulnerable users been addressed in
            the layout?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.3.2"
          />
          <label>
            If pedestrians route blocked, has a suitable alternative route been
            provided?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.3.3"
          />
          <label>Are pedestrians routes clearly evident/indicated?</label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.3.4"
          />
          <label>
            If a footway in the road is to be used, are ramps to the kerb
            provided?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_2.3.5"
          />
          <label>Are pedestrians hazards sufficiently guarded at night?</label>
        </div>
        <h3>3.Work Complete Checks</h3>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_3.1.1"
          />
          <label>
            Have all the signs, cones, barriers and lamps been removed?
          </label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_3.1.2"
          />
          <label>Have any covered permanent signs been restored?</label>
        </div>
        <div className={styles.check_container}>
          <input
            type="checkbox"
            name="traffic_management_slg_checklist_question_3.1.3"
          />
          <label>
            Have the Garda been informed of any Traffic Lights / Stop&Go
            removed?
          </label>
        </div>
        <h2 className={styles.form_subheading}>Permit To Dig Checklist</h2>
        <label>
          Sketch indicating location and number of Services (Attach picture):{" "}
        </label>
        <br />
        <input
          className={styles.sketch_image}
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
