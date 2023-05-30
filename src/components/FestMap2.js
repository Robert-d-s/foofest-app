import { useState } from "react";
import Image from "next/image";
import styles from "./FestMap2.module.css";

const FestMap = ({ src, alt }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${styles.festmap} ${isExpanded ? styles.expanded : ""}`}
      onClick={handleClick}
    >
      <div className={styles.imageContainer}>
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default FestMap;
