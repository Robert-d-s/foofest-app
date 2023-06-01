import { useContext, useEffect } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import TicketSelection from "../components/TicketSelection";
import CampSelection from "../components/CampSelection";
import Personalinfo from "../components/Personalinfo";
import CardDetails from "../components/CardDetails";
import ThankYou from "../components/ThankYou";
import Basket from "../components/Basket";
import Countdown from "./Countdown";
import styles from "@/components/BookingForm.module.css";
import ExpirationModal from "./ExpirationModal";

export default function BookingForm() {
  const { currentStep, formData, spots, expirationDate } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    fetch("https://hollow-glowing-gladiolus.glitch.me/available-spots")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_AREAS",
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [dispatch]);

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <TicketSelection />;
      case 2:
        return <CampSelection spots={spots} />;
      case 3:
        return <Personalinfo />;
      case 4:
        return <CardDetails />;
      case 5:
        return <ThankYou />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      {currentStep < 5 && expirationDate && <Countdown />}
      {renderFormStep()}
      {currentStep < 5 && formData.modal && <ExpirationModal />}
      <Basket />
    </div>
  );
}
