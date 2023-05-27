// // MainPage.js
// import React, { useState } from "react";
// import PolyrhythmicSpiral from "../../components/PolyrhythmicSpiral";
// import DaySelector from "../../components/DaySelector";
// import Band from "../../components/Band";
// import Modal from "../../components/Modal";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import styles from "./MainPage.module.css";

// const MainPage = ({ bandsData, scheduleData }) => {
//   const [selectedDay, setSelectedDay] = useState();
//   const [selectedBand, setSelectedBand] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleDayChange = (day) => {
//     setSelectedDay(day);
//   };

//   const handleBandClick = (band) => {
//     setSelectedBand(band);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <PolyrhythmicSpiral />
//       <div className={styles.programBox}>
//         <h1 className={styles.header}>Line-up</h1>
//         <DaySelector onDayChange={handleDayChange} />
//       </div>
//       <div className={styles.bandBox}>
//         {bandsData.map((band) => (
//           <Band
//             key={band.id}
//             band={band}
//             onBandClick={handleBandClick}
//             selectedDay={selectedDay}
//             schedule={scheduleData}
//           />
//         ))}
//         {isModalOpen && selectedBand && (
//           <Modal band={selectedBand} onClose={closeModal} />
//         )}
//         <Footer />
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export async function getServerSideProps() {
//   const bandsResponse = await fetch("http://localhost:8080/bands");
//   const bandsData = await bandsResponse.json();

//   const scheduleResponse = await fetch("http://localhost:8080/schedule");
//   const scheduleData = await scheduleResponse.json();

//   return { props: { bandsData, scheduleData } };
// }

// export default MainPage;
