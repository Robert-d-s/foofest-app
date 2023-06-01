import { useContext, useEffect } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import AttendeeInfo from "./AttendeeInfo";
import styles from "../components/Personalinfo.module.css";

export default function PersonalInfo() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
    dispatch({ type: "CALCULATE_TOTAL_PRICE" });
  };
  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  return (
    <div className={styles.wrapper}>
      <h2>Personal Information</h2>

      <AttendeeInfo />

      <div className={styles.twoButtons}>
        <button className={styles.previousButton} onClick={handlePrevious}>
          ← &nbsp; Previous
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          Next &nbsp; →
        </button>
      </div>
    </div>
  );
}
