import { useEffect, useContext, useState } from "react";
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
  const {
    currentReinstatementSheet,
    getReinstatementSheet,
    removeHoleSequence,
  } = useContext(DocumentContext);
  const { id } = useParams();
  const [rerender, setRerender] = useState(false); // create a state variable

  useEffect(() => {
    getReinstatementSheet(id);
  }, [id, rerender]);

  function navigateTo() {
    if (navigate(-1).pathname.includes("/update")) {
      navigate(`/document/${id}/update`);
    } else {
      navigate("/home");
    }
  }

  async function handleRemoveHoleSequence(id) {
    await removeHoleSequence(id);
    setRerender(!rerender); // update state variable to trigger rerender
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
              <td>{currentReinstatementSheet?.location}</td>
              <td>
                {currentReinstatementSheet?.local_authority_licence_number}
              </td>
              <td>{currentReinstatementSheet?.traffic_impact_number}</td>
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
            {currentReinstatementSheet?.hole_sequences?.map((element, key) => (
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
                    onClick={() => handleRemoveHoleSequence(element.id)}
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
                <RiFileAddLine
                  style={styleIcons}
                  onClick={() =>
                    navigate(`/document/${id}/update/hole_sequence/new`)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th style={{ width: "120px" }}>Comments:</th>
              <td>
                {currentReinstatementSheet?.hole_sequences?.map(
                  (element, index) =>
                    `${index + 1}: ` + element.comments.toString() + ";"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.table_images}>
        <div className={styles.reinstatement_img_all}>
          {currentReinstatementSheet.hole_sequences?.map((element, index) => {
            return element.reinstatement_images.map((image) => (
              <div
                className={styles.holesequence_number_parent}
                key={`${image.id}`}
              >
                <div className={styles.holesequence_number}>{index + 1}</div>
                <img
                  src={`${process.env.REACT_APP_API}/images/documents/${image.image}`}
                  alt="job_image"
                />
              </div>
            ));
          })}
        </div>
      </div>
    </section>
  );
}

export default ReinstatementSheetTable;
