import Image from "next/image";
import styles from "./Modal.module.css";

// Modal.js
// const Modal = ({ band, onClose }) => (
//   <div className={styles.modal}>
//     <div className={styles.modalContent}>
//       <h2>{band.name}</h2>
//       <p>{band.bio}</p>
//       <p>Genre: {band.genre}</p>
//       {band.logo && (
//         <>
//           <Image
//             src={
//               band.logo.startsWith("https")
//                 ? band.logo
//                 : `https://hollow-glowing-gladiolus.glitch.me/logos/${band.logo}`
//             }
//             alt={band.name}
//             width={500}
//             height={300}
//           />
//           {band.logoCredits && <p>Logo credits: {band.logoCredits}</p>}
//         </>
//       )}
//       <button onClick={onClose}>Close</button>
//     </div>
//   </div>
// );

// export default Modal;

// const Modal = ({ band, onClose }) => (
//   <div className={styles.modal}>
//     <div className={styles.modalContent}>
//       <h2>{band && band.name}</h2>
//       <p>{band && band.bio}</p>
//       <p>Genre: {band && band.genre}</p>
//       {band && band.logo && (
//         <>
//           <Image
//             src={
//               band.logo.startsWith("https")
//                 ? band.logo
//                 : `https://hollow-glowing-gladiolus.glitch.me/logos/${band.logo}`
//             }
//             alt={band.name}
//             width={500}
//             height={300}
//           />
//           {band.logoCredits && <p>Logo credits: {band.logoCredits}</p>}
//         </>
//       )}
//       <button onClick={onClose}>Close</button>
//     </div>
//   </div>
// );

// export default Modal;

const Modal = ({ band, onClose }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <div className={styles.text}>
        <h2>{band && band.name}</h2>
        <p>{band && band.bio}</p>
        <p>Genre: {band && band.genre}</p>
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
            width={500}
            height={300}
          />
          {band.logoCredits && <p>Logo credits: {band.logoCredits}</p>}
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Modal;
