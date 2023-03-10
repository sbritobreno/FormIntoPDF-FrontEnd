import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Doc.module.css";
import Input from "../../form/Input";
import Signature from "../../form/Signature";
import { RiCloseLine, RiDeleteBin5Line } from "react-icons/ri";

function SiteAttendance() {
  const navigate = useNavigate();
  const inputs = useRef([]);
  const [displayAttendanceList, setDisplayAttendanceList] = useState(false);
  const [newAttendance, setNewAttendance] = useState({});
  const [attendanceList, setAttendanceList] = useState([
    { name_print: "brddd", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
  ]);

  function handleChange(e) {
    setNewAttendance({ ...newAttendance, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAttendanceList([...attendanceList, newAttendance]);
    setNewAttendance({});

    const inputNumber = Object.keys(inputs);
    inputNumber.forEach((index) => {
      if (+index === 4) {
        const canvas = inputs[index].childNodes[0];
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      inputs[index].value = "";
    });
  }

  function saveAttendanceStage() {
    navigate(-1);
  }

  function deleteRowAttendance(index) {
    var array = attendanceList;
    array.splice(index, 1);
    setAttendanceList(array);
    setNewAttendance({});
  }

  function handler(data) {
    if (checkIfSignPadIsEmpty(4))
      setNewAttendance({ ...newAttendance, staff_signature: data.toString() });
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
      {displayAttendanceList ? (
        <>
          <RiCloseLine
            style={style}
            onClick={() => setDisplayAttendanceList(false)}
          />
          <div className={styles.table}>
            <h1>Site Attendance Table</h1>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Signature</th>
                  <th>Delete</th>
                </tr>
                {attendanceList.map((person, key) => (
                  <tr key={key}>
                    <td>{person.name_print}</td>
                    <td>{person.time_in}</td>
                    <td>{person.time_out}</td>
                    <td>
                      <img src={person.staff_signature} alt="signature" />
                    </td>
                    <td className={styles.remove_btn}>
                      <RiDeleteBin5Line
                        style={{
                          fontSize: "20px",
                          color: "var(--primary-color)",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteRowAttendance(key)}
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
          <h1>Site Attendance</h1>
          <form onSubmit={handleSubmit}>
            <Input
              ref={(el) => (inputs[0] = el)}
              text="Name Print"
              type="text"
              name="name_print"
              placeholder="Type staff name"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              ref={(el) => (inputs[1] = el)}
              text="Date"
              type="date"
              name="date"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              ref={(el) => (inputs[2] = el)}
              text="Time In"
              type="time"
              name="time_in"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              ref={(el) => (inputs[3] = el)}
              text="Time Out"
              type="time"
              name="time_out"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Signature ref={(el) => (inputs[4] = el)} handleChange={handler} />
            <input
              className={styles.btn_form_submit}
              type="submit"
              value="Submit"
            />
            <input
              className={styles.btn_see_current_list}
              type="button"
              value="See current list"
              onClick={() => setDisplayAttendanceList(true)}
            />
            <input
              className={styles.btn_form_save}
              type="button"
              value="Save"
              onClick={() => saveAttendanceStage()}
            />
          </form>
        </section>
      )}
    </>
  );
}

export default SiteAttendance;
