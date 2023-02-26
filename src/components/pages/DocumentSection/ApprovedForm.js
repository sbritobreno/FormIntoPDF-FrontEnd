import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Doc.module.css";
import Input from "../../form/Input";
import { RiCloseLine, RiDeleteBin5Line } from "react-icons/ri";

function ApprovedForm() {
  const navigate = useNavigate();
  const [displayApprovedFormList, setDisplayApprovedFormList] = useState(false);
  const [newApprovedForm, setNewApprovedForm] = useState({});
  const [approvedFormList, setApprovedFormList] = useState([
    { description_location: "D01", date_examination: "10/10/2020", examination_result_state: "okay", inspector_signature: "Breno" },
    { description_location: "D01", date_examination: "10/10/2020", examination_result_state: "okay", inspector_signature: "Breno" },
  ]);

  function handleChange(e) {
    setNewApprovedForm({ ...newApprovedForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApprovedFormList([...approvedFormList, newApprovedForm]);
  }

  function saveApprovedFormStage() {
    navigate("/document/new", { state: { sectionIndex: 2 } });
  }

  function deleteRowApprovedForm(index) {
    var array = approvedFormList;
    array.splice(index, 1);
    setApprovedFormList(array);
    setNewApprovedForm({});
  }

  const style = {
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize: "30px",
    color: "var(--primary-color)",
    cursor: "pointer",
  };

  return (
    <>
      {displayApprovedFormList ? (
        <>
          <RiCloseLine
            style={style}
            onClick={() => setDisplayApprovedFormList(false)}
          />
          <div className={styles.table}>
            <h1>Approved Form (AF 3) Table</h1>
            <table>
              <tbody>
                <tr>
                  <th>Description or Location</th>
                  <th>Date of Examination</th>
                  <th>Results of thorough examination</th>
                  <th>Signature of person who made the inspection</th>
                </tr>
                {approvedFormList.map((formRow, key) => (
                  <tr key={key}>
                    <td>{formRow.description_location}</td>
                    <td>{formRow.date_examination}</td>
                    <td>{formRow.examination_result_state}</td>
                    <td>{formRow.inspector_signature}</td>
                    <td className={styles.remove_btn}>
                      <RiDeleteBin5Line
                        style={{
                          fontSize: "20px",
                          color: "var(--primary-color)",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteRowApprovedForm(key)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <section className={styles.form_container}>
          <h1>Approved Form (AF 3)</h1>
          <form onSubmit={handleSubmit}>
            <Input
              text="Description or Location"
              type="text"
              name="description_location"
              placeholder="Type description or location"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              text="Date of Examination"
              type="date"
              name="date_examination"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              text="Results of thorough examination"
              type="text"
              name="examination_result_state"
              placeholder="Type results of thorough examination"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              text="Signature of person who made the inspection"
              type="text"
              name="inspector_signature"
              placeholder="Type description or location"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <input type="submit" value="Submit" />
            <input
              type="button"
              value="See current list"
              onClick={() => setDisplayApprovedFormList(true)}
            />
            <input
              type="button"
              value="Save"
              onClick={() => saveApprovedFormStage()}
            />
          </form>
        </section>
      )}
    </>
  );
}

export default ApprovedForm;
