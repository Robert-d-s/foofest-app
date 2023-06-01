import React, { useContext, useState } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import styles from "@/components/Countdown.module.css";
export default function Countdown() {
  const { expirationDate } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  const expirationDateTime = new Date(expirationDate).getTime();
  const [countdown, setCountdown] = useState("");

  const startCountdown = () => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeRemained = expirationDateTime - currentTime;
      const minutes = Math.floor(
        (timeRemained % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemained % (1000 * 60)) / 1000);

      if (currentTime >= expirationDate) {
        dispatch({ type: "COUNTDOWN_EXPIRED" });
        clearInterval(intervalId);
        return;
      }

      setCountdown(`${minutes}:${seconds}`);
    }, 1000);
  };

  startCountdown();

  return (
    <div>
      <p className={styles.countdown}>Reservation expires in: {countdown}</p>
    </div>
  );
}
