// import styles from "./Band.module.css";

// // Band.js
// const Band = ({ band, onBandClick }) => (
//   <div
//     className={`${styles.band} ${
//       isFiltered && isPlayingToday ? styles.active : ""
//     }`}
//     onClick={() => onBandClick(band)}
//   >
//     {band.name}
//   </div>
// );

// export default Band;

// Band.js

// const Band = ({ band, onBandClick, selectedDay, schedule }) => {
//   const isPlayingToday = Object.values(schedule).some((stage) =>
//     stage[selectedDay]?.some((act) => act.act === band.name)
//   );

//   return (
//     <div
//       className={`${styles.band} ${isPlayingToday ? styles.active : ""}`}
//       onClick={() => onBandClick(band)}
//     >
//       {band.name}
//     </div>
//   );
// };

// export default Band;

import styles from "./Band.module.css";

const Band = ({ band, onBandClick, selectedDay, schedule }) => {
  const isPlayingToday =
    band &&
    schedule &&
    Object.values(schedule).some((stage) =>
      stage[selectedDay]?.some((act) => act && act.act === band.name)
    );

  return (
    <div className={styles.bandBox}>
      <div
        key={band.id}
        className={`${styles.band} ${isPlayingToday ? styles.active : ""}`}
        onClick={() => onBandClick(band)}
      >
        {band && band.name}
      </div>
    </div>
  );
};

export default Band;
