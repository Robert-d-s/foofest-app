import styles from "./footer.module.css";

// Footer with infinite marquee (sponsors)
// Trying out the sample w/o images first

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.marquee}>
        <div className={`${styles.marqueeContent} ${styles.scroll}`}>
          <p>one 1</p>
          <p>two 2</p>
          <p>three 3</p>
          <p>four 4</p>
          <p>five 5</p>
        </div>
        <div className={`${styles.marqueeContent} ${styles.scroll}`}>
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
