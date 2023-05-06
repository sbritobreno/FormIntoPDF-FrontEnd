import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import ConfirmWindow from "../Extras/ConfirmWindow";
import styles from "./Doc.module.css";
import Input from "../../form/Input";
import Signature from "../../form/Signature";
import { RiCloseLine, RiDeleteBin5Line } from "react-icons/ri";

function SiteAttendance() {
  const { id } = useParams();
  const { addAttendance, removeAttendance, getDocument } =
    useContext(DocumentContext);
  const navigate = useNavigate();
  const inputs = useRef([]);
  const [displayAttendanceList, setDisplayAttendanceList] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [newAttendance, setNewAttendance] = useState({});
  const [rerender, setRerender] = useState(false); // create a state variable
  const [attendanceToBeDeletedId, setAttendanceToBeDeletedId] = useState(null);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const btnText = "Remove";
  const message = "Are you sure you want to remove this attendance ?";

  useEffect(() => {
    getDocument(id)
      .then((res) => setAttendanceList(res.site_attendances))
      .catch((err) => {
        return err;
      });
  }, [id, rerender]);

  function handleChange(e) {
    setNewAttendance({ ...newAttendance, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let successful;

    await await addAttendance(id, newAttendance).then(
      (res) => (successful = res)
    );

    if (successful) {
      setNewAttendance({});
      setRerender(!rerender);

      // Clear input fields
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
  }

  function deleteRowAttendance(personId) {
    setAttendanceToBeDeletedId(personId);
    setConfirmWindowOpen(true);
  }

  async function confirmAction(confirmed = false) {
    setConfirmWindowOpen(false);
    if (confirmed) {
      await removeAttendance(attendanceToBeDeletedId);
    }
    setAttendanceToBeDeletedId(null);
    setNewAttendance({});
    setRerender(!rerender);
  }

  function handler(data) {
    if (checkIfSignPadIsEmpty(4))
      setNewAttendance({ ...newAttendance, staff_signature: data.toString() });
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
          {confirmWindowOpen && (
            <ConfirmWindow
              message={message}
              btnText={btnText}
              actionResponse={confirmAction}
            />
          )}
          <RiCloseLine
            style={style}
            onClick={() => setDisplayAttendanceList(false)}
          />
          <h1>Site Attendance Table</h1>
          <div className={styles.table}>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Signature</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
                {attendanceList.map((person, key) => (
                  <tr key={key}>
                    <td>{person.name}</td>
                    <td>{person.time_in}</td>
                    <td>{person.time_out}</td>
                    <td>
                      <img
                        src={
                          person.signature &&
                          `${process.env.REACT_APP_API}/images/documents/${person.signature}`
                        }
                        alt="signature"
                      />
                    </td>
                    <td>{person.date}</td>
                    <td className={styles.remove_btn}>
                      <RiDeleteBin5Line
                        style={{
                          fontSize: "20px",
                          color: "var(--primary-color)",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteRowAttendance(person.id)}
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
              text="Name"
              type="text"
              name="name"
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
              onClick={() => navigate(`/document/${id}/update`)}
            />
          </form>
        </section>
      )}
    </>
  );
}

export default SiteAttendance;
