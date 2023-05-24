import styles from "./schedule.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

const Schedule = () => {
  const [schedule, setSchedule] = useState({});
  const [day, setDay] = useState("mon");

  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await fetch("http://localhost:8080/schedule");
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
      <div className={styles.programContainer}>
        <h1 className={styles.header}>Programme</h1>

        <div className={styles.btnBox}>
          <button onClick={() => filterBands("mon")}>Monday</button>
          <button onClick={() => filterBands("tue")}>Tuesday</button>
          <button onClick={() => filterBands("wed")}>Wednesday</button>
          <button onClick={() => filterBands("thu")}>Thursday</button>
          <button onClick={() => filterBands("fri")}>Friday</button>
          <button onClick={() => filterBands("sat")}>Saturday</button>
          <button onClick={() => filterBands("sun")}>Sunday</button>
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
    </div>
  );
};

export default Schedule;
