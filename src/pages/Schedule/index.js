import styles from "./schedule.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import DaySelector from "@/components/DaySelector";
import Footer from "@/components/Footer";

const Schedule = () => {
  const [schedule, setSchedule] = useState({});
  const [day, setDay] = useState("mon");

  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await fetch(
        "https://hollow-glowing-gladiolus.glitch.me/schedule"
      );
      const data = await res.json();
      setSchedule(data);
    };

    fetchSchedule();
  }, []);

  const filterBands = (day) => {
    setDay(day);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.programContainer}>
        <div className={styles.programBox}>
          <h1 className={styles.header}>Programme</h1>
          <DaySelector onDayChange={filterBands} />
        </div>
        <div className={styles.stageBox}>
          {Object.entries(schedule).map(([stage, days]) => (
            <div key={stage}>
              <h2 className={styles.subHeader}>{stage}</h2>
              {days[day] &&
                days[day]
                  .filter((act) => act.act !== "break")
                  .map((act, index) => (
                    <div key={index} className={styles.actBox}>
                      <p>{act.act}</p>
                      <p>
                        {act.start} - {act.end}
                        {/* for cancelation - optional  */}
                        {act.cancelled && (
                          <Image
                            src="/images/cancelled.png"
                            alt="Cancelled"
                            width={100}
                            height={70}
                            className={styles.cancelled}
                          />
                        )}
                        {/* for cancelation - optional  */}
                      </p>
                    </div>
                  ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;
