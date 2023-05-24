import { useEffect, useRef } from "react";
import styles from "./PolyrhythmicSpiral.module.css";

export default function PolyrhythmicSpiral() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const paper = canvasRef.current;
    if (paper) {
      const pen = paper.getContext("2d");

      const colors = Array(22).fill("#A6C48A");

      const settings = {
        startTime: new Date().getTime(),
        duration: 900,
        maxCycles: Math.max(colors.length, 100),
      };

      let arcs = [];

      const calculateVelocity = (index) => {
        const numberOfCycles = settings.maxCycles - index;
        const distancePerCycle = 2 * Math.PI;
        return (numberOfCycles * distancePerCycle) / settings.duration;
      };

      const calculateNextImpactTime = (currentImpactTime, velocity) => {
        return currentImpactTime + (Math.PI / velocity) * 1000;
      };

      const calculatePositionOnArc = (center, radius, angle) => ({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      });

      const init = () => {
        pen.lineCap = "round";

        arcs = colors.map((color, index) => {
          const velocity = calculateVelocity(index);
          const lastImpactTime = 0;
          const nextImpactTime = calculateNextImpactTime(
            settings.startTime,
            velocity
          );

          return {
            color,
            velocity,
            lastImpactTime,
            nextImpactTime,
          };
        });
      };

      const drawArc = (x, y, radius, start, end, action = "stroke") => {
        pen.beginPath();
        pen.arc(x, y, radius, start, end);
        if (action === "stroke") pen.stroke();
        else pen.fill();
      };

      const drawPointOnArc = (center, arcRadius, pointRadius, angle) => {
        const position = calculatePositionOnArc(center, arcRadius, angle);
        drawArc(position.x, position.y, pointRadius, 0, 2 * Math.PI, "fill");
      };

      const draw = () => {
        paper.width = paper.clientWidth;
        paper.height = paper.clientHeight;

        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - settings.startTime) / 1000;

        const length = Math.min(paper.width, paper.height) * 0.9;
        const offset = (paper.width - length) / 2;
        const start = { x: offset, y: paper.height / 2 };
        const end = { x: paper.width - offset, y: paper.height / 2 };
        const center = { x: paper.width / 2, y: paper.height / 2 };

        const base = {
          length: end.x - start.x,
          minAngle: 0,
          startAngle: 0,
          maxAngle: 2 * Math.PI,
        };

        base.initialRadius = base.length * 0.05;
        base.circleRadius = base.length * 0.006;
        base.clearance = base.length * 0.03;
        base.spacing =
          (base.length - base.initialRadius - base.clearance) /
          2 /
          colors.length;

        arcs.forEach((arc, index) => {
          const radius = base.initialRadius + base.spacing * index;

          // Create a radial gradient (concentric circles of different colors)
          // let gradient = pen.createRadialGradient(
          //   center.x,
          //   center.y,
          //   5,
          //   center.x,
          //   center.y,
          //   30
          // );
          // gradient.addColorStop(0, "red");
          // gradient.addColorStop(1, "blue");

          // Calculate the position of the moving circle
          const distance = elapsedTime >= 0 ? elapsedTime * arc.velocity : 0;
          const angle = (Math.PI + distance) % base.maxAngle;
          const position = calculatePositionOnArc(center, radius, angle);

          // Calculate the color based on the position of the circle along the arc
          const colorPosition = index / arcs.length;
          const red = Math.floor(255 * colorPosition);
          const blue = Math.floor(255 * (1 - colorPosition));

          // Draw arcs
          pen.globalAlpha = 0.75;
          pen.lineWidth = base.length * 0.002;
          pen.strokeStyle = `rgb(${red}, 0, ${blue})`;

          const offset = (base.circleRadius * (5 / 3)) / radius;

          drawArc(
            center.x,
            center.y,
            radius,
            Math.PI + offset,
            2 * Math.PI - offset
          );
          drawArc(center.x, center.y, radius, offset, Math.PI - offset);

          // Draw moving circles
          pen.globalAlpha = 1;
          // pen.fillStyle = arc.color;
          // pen.fillStyle = gradient;
          pen.fillStyle = `rgb(${red}, 0, ${blue})`;

          if (currentTime >= arc.nextImpactTime) {
            arc.nextImpactTime = calculateNextImpactTime(
              arc.nextImpactTime,
              arc.velocity
            );
          }

          // const distance = elapsedTime >= 0 ? elapsedTime * arc.velocity : 0;
          // const angle = (Math.PI + distance) % base.maxAngle;

          drawPointOnArc(center, radius, base.circleRadius, angle);
        });

        pen.font = "15px Arial"; // Set the font size and family
        pen.fillStyle = "#A6C48A"; // Set the text color
        pen.textAlign = "center"; // Align the text to the center
        pen.fillText("ColorFOO", center.x, center.y); // Draw the text at the center of the canvas

        requestAnimationFrame(draw);
      };

      init();
      draw();
    }
  }, []);
  return <canvas ref={canvasRef} className={styles.canvas} />;
}
