import styles from "./DaySelector.module.css";

// DaySelector.js
const DaySelector = ({ onDayChange }) => {
  const dayMapping = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
    Saturday: "sat",
    Sunday: "sun",
  };

  return (
    <div className={styles.btnBox}>
      {Object.keys(dayMapping).map((day) => (
        <button
          key={day}
          onClick={() => onDayChange(dayMapping[day])}
          className={styles.button}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
