import Image from "next/image";
import styles from "./Modal.module.css";

const Modal = ({ band, onClose }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <div className={styles.text}>
        <h2>{band && band.name}</h2>
        <p>{band && band.bio}</p>
        <p className={styles.bolded}>Genre: {band && band.genre}</p>
      </div>
      {band && band.logo && (
        <div className={styles.logo}>
          <Image
            src={
              band.logo.startsWith("https")
                ? band.logo
                : `https://hollow-glowing-gladiolus.glitch.me/logos/${band.logo}`
            }
            alt={band.name}
            fill
            style={{ objectFit: "fit" }}
          />
          {band.logoCredits && <p>Logo credits: {band.logoCredits}</p>}
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Modal;
