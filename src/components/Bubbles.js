// import { useEffect, useState, useCallback } from "react";
// import { v4 as uuidv4 } from "uuid";
// import styles from "./Bubbles.module.css";

// const colors = [
//   "rgba(239, 83, 80, 0.03)",
//   "rgba(244, 67, 54, 0.03)",
//   "rgba(229, 57, 53, 0.03)",
//   "rgba(211, 47, 47, 0.03)",
//   "rgba(198, 40, 40, 0.03)",
//   "rgba(211, 47, 47, 0.03)",
//   "rgba(229, 57, 53, 0.03)",
//   "rgba(244, 67, 54, 0.03)",
// ];

// const Bubbles = () => {
//   const [bubbles, setBubbles] = useState([]);
//   const [colorIndex, setColorIndex] = useState(0);

//   const animateBubble = useCallback(
//     (y, x) => {
//       const direction = x < window.innerWidth / 2 ? "left" : "right";
//       const newBubble = {
//         id: uuidv4(),
//         y,
//         color: colors[colorIndex],
//         direction,
//       };
//       setBubbles((bubbles) => [...bubbles, newBubble]);
//       setColorIndex((colorIndex + 1) % colors.length);

//       setTimeout(() => {
//         setBubbles((bubbles) =>
//           bubbles.filter((bubble) => bubble.id !== newBubble.id)
//         );
//       }, 2000);
//     },
//     [colorIndex]
//   );

//   useEffect(() => {
//     const handleMouseMove = (e) => animateBubble(e.clientY, e.clientX);
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [animateBubble]);

//   return (
//     <div id="bubble-wrapper" className={styles.bubbleWrapper}>
//       {bubbles.map((bubble) => (
//         <div
//           key={bubble.id}
//           className={`${styles.bubble} ${styles[bubble.direction]}`}
//           style={{ top: `${bubble.y}px`, backgroundColor: bubble.color }}
//         />
//       ))}
//     </div>
//   );
// };

// export default Bubbles;

import { useEffect, useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Bubbles.module.css";

// const colors = [
//   "rgba(239, 83, 80, 0.03)",
//   "rgba(244, 67, 54, 0.03)",
//   "rgba(229, 57, 53, 0.03)",
//   "rgba(211, 47, 47, 0.03)",
//   "rgba(198, 40, 40, 0.03)",
//   "rgba(211, 47, 47, 0.03)",
//   "rgba(229, 57, 53, 0.03)",
//   "rgba(244, 67, 54, 0.03)",
// ];
const colors = [
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(255, 165, 0, 0.03)", // Orange
  "rgba(255, 165, 0, 0.03)", // Orange
  "rgba(255, 165, 0, 0.03)", // Orange
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(255, 165, 0, 0.03)", // Orange
  "rgba(255, 165, 0, 0.03)", // Orange
  "rgba(255, 165, 0, 0.03)", // Orange
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(255, 0, 0, 0.03)", // Red
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(0, 0, 255, 0.03)", // Blue
  "rgba(255, 165, 0, 0.03)", // Orange
  "rgba(255, 165, 0, 0.03)", // Orange
  "rgba(255, 165, 0, 0.03)", // Orange
];

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const bubbleWrapperRef = useRef(null);

  // const animateBubble = useCallback(
  //   (e) => {
  //     const y =
  //       e.clientY - bubbleWrapperRef.current.getBoundingClientRect().top;
  //     const x = e.clientX;
  //     const direction = x < window.innerWidth / 2 ? "left" : "right";
  //     const newBubble = {
  //       id: uuidv4(),
  //       y,
  //       color: colors[colorIndex],
  //       direction,
  //     };
  //     setBubbles((bubbles) => [...bubbles, newBubble]);
  //     setColorIndex((colorIndex + 1) % colors.length);

  //     setTimeout(() => {
  //       setBubbles((bubbles) =>
  //         bubbles.filter((bubble) => bubble.id !== newBubble.id)
  //       );
  //     }, 2000);
  //   },
  //   [colorIndex]
  // );

  // useEffect(() => {
  //   const handleMouseMove = (e) => animateBubble(e);
  //   window.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, [animateBubble]);

  const animateBubble = useCallback(
    (y, x) => {
      const direction = x < window.innerWidth / 2 ? "left" : "right";
      const newBubble = {
        id: uuidv4(),
        y,
        color: colors[colorIndex],
        direction,
      };
      setBubbles((bubbles) => {
        if (bubbles.length > 50) {
          // Limit the number of bubbles
          return [...bubbles.slice(1), newBubble]; // Remove the oldest bubble when adding a new one
        } else {
          return [...bubbles, newBubble];
        }
      });
      setColorIndex((colorIndex + 1) % colors.length);
    },
    [colorIndex]
  );

  useEffect(() => {
    let animationFrameId = null;
    const handleMouseMove = (e) => {
      if (animationFrameId === null) {
        // Only create a new bubble if we're not already waiting to create one
        animationFrameId = requestAnimationFrame(() => {
          animateBubble(e.clientY, e.clientX);
          animationFrameId = null;
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animateBubble]);

  return (
    <div
      ref={bubbleWrapperRef}
      id="bubble-wrapper"
      className={styles.bubbleWrapper}
    >
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
