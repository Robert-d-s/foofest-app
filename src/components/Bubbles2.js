import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Bubbles.module.css";

const colors = [
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(255, 165, 0, .3)", // Orange
  "rgba(255, 165, 0, .3)", // Orange
  "rgba(255, 165, 0, .3)", // Orange
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(255, 165, 0, 0.3)", // Orange
  "rgba(255, 165, 0, 0.3)", // Orange
  "rgba(255, 165, 0, 0.3)", // Orange
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(255, 0, 0, 0.3)", // Red
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(0, 0, 255, 0.3)", // Blue
  "rgba(255, 165, 0, 0.3)", // Orange
  "rgba(255, 165, 0, 0.3)", // Orange
  "rgba(255, 165, 0, 0.3)", // Orange
];

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);

  const animateBubble = useCallback(
    (y, x, direction) => {
      const newBubble = {
        id: uuidv4(),
        y,
        color: colors[colorIndex],
        direction,
      };
      setBubbles((bubbles) => [...bubbles, newBubble]);
      setColorIndex((colorIndex + 1) % colors.length);

      setTimeout(() => {
        setBubbles((bubbles) =>
          bubbles.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, 2000);
    },
    [colorIndex]
  );

  useEffect(() => {
    let timeoutId = null;
    // const handleMouseMove = (e) => {
    //   if (!timeoutId) {
    //     timeoutId = setTimeout(() => {
    //       const rect = e.target.getBoundingClientRect();
    //       const x = e.clientX - rect.left;
    //       const y = e.clientY - rect.top;
    //       const direction = x < rect.width / 2 ? "left" : "right";
    //       animateBubble(y, x, direction);
    //       timeoutId = null;
    //     }, 3); // Adjust this delay to find a balance between performance and responsiveness
    //   }
    // };

    const handleMouseMove = (e) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          const x = e.clientX;
          const y = e.clientY - e.target.getBoundingClientRect().top;
          const direction = x < window.innerWidth / 2 ? "left" : "right";
          animateBubble(y, x, direction);
          timeoutId = null;
        }, 20); // Adjust this delay to find a balance between performance and responsiveness
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [animateBubble]);

  return (
    <div id="bubble-wrapper" className={styles.bubbleWrapper}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`${styles.bubble} ${styles[bubble.direction]}`}
          style={{ top: `${bubble.y}px`, backgroundColor: bubble.color }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
