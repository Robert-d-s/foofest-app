import Image from "next/image";
import styles from "./Modal.module.css";

// Modal.js
const Modal = ({ band, onClose }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <h2>{band.name}</h2>
      <p>{band.bio}</p>
      <p>Genre: {band.genre}</p>
      {band.logo && (
        <>
          <Image
            src={
              band.logo.startsWith("https")
                ? band.logo
                : `http://localhost:8080/logos/${band.logo}`
            }
            alt={band.name}
            width={500}
            height={300}
          />
          {band.logoCredits && <p>Logo credits: {band.logoCredits}</p>}
        </>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Modal;
