import { useState, useEffect, useRef } from "react";
import styles from "./Band2.module.css";

const Band = ({ band, onBandClick, selectedDay, schedule, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const bandRef = useRef(null);
  const isPlayingToday =
    band &&
    schedule &&
    Object.values(schedule).some((stage) =>
      stage[selectedDay]?.some((act) => act && act.act === band.name)
    );

  useEffect(() => {
    const currentBand = bandRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (currentBand) {
      observer.observe(currentBand);
    }

    return () => {
      if (currentBand) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={bandRef}
      className={`${styles.band} ${isPlayingToday ? styles.active : ""} ${
        isVisible ? styles.visible : ""
      }`}
      style={{ "--index": index }}
      onClick={() => onBandClick(band)}
    >
      {band && band.name}
    </div>
  );
};

export default Band;
