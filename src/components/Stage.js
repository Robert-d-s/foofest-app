// import Act from "./Act";
// import styles from "./Stage.module.css";

// const Stage = ({ stage, days, day }) => (
//   <div key={stage} className={styles.stage}>
//     <h2 className={styles.subHeader}>{stage}</h2>
//     {days[day] &&
//       days[day]
//         .filter((act) => act.act !== "break")
//         .map((act, index) => <Act key={index} act={act} />)}
//   </div>
// );

// export default Stage;

// import Act from "./Act";
// import styles from "./Stage.module.css";

// const Stage = ({ stage, days, day }) => (
//   <div key={stage} className={styles.stage}>
//     <h2 className={styles.subHeader}>{stage}</h2>
//     {days &&
//       day &&
//       days[day] &&
//       days[day]
//         .filter((act) => act && act.act !== "break")
//         .map((act, index) => <Act key={index} act={act} />)}
//   </div>
// );

// export default Stage;

import Act from "./Act";
import styles from "./Stage.module.css";

const Stage = ({ stage, days, day }) => {
  return (
    <div key={stage} className={styles.stage}>
      <h2 className={styles.subHeader}>{stage}</h2>
      {days &&
        day &&
        days[day] &&
        days[day]
          .filter((act) => act && act.act !== "break")
          .map((act, index) => <Act key={index} act={act} />)}
    </div>
  );
};

export default Stage;
