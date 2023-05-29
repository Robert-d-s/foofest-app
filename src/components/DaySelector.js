import styles from "./DaySelector.module.css";
import { useState } from "react";

const DaySelector = ({ onDayChange }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const dayMapping = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
    Saturday: "sat",
    Sunday: "sun",
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    onDayChange(dayMapping[day]);
  };

  return (
    <div className={styles.btnBox}>
      {Object.keys(dayMapping).map((day) => (
        <button
          key={day}
          onClick={() => handleDayClick(day)}
          className={styles.button}
        >
          {selectedDay === day && "☆"}
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
