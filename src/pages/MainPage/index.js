// MainPage.js
import React, { useState, useEffect } from "react";
import DaySelector from "../components/DaySelector";
import Stage from "../components/Stage";
import Band from "../components/Band";
import Modal from "../components/Modal";

const MainPage = () => {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState("mon");
  const [loading, setLoading] = useState(true);
  const [selectedBand, setSelectedBand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBandsAndSchedule = async () => {
      const bandsResponse = await fetch(
        "https://hollow-glowing-gladiolus.glitch.me/bands"
      );
      const bandsData = await bandsResponse.json();

      const scheduleResponse = await fetch(
        "https://hollow-glowing-gladiolus.glitch.me/schedule"
      );
      const scheduleData = await scheduleResponse.json();

      setBands(bandsData);
      setSchedule(scheduleData);
      setLoading(false);
    };

    fetchBandsAndSchedule();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DaySelector onDayChange={handleDayChange} />
      {Object.entries(schedule).map(([stage, days]) => (
        <Stage key={stage} stage={stage} days={days} day={selectedDay} />
      ))}
      {bands.map((band) => (
        <Band
          key={band.id}
          band={band}
          onBandClick={handleBandClick}
          selectedDay={selectedDay}
          schedule={schedule}
        />
      ))}
      {isModalOpen && selectedBand && (
        <Modal band={selectedBand} onClose={closeModal} />
      )}
    </div>
  );
};

export default MainPage;
