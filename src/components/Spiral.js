import { useEffect, useRef, useState } from "react";
import styles from "./PolyrhythmicSpiral.module.css";

export default function PolyrhythmicSpiral() {
  const canvasRef = useRef(null);
  const [gradientSliderValue, setGradientSliderValue] = useState(500);
  const [circleSliderValue, setCircleSliderValue] = useState(500);

  useEffect(() => {
    const paper = canvasRef.current;
    if (paper) {
      const pen = paper.getContext("2d");

      const colors = Array(22).fill("#A6C48A");

      const settings = {
        startTime: new Date().getTime(),
        duration: gradientSliderValue,
        maxCycles: Math.max(colors.length, 100),
      };

      let arcs = [];

      //   const calculateVelocity = () => {
      //     const distancePerCycle = 2 * Math.PI;
      //     return (
      //       (settings.maxCycles * distancePerCycle) / (1000 - circleSliderValue)
      //     );
      //   };

      const calculateVelocity = (index) => {
        const numberOfCycles = settings.maxCycles - index;
        const distancePerCycle = 2 * Math.PI;
        return (numberOfCycles * distancePerCycle) / (1000 - circleSliderValue);
      };

      const calculateNextImpactTime = (currentImpactTime, velocity) => {
        return currentImpactTime + ((2 * Math.PI) / velocity) * 1000;
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
      let frame = 0;
      const draw = () => {
        // paper.width = paper.clientWidth;
        // paper.height = paper.clientHeight;

        // paper.width = window.innerWidth;
        // paper.height = window.innerHeight;

        paper.width = paper.parentElement.clientWidth;
        paper.height = paper.parentElement.clientHeight;

        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - settings.startTime) / 1000;

        const length = Math.min(paper.width, paper.height) * 2;
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

        base.initialRadius = base.length * 0.1;
        base.circleRadius = base.length * 0.009;
        base.clearance = base.length * 0.01;
        base.spacing =
          (base.length - base.initialRadius - base.clearance) /
          2 /
          colors.length;

        arcs.forEach((arc, index) => {
          const radius = base.initialRadius + base.spacing * index;
          const distance = elapsedTime >= 0 ? elapsedTime * arc.velocity : 0;
          const angle = (Math.PI + distance) % base.maxAngle;
          const colorPosition = ((frame - index * 10) % 360) / 360;

          let red, green, blue;

          if (colorPosition < 0.25) {
            red = Math.floor(255 * (1 - colorPosition / 0.25));
            green = 0;
            blue = Math.floor(255 * (colorPosition / 0.25));
          } else if (colorPosition < 0.5) {
            red = Math.floor(255 * ((colorPosition - 0.25) / 0.25));
            green = Math.floor(140 * ((colorPosition - 0.25) / 0.25));
            blue = Math.floor(255 * (1 - (colorPosition - 0.25) / 0.25));
          } else if (colorPosition < 0.75) {
            red = Math.floor(255 * (1 - (colorPosition - 0.5) / 0.25));
            green = Math.floor(140 + 115 * ((colorPosition - 0.5) / 0.25));
            blue = 0;
          } else {
            red = Math.floor(255 * ((colorPosition - 0.75) / 0.25));
            green = Math.floor(255 * (1 - (colorPosition - 0.75) / 0.25));
            blue = 0;
          }

          pen.globalAlpha = 0.75;
          pen.lineWidth = base.length * 0.003;
          pen.strokeStyle = `rgb(${red}, ${green}, ${blue})`;

          const offset = (base.circleRadius * (0 / 3)) / radius;

          drawArc(
            center.x,
            center.y,
            radius,
            Math.PI + offset,
            2 * Math.PI - offset
          );
          drawArc(center.x, center.y, radius, offset, Math.PI - offset);

          pen.globalAlpha = 1;
          pen.fillStyle = `rgb(${red}, ${green}, ${blue})`;

          if (currentTime >= arc.nextImpactTime) {
            arc.nextImpactTime = calculateNextImpactTime(
              arc.nextImpactTime,
              arc.velocity
            );
          }

          drawPointOnArc(center, radius, base.circleRadius, angle);
        });

        frame += gradientSliderValue / 500;

        requestAnimationFrame(draw);
      };

      init();
      draw();
    }
  }, [gradientSliderValue, circleSliderValue]);

  return (
    <div>
      <input
        type="range"
        min="1"
        max="4000"
        value={gradientSliderValue}
        onChange={(e) => setGradientSliderValue(Number(e.target.value))}
      />

      <input
        type="range"
        min="1"
        max="960"
        value={circleSliderValue}
        onChange={(e) => setCircleSliderValue(Number(e.target.value))}
      />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
