import styles from "./footer.module.css";
import Image from "next/image";

// Footer with infinite marquee (sponsors)
// when ready, add the images or svg

export default function Footer() {
  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          <p>one1</p>
          <p>two 2</p>
          <p>three 3</p>
          <p>four 4</p>
          <p>five 5</p>
          <p>six 6</p>
          <p>seven 7</p>
          <p>eight 8</p>
          <p>nine 9</p>
          <p>ten 10</p>
        </div>
        <div aria-hidden="true" className={styles.marqueeContent}>
          <p>one1</p>
          <p>two 2</p>
          <p>three 3</p>
          <p>four 4</p>
          <p>five 5</p>
          <p>six 6</p>
          <p>seven 7</p>
          <p>eight 8</p>
          <p>nine 9</p>
          <p>ten 10</p>
        </div>
      </div>
    </div>
  );
}
