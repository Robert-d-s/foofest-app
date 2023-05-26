import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.section}>
      <div className={styles.earth}></div>
      <div className={styles.circle}>
        {"COLORFOO-Fest".split("").map((char, i) => (
          <span key={i} style={{ "--i": i + 1 }}>
            {char}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
