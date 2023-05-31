import styles from "./ExpirationModal.module.css";
import { DispatchContext } from "../contexts/FormContext";
import { useContext } from "react";

const ExpirationModal = () => {
  const dispatch = useContext(DispatchContext);
  const startOver = () => {
    // console.log("start over");
    dispatch({ type: "START_OVER" });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Session expired</h2>
        <p>Your booking session has expired. Please start again to complete your booking.</p>
        <button onClick={startOver}>Start Again</button>
      </div>
    </div>
  );
};

export default ExpirationModal;
