// MainPage.js
import React, { useState } from "react";
import DaySelector from "../../components/DaySelector";
import Stage from "../../components/Stage";
import Band from "../../components/Band";
import Modal from "../../components/Modal";

const MainPage = ({ bandsData, scheduleData }) => {
  const [selectedDay, setSelectedDay] = useState("mon");
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
      <DaySelector onDayChange={handleDayChange} />
      {Object.entries(scheduleData).map(([stage, days]) => (
        <Stage key={stage} stage={stage} days={days} day={selectedDay} />
      ))}
      {bandsData.map((band) => (
        <Band
          key={band.id}
          band={band}
          onBandClick={handleBandClick}
          selectedDay={selectedDay}
          schedule={scheduleData}
        />
      ))}
      {isModalOpen && selectedBand && (
        <Modal band={selectedBand} onClose={closeModal} />
      )}
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
