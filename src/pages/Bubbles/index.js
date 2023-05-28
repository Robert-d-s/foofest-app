import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Bubbles.module.css";

// const Bubbles = () => {
//   const [bubbles, setBubbles] = useState([]);

//   const animateBubble = (x) => {
//     const newBubble = { id: uuidv4(), x };
//     setBubbles((bubbles) => [...bubbles, newBubble]);

//     setTimeout(() => {
//       setBubbles((bubbles) =>
//         bubbles.filter((bubble) => bubble.id !== newBubble.id)
//       );
//     }, 2000);
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => animateBubble(e.clientX);
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div id="bubble-wrapper" className={styles.bubbleWrapper}>
//       {bubbles.map((bubble) => (
//         <div
//           key={bubble.id}
//           className={styles.bubble}
//           style={{ left: `${bubble.x}px` }}
//         />
//       ))}
//     </div>
//   );
// };

// export default Bubbles;

// const Bubbles = () => {
//   const [bubbles, setBubbles] = useState([]);
//   const [colorIndex, setColorIndex] = useState(0);

//   const colors = [
//     "rgb(239, 83, 80)",
//     "rgb(244, 67, 54)",
//     "rgb(229, 57, 53)",
//     "rgb(211, 47, 47)",
//     "rgb(198, 40, 40)",
//     "rgb(211, 47, 47)",
//     "rgb(229, 57, 53)",
//     "rgb(244, 67, 54)",
//   ];

//   const animateBubble = (x) => {
//     const newBubble = { id: uuidv4(), x, color: colors[colorIndex] };
//     setBubbles((bubbles) => [...bubbles, newBubble]);
//     setColorIndex((colorIndex + 1) % colors.length);

//     setTimeout(() => {
//       setBubbles((bubbles) =>
//         bubbles.filter((bubble) => bubble.id !== newBubble.id)
//       );
//     }, 2000);
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => animateBubble(e.clientX);
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [colorIndex]);

//   return (
//     <div id="bubble-wrapper" className={styles.bubbleWrapper}>
//       {bubbles.map((bubble) => (
//         <div
//           key={bubble.id}
//           className={styles.bubble}
//           style={{ left: `${bubble.x}px`, backgroundColor: bubble.color }}
//         />
//       ))}
//     </div>
//   );
// };

// export default Bubbles;

const colors = [
  "rgb(239, 83, 80)",
  "rgb(244, 67, 54)",
  "rgb(229, 57, 53)",
  "rgb(211, 47, 47)",
  "rgb(198, 40, 40)",
  "rgb(211, 47, 47)",
  "rgb(229, 57, 53)",
  "rgb(244, 67, 54)",
];

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);

  const animateBubble = useCallback(
    (y, x) => {
      const direction = x < window.innerWidth / 2 ? "left" : "right";
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
    const handleMouseMove = (e) => animateBubble(e.clientY, e.clientX);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
