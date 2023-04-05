import { useState, useEffect, useContext } from "react";
import styles from "./Doc.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../context/UserContext";
import {
  RiCloseLine,
  RiDeleteBin5Line,
  RiEdit2Line,
  RiFileAddLine,
} from "react-icons/ri";

function ReinstatementSheetTable() {
  const navigate = useNavigate();
  const { setCurrentPdf, getCurrentPdf } = useContext(Context);
  const currentPdf = getCurrentPdf();
  const { id } = useParams();

  const [attendanceList, setAttendanceList] = useState([
    { name_print: "brddd", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
    { name_print: "breno", time_in: 10, time_out: 12 },
  ]);

  useEffect(() => {
    if (id) {
      setCurrentPdf(id);
    }
  }, [id, setCurrentPdf, attendanceList]);

  function deleteHoleSequence(index) {
    console.log(index);
    var array = attendanceList;
    array.splice(index, 1);
    setAttendanceList(array);
  }

  function navigateTo() {
    if (navigate(-1).pathname.includes("/FormIntoPDF-FrontEnd")) {
      navigate("/FormIntoPDF-FrontEnd");
    } else {
      navigate(`/document/${id}/update`);
    }
  }

  const styleBtnClose = {
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize: "30px",
    color: "var(--primary-color)",
    cursor: "pointer",
  };

  const styleIcons = {
    fontSize: "20px",
    color: "var(--primary-color)",
    cursor: "pointer",
  };

  return (
    <section>
      <RiCloseLine style={styleBtnClose} onClick={navigateTo} />
      <h1>Reinstatement Sheet</h1>
      <div className={styles.table}>
        <table>
          <tbody>
            <tr>
              <th>ESBN Hole No.</th>
              <th>Street</th>
              <th>Local Authority Licence No. T4/T2</th>
              <th>Traffic Impact No.</th>
              <th>Edit</th>
            </tr>
            <tr>
              <td>{currentPdf.esbh_hole_no}</td>
              <td>{currentPdf.esbh_hole_no}</td>
              <td>{currentPdf.esbh_hole_no}</td>
              <td>{currentPdf.esbh_hole_no}</td>
              <td className={styles.btn}>
                <RiEdit2Line
                  style={styleIcons}
                  onClick={() =>
                    navigate(`/document/update/reinstatementsheet_info/${id}`)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>Hole Sequence</th>
              <th>Location</th>
              <th>Surface Category</th>
              <th>Length</th>
              <th>Width</th>
              <th>Area</th>
              <th>Reinstatement</th>
              <th>Status</th>
              <th>Date Complete</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {attendanceList.map((element, key) => (
              <tr key={key}>
                <td>{currentPdf.esbh_hole_no}</td>
                <td>{currentPdf.esbh_hole_no}</td>
                <td>{currentPdf.esbh_hole_no}</td>
                <td>{currentPdf.esbh_hole_no}</td>
                <td>{currentPdf.esbh_hole_no}</td>
                <td>{currentPdf.esbh_hole_no}</td>
                <td>{currentPdf.esbh_hole_no}</td>
                <td>{currentPdf.esbh_hole_no}</td>
                <td>{currentPdf.esbh_hole_no}</td>
                <td className={styles.btn}>
                  <RiEdit2Line
                    style={styleIcons}
                    onClick={() =>
                      navigate(`/document/update/hole_sequence/${element.id}`)
                    }
                  />
                </td>
                <td className={styles.btn}>
                  <RiDeleteBin5Line
                    style={styleIcons}
                    onClick={() => deleteHoleSequence(key)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className={styles.btn}>
                <RiFileAddLine style={styleIcons} onClick={() => navigate(`/document/update/hole_sequence/new`)} />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th style={{ width: "120px" }}>Comments:</th>
              <td>"Comments..."</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.table_images}>
        <div className={styles.reinstatement_img_all}>
          {attendanceList.map((image, index) => (
            <img
              src={`${process.env.REACT_APP_API}/images/documents/${image}`}
              alt="job_image"
              key={`${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReinstatementSheetTable;
