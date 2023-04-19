import styles from "./DailyPlantInspectionCheckboxForm.module.css";

function DPICheckboxForm({ title, checked, handleOnChange, list }) {
  let monday,
    tuesday,
    wednesday,
    thrusday,
    friday,
    saturday,
    sunday = false;

  if (list) {
    monday = list[0]?.monday;
    tuesday = list[0]?.tuesday;
    wednesday = list[0]?.wednesday;
    thrusday = list[0]?.thrusday;
    friday = list[0]?.friday;
    saturday = list[0]?.saturday;
    sunday = list[0]?.sunday;
  }

  return (
    <div className={styles.dpi_checkbox_form}>
      <h4>{title}:</h4>
      <div className={styles.week_checkbox_form}>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Mon</label>
          <input
            type="checkbox"
            name={`monday`}
            checked={monday || false}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Tue</label>
          <input
            type="checkbox"
            name={`tuesday`}
            checked={tuesday || false}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Wed</label>
          <input
            type="checkbox"
            name={`wednesday`}
            checked={wednesday || false}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Thurs</label>
          <input
            type="checkbox"
            name={`thrusday`}
            checked={thrusday || false}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Fri</label>
          <input
            type="checkbox"
            name={`friday`}
            checked={friday || false}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Sat</label>
          <input
            type="checkbox"
            name={`saturday`}
            checked={saturday || false}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Sun</label>
          <input
            type="checkbox"
            name={`sunday`}
            checked={sunday || false}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DPICheckboxForm;
