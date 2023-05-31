import styles from "./TimeoverModal.module.css";

const startOver = () => {
  window.location.reload();
};

const TimeoverModal = ({ startOver }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <h2>Session expired</h2>
      <p>Your booking session has expired. Please start again to complete your booking.</p>
      <button onClick={startOver}>Start Again</button>
    </div>
  </div>
);

export default TimeoverModal;
