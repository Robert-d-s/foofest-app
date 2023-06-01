import { useState } from "react";
import Image from "next/image";
import styles from "./FestMap.module.css";

const FestMap = ({ src, alt }) => {
  // const [isExpanded, setIsExpanded] = useState(false);

  // const handleClick = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <div className={styles.container}>
      <div
        className={styles.festmap}
        // <div
        //   className={`${styles.festmap} ${isExpanded ? styles.expanded : ""}`}
        //   onClick={handleClick}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h2>Tent Area</h2>
        <p>Choose an authentic camping experience by bringing your own tent to the ColorFoo Fest village or book one of our pre-pitched tents.</p>
        <h2>Glamping</h2>
        <p>Our glamping options are the best choice if you want to enjoy the whole festival experience without sacrificing comfort.</p>
        <h2>Car Camping</h2>
        <p>You can choose to camp in your own car and pitch your tent nearby, in a dedicated area of 3x8 meters. The perfect option for those who want the best of both worlds.</p>
      </div>
    </div>
  );
};

export default FestMap;
