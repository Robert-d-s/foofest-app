import styles from "./Test.module.css";
import { useState, useEffect } from "react";

export default function Schedule() {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBandsAndSchedule = async () => {
      const bandsResponse = await fetch("http://localhost:8080/bands");
      const bandsData = await bandsResponse.json();

      const scheduleResponse = await fetch("http://localhost:8080/schedule");
      const scheduleData = await scheduleResponse.json();

      setBands(bandsData);
      setSchedule(scheduleData);
      setLoading(false);
    };

    fetchBandsAndSchedule();
  }, []);

  const handleDayChange = (day) => {
    setSelectedDay(day);
    setIsFiltered(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const dayMapping = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
    Saturday: "sat",
    Sunday: "sun",
  };

  return (
    <div>
      {/* <div>
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
          <button
            key={day}
            onClick={() => handleDayChange(day)}
            className={styles.button}
          >
            {day}
          </button>
        ))}
      </div> */}
      <div className={styles.programBox}>
        <h1 className={styles.header}>Line-up</h1>
        <div className={styles.btnBox}>
          {Object.keys(dayMapping).map((day) => (
            <button key={day} onClick={() => handleDayChange(dayMapping[day])} className={styles.button}>
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* {bands.map((band) => {
          const isPlayingToday = Object.values(schedule).some((stage) =>
            stage[selectedDay]?.some((act) => act.act === band.name)
          );
          return (
            <div
              key={band.id}
              style={{ opacity: isPlayingToday ? 1 : 0.5 }}
              className={`${styles.band} ${
                isPlayingToday && isFiltered ? styles.scaleUp : ""
              }`}
            >
              {band.name}
            </div>
          );
        })} */}
        <div className={styles.bandBox}>
          {bands.map((band) => {
            const isPlayingToday = Object.values(schedule).some((stage) => stage[selectedDay]?.some((act) => act.act === band.name));
            return (
              <div key={band.id} className={`${styles.band} ${isFiltered && isPlayingToday ? styles.active : ""}`}>
                {band.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
