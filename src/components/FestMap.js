// import { useState } from "react";
// import Image from "next/image";
// import styles from "./FestMap.module.css";

// export default function FestMap({ src, alt }) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleClick = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div
//       //   className={isExpanded ? styles.expanded : styles.festmap}
//       className={`${styles.imageContainer} ${
//         isExpanded ? styles.expanded : ""
//       }`}
//       onClick={handleClick}
//     >
//       {/* onClick={handleClick}
//       style={{
//         position: "relative",
//         width: isExpanded ? "100vw" : "50vw",
//         height: isExpanded ? "100vh" : "50vh",
//       }}
//     > */}
//       {/* <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} /> */}
//       <div className={styles.imageWrapper}>
//         <Image src={src} alt={alt} layout="fill" />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Image from "next/image";
import styles from "./FestMap.module.css";

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
      <div className={styles.imageWrapper}>
        <Image src={src} alt={alt} fill style={{ objectFit: "scale-down" }} />
      </div>
    </div>
  );
};

export default FestMap;
