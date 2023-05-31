import styles from "@/styles/Home.module.css";
import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
// import PolyrhythmicSpiral from "../components/PolyrhythmicSpiral";
import PolyrhythmicSpiral from "../components/Spiral";
import DaySelector from "../components/DaySelector";
import Band from "../components/Band2";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Sponsors from "../components/Sponsors";
import Bubbles from "../components/Bubbles3";
import FestMap from "@/components/FestMap";
import Footer from "@/components/Footer";
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
      <Head>
        <title>ColorFOO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/images/festival.png" />
      </Head>
      <Navbar />
      <div className={styles.spiralContainer}>
        <PolyrhythmicSpiral />
        <div className={styles.text}>
          <p>ColorFoo</p>
          <p>Festival</p>
        </div>
      </div>
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
      <div className={styles.festmap}>
        {/* <Image
          src="/images/festmap.png"
          alt="Festival Map"
          // layout="responsive"
          // width={500}
          // height={300}
          fill
          style={{ objectFit: "scale-down" }}
        /> */}
        <FestMap src="/images/festmap.png" alt="Festival Map" />
      </div>
      <Sponsors />
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
