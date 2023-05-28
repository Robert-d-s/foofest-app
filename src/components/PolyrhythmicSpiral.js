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

      // const calculateNextImpactTime = (currentImpactTime, velocity) => {
      //   return currentImpactTime + (Math.PI / velocity) * 1000;
      // };

      const calculateNextImpactTime = (currentImpactTime, velocity) => {
        return currentImpactTime + ((2 * Math.PI) / velocity) * 1000; // The next impact time is the current impact time plus the time it takes to complete a full rotation at the current velocity
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
        paper.width = paper.clientWidth;
        paper.height = paper.clientHeight;
        // paper.width = window.innerWidth * 1;
        // paper.height = window.innerHeight * 1;

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

        base.initialRadius = base.length * 0.09;
        base.circleRadius = base.length * 0.009;
        base.clearance = base.length * 0.01;
        base.spacing =
          (base.length - base.initialRadius - base.clearance) /
          2 /
          colors.length;

        // const gradientPosition = (frame % 360) / 360; // Calculate the position of the gradient based on the current frame

        arcs.forEach((arc, index) => {
          const radius = base.initialRadius + base.spacing * index;

          // const gradientPosition = ((frame + index * 10) % 360) / 360;
          const gradientPosition = ((frame - index * 5) % 360) / 360;

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

          // frame++;

          // Calculate the position of the moving circle
          const distance = elapsedTime >= 0 ? elapsedTime * arc.velocity : 0;
          const angle = (Math.PI + distance) % base.maxAngle;
          const position = calculatePositionOnArc(center, radius, angle);

          // Calculate the color based on the position of the circle along the arc

          // const colorPosition = index / arcs.length;

          // const colorPosition = (index + frame / 100) % arcs.length;

          // const colorPosition = (index - frame / 900) % arcs.length;

          // const colorPosition =
          //   (index - frame / 200 + arcs.length) % arcs.length;

          // const colorPosition = (Math.sin(frame / 200) + 1) / 2;

          const colorPosition = ((frame - index * 10) % 360) / 360;

          // const red = Math.floor(255 * colorPosition);
          // const blue = Math.floor(255 * (1 - colorPosition));

          // Calculate the color based on the position of the gradient
          // const red = Math.floor(255 * gradientPosition);
          // const blue = Math.floor(255 * (1 - gradientPosition));

          // -----------------original effect----

          // const red = Math.floor(255 * colorPosition);
          // const blue = Math.floor(255 * (1 - colorPosition));
          // const green = Math.floor(255 * (1 - Math.abs(colorPosition - 0.5)));

          // -----------------original effect----

          // -----------------last effect----

          // const red = Math.floor(255 * (1 - Math.abs(colorPosition - 0.5) * 2));
          // const green = Math.floor(255 * (1.5 - Math.abs(colorPosition - 0.5)));
          // const blue = Math.floor(255 * (0.5 - Math.abs(colorPosition - 0.5)));

          // -----------------last effect----

          let red, green, blue;

          if (colorPosition < 0.25) {
            // Red to Blue transition
            red = Math.floor(255 * (1 - colorPosition / 0.25));
            green = 0;
            blue = Math.floor(255 * (colorPosition / 0.25));
          } else if (colorPosition < 0.5) {
            // Blue to Orange transition
            red = Math.floor(255 * ((colorPosition - 0.25) / 0.25));
            green = Math.floor(140 * ((colorPosition - 0.25) / 0.25)); // Orange has some green
            blue = Math.floor(255 * (1 - (colorPosition - 0.25) / 0.25));
          } else if (colorPosition < 0.75) {
            // Orange to Green transition
            red = Math.floor(255 * (1 - (colorPosition - 0.5) / 0.25));
            green = Math.floor(140 + 115 * ((colorPosition - 0.5) / 0.25)); // Transition to full green
            blue = 0;
          } else {
            // Green to Red transition
            red = Math.floor(255 * ((colorPosition - 0.75) / 0.25));
            green = Math.floor(255 * (1 - (colorPosition - 0.75) / 0.25));
            blue = 0;
          }

          // Draw arcs
          pen.globalAlpha = 0.75;
          pen.lineWidth = base.length * 0.003;
          // pen.strokeStyle = `rgb(${red}, 0, ${blue})`;
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

          // Draw moving circles
          pen.globalAlpha = 1;
          // pen.fillStyle = arc.color;
          // pen.fillStyle = gradient;
          // pen.fillStyle = `rgb(${red}, 0, ${blue})`;
          pen.fillStyle = `rgb(${red}, ${green}, ${blue})`;

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

        // frame++;
        frame += 0.9;

        pen.font = "75px Arial";
        pen.fillStyle = "#A6C48A";
        pen.textAlign = "center";
        pen.fillText("ColorFOO", center.x, center.y);
        pen.fillText("Festival!", center.x, center.y + 75);

        requestAnimationFrame(draw);
      };

      init();
      draw();
    }
  }, []);
  return <canvas ref={canvasRef} className={styles.canvas} />;
}
