import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Test.module.css";

export default function Schedule() {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBand, setSelectedBand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleBandClick = (band) => {
    setSelectedBand(band);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <div className={styles.programBox}>
        <h1 className={styles.header}>Line-up</h1>
        <div className={styles.btnBox}>
          {Object.keys(dayMapping).map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(dayMapping[day])}
              className={styles.button}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.bandBox}>
          {bands.map((band) => {
            const isPlayingToday = Object.values(schedule).some((stage) =>
              stage[selectedDay]?.some((act) => act.act === band.name)
            );
            return (
              <div
                key={band.id}
                className={`${styles.band} ${
                  isFiltered && isPlayingToday ? styles.active : ""
                }`}
                onClick={() => handleBandClick(band)}
              >
                {band.name}
              </div>
            );
          })}
        </div>

        {isModalOpen && selectedBand && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>{selectedBand.name}</h2>
              <p>{selectedBand.bio}</p>
              <p>Genre: {selectedBand.genre}</p>
              {selectedBand.logo && (
                <>
                  <Image
                    // src={selectedBand.logo}
                    src={
                      selectedBand.logo.startsWith("https")
                        ? selectedBand.logo
                        : `http://localhost:8080/logos/${selectedBand.logo}`
                    }
                    alt={selectedBand.name}
                    width={500}
                    height={300}
                  />
                  {/* <p>Logo credits: {selectedBand.logoCredits}</p> */}
                  {selectedBand.logoCredits && (
                    <p>Logo credits: {selectedBand.logoCredits}</p>
                  )}
                </>
              )}
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
