import styles from "./DailyPlantInspectionCheckboxForm.module.css";

function DPICheckboxForm({ title, name }) {
  return (
    <div className={styles.dpi_checkbox_form}>
      <h4>{title}:</h4>
      <div className={styles.week_checkbox_form}>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Mon</label>
          <input type="checkbox" name={"dpi_" + name + "_mon"} />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Tue</label>
          <input type="checkbox" name={"dpi_" + name + "_tue"} />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Wed</label>
          <input type="checkbox" name={"dpi_" + name + "_wed"} />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Thurs</label>
          <input type="checkbox" name={"dpi_" + name + "_thurs"} />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Fri</label>
          <input type="checkbox" name={"dpi_" + name + "_fri"} />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Sat</label>
          <input type="checkbox" name={"dpi_" + name + "_sat"} />
        </div>
        <div className={styles.day_checkbox_form}>
          <label className={styles.dpi_label}>Sun</label>
          <input type="checkbox" name={"dpi_" + name + "_sun"} />
        </div>
      </div>
    </div>
  );
}

export default DPICheckboxForm;
