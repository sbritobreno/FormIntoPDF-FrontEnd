import styles from "./DailyPlantInspectionCheckboxForm.module.css";

function DPICheckboxForm({ title, handleOnChange, list }) {
  const monday = list?.monday || false;
  const tuesday = list?.tuesday || false;
  const wednesday = list?.wednesday || false;
  const thursday = list?.thursday || false;
  const friday = list?.friday || false;
  const saturday = list?.saturday || false;
  const sunday = list?.sunday || false;

  return (
    <div className={styles.dpi_checkbox_form}>
      <h4>{title}:</h4>
      <div className={styles.week_checkbox_form}>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Mon</label>
          <input
            type="checkbox"
            name={`monday`}
            checked={monday}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Tue</label>
          <input
            type="checkbox"
            name={`tuesday`}
            checked={tuesday}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Wed</label>
          <input
            type="checkbox"
            name={`wednesday`}
            checked={wednesday}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Thurs</label>
          <input
            type="checkbox"
            name={`thursday`}
            checked={thursday}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Fri</label>
          <input
            type="checkbox"
            name={`friday`}
            checked={friday}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Sat</label>
          <input
            type="checkbox"
            name={`saturday`}
            checked={saturday}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Sun</label>
          <input
            type="checkbox"
            name={`sunday`}
            checked={sunday}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DPICheckboxForm;
