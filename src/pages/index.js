import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
// import PolyrhythmicSpiral from "../components/PolyrhythmicSpiral";
import PolyrhythmicSpiral from "../components/Spiral";
import DaySelector from "../components/DaySelector";
import Band from "../components/Band2";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Bubbles from "../components/Bubbles3";
// import styles from "./Home.module.css";

const MainPage = ({ bandsData, scheduleData }) => {
  const [selectedDay, setSelectedDay] = useState();
  const [selectedBand, setSelectedBand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleBandClick = (band) => {
    setSelectedBand(band);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <PolyrhythmicSpiral />

      <div className={styles.programBox}>
        <h1 className={styles.header}>Line-up</h1>
        <DaySelector onDayChange={handleDayChange} />
      </div>
      <div className={styles.bcontainer}>
        <Bubbles />
        <div className={styles.container}>
          <div className={styles.bandBox}>
            {bandsData.map((band, index) => (
              <Band
                key={band.id}
                band={band}
                onBandClick={handleBandClick}
                selectedDay={selectedDay}
                schedule={scheduleData}
                index={index}
              />
            ))}
            {isModalOpen && selectedBand && (
              <Modal band={selectedBand} onClose={closeModal} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const bandsResponse = await fetch(
    "https://hollow-glowing-gladiolus.glitch.me/bands"
  );
  const bandsData = await bandsResponse.json();

  const scheduleResponse = await fetch(
    "https://hollow-glowing-gladiolus.glitch.me/schedule"
  );
  const scheduleData = await scheduleResponse.json();

  return { props: { bandsData, scheduleData } };
}

export default MainPage;
