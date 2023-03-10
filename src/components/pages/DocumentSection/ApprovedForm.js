import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Doc.module.css";
import Input from "../../form/Input";
import { RiCloseLine, RiDeleteBin5Line } from "react-icons/ri";
import Signature from "../../form/Signature";

function ApprovedForm() {
  const navigate = useNavigate();
  const inputs = useRef([]);
  const [displayApprovedFormList, setDisplayApprovedFormList] = useState(false);
  const [newApprovedForm, setNewApprovedForm] = useState({});
  const [approvedFormList, setApprovedFormList] = useState([
    {
      description_location: "D01",
      date_examination: "10/10/2020",
      examination_result_state: "okay",
      inspector_signature: "Breno",
    },
    {
      description_location: "D01",
      date_examination: "10/10/2020",
      examination_result_state: "okay",
      inspector_signature: "Breno",
    },
  ]);

  useEffect(() => {
    // Anything in here is fired on component mount.
    document.querySelector("body").style.overflowX = "auto";

    return () => {
      // Anything in here is fired on component unmount.
      document.querySelector("body").style.overflowX = "hidden";
    };
  }, []);

  function handleChange(e) {
    setNewApprovedForm({ ...newApprovedForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApprovedFormList([...approvedFormList, newApprovedForm]);
    setNewApprovedForm({});

    const inputNumber = Object.keys(inputs);
    inputNumber.forEach((index) => {
      if (+index === 3) {
        const canvas = inputs[index].childNodes[0];
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      inputs[index].value = "";
    });
  }

  function saveApprovedFormStage() {
    navigate(-1);
  }

  function deleteRowApprovedForm(index) {
    var array = approvedFormList;
    array.splice(index, 1);
    setApprovedFormList(array);
    setNewApprovedForm({});
  }

  function handler(data) {
    if (checkIfSignPadIsEmpty(3))
      setNewApprovedForm({
        ...newApprovedForm,
        inspector_signature: data.toString(),
      });
    else console.error("No signature");
  }

  function checkIfSignPadIsEmpty(index) {
    const canvas = inputs[index].childNodes[0];
    const isSignPadEmpty = canvas
      .getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height)
      .data.some((channel) => channel !== 0);

    return isSignPadEmpty;
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
            <h1>Approved Form Table</h1>
            <table>
              <tbody>
                <tr>
                  <th>Description or Location</th>
                  <th>Date of Examination</th>
                  <th>Results of thorough examination</th>
                  <th>Inspector Signature</th>
                </tr>
                {approvedFormList.map((formRow, key) => (
                  <tr key={key}>
                    <td>{formRow.description_location}</td>
                    <td>{formRow.date_examination}</td>
                    <td>{formRow.examination_result_state}</td>
                    <td>
                      <img src={formRow.inspector_signature} alt="signature" />
                    </td>
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
              ref={(el) => (inputs[0] = el)}
              text="Description or Location"
              type="text"
              name="description_location"
              placeholder="Type description or location"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              ref={(el) => (inputs[1] = el)}
              text="Date of Examination"
              type="date"
              name="date_examination"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              ref={(el) => (inputs[2] = el)}
              text="Results of thorough examination"
              type="text"
              name="examination_result_state"
              placeholder="Type results of thorough examination"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Signature
              title="Signature of person who made the inspection:"
              handleChange={handler}
              ref={(el) => (inputs[3] = el)}
            />
            <input
              className={styles.btn_form_submit}
              type="submit"
              value="Submit"
            />
            <input
              className={styles.btn_see_current_list}
              type="button"
              value="See current list"
              onClick={() => setDisplayApprovedFormList(true)}
            />
            <input
              className={styles.btn_form_save}
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
