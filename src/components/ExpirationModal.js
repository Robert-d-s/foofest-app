import styles from "./ExpirationModal.module.css";
import { DispatchContext } from "../contexts/FormContext";
import { useContext } from "react";

const ExpirationModal = () => {
  const dispatch = useContext(DispatchContext);
  const startOver = () => {
    dispatch({ type: "START_OVER" });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Session expired</h2>
        <p>
          Your booking session has expired. Please start again to complete your
          booking.
        </p>
        <div className={styles.btnOver}>
          <button onClick={startOver}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ExpirationModal;
