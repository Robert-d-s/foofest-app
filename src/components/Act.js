import Image from "next/image";
import styles from "./Act.module.css";
// Act.js
const Act = ({ act }) => (
  <div className={styles.actBox}>
    <p>{act.act}</p>
    <p>
      {act.start} - {act.end}
      {act.cancelled && (
        <Image
          src="/images/cancelled.png"
          alt="Cancelled"
          width={100}
          height={70}
          className={styles.cancelled}
        />
      )}
    </p>
  </div>
);

export default Act;
