import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Doc.module.css";
import Input from "../../form/Input";
import Signature from "../../form/Signature";
import { RiCloseLine, RiDeleteBin5Line } from "react-icons/ri";

function SiteAttendance() {
  const navigate = useNavigate();
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
  }

  function saveAttendanceStage() {
    navigate("/document/new", { state: { sectionIndex: 0 } });
  }

  function deleteRowAttendance(index) {
    var array = attendanceList;
    array.splice(index, 1);
    setAttendanceList(array);
    setNewAttendance({});
  }

  function handler(data) {
    setNewAttendance({ ...newAttendance, staff_signature: data.toString() });
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
                      <img src={person.signature} alt="signature" />
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
              text="Name Print"
              type="text"
              name="name_print"
              placeholder="Type staff name"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Signature handleChange={handler} />
            {/* <Input
              text="Signature"
              type="text"
              name="staff_signature"
              placeholder="Type staff signature"
              handleOnChange={handleChange}
              autoComplete="off"
            /> */}
            <Input
              text="Location"
              type="text"
              name="location"
              placeholder="Type site location"
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
            <Input
              text="Time In"
              type="time"
              name="time_in"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <Input
              text="Time Out"
              type="time"
              name="time_out"
              handleOnChange={handleChange}
              autoComplete="off"
            />
            <input type="submit" value="Submit" />
            <input
              type="button"
              value="See current list"
              onClick={() => setDisplayAttendanceList(true)}
            />
            <input
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
