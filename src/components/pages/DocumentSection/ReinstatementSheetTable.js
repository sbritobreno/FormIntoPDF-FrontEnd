import { useEffect, useContext } from "react";
import styles from "./Doc.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentContext } from "../../../context/DocumentContext";
import {
  RiCloseLine,
  RiDeleteBin5Line,
  RiEdit2Line,
  RiFileAddLine,
} from "react-icons/ri";

function ReinstatementSheetTable() {
  const navigate = useNavigate();
  const { currentReinstatementSheet, getReinstatementSheet } = useContext(DocumentContext);
  const { id } = useParams();

  useEffect(() => {
    getReinstatementSheet(id);
  }, [id]);

  function deleteHoleSequence(index) {}

  function navigateTo() {
    if (navigate(-1).pathname.includes("/update")) {
      navigate(`/document/${id}/update`);
    } else {
      navigate("/home");
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
              <td>{currentReinstatementSheet?.esbn_hole_number}</td>
              <td>{currentReinstatementSheet?.esbn_hole_number}</td>
              <td>{currentReinstatementSheet?.esbn_hole_number}</td>
              <td>{currentReinstatementSheet?.esbn_hole_number}</td>
              <td className={styles.btn}>
                <RiEdit2Line
                  style={styleIcons}
                  onClick={() =>
                    navigate(`/document/${id}/update/reinstatementsheet_info`)
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
            {currentReinstatementSheet?.hole_sequences?.map(
              (element, key) => (
                <tr key={key}>
                  <td>{(key + 1).toString()}</td>
                  <td>{element.coordinates}</td>
                  <td>{element.surface_category}</td>
                  <td>{element.length}</td>
                  <td>{element.width}</td>
                  <td>{element.area}</td>
                  <td>{element.reinstatement}</td>
                  <td>{element.status}</td>
                  <td>{element.date_complete}</td>
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
                      onClick={() => deleteHoleSequence(element.id)}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td className={styles.btn}>
                <RiFileAddLine
                  style={styleIcons}
                  onClick={() => navigate(`/document/update/hole_sequence/new`)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th style={{ width: "120px" }}>Comments:</th>
              <td>{currentReinstatementSheet?.esbn_hole_number}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {currentReinstatementSheet?.hole_sequences
        ?.reinstatement_images ? (
        <div className={styles.table_images}>
          <div className={styles.reinstatement_img_all}>
            {currentReinstatementSheet?.hole_sequences?.reinstatement_images?.map(
              (image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}/images/documents/${image}`}
                  alt="job_image"
                  key={`${index}`}
                />
              )
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default ReinstatementSheetTable;
