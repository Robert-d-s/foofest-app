import { useContext, useEffect } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import TicketSelection from "../components/TicketSelection";
import CampSelection from "../components/CampSelection";
import Personalinfo from "../components/Personalinfo";
import CardDetails from "../components/CardDetails";
import ThankYou from "../components/ThankYou";
import styles from "@/components/BookingForm.module.css";
export default function BookingForm() {
  const { currentStep, formData, spots } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  const totalSteps = 5;

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

  const handleSubmit = () => {
    // Perform the POST request to '/fulfill-reservation' with formData
    console.log("Form data:", formData);
  };

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
      {renderFormStep()}
      <aside className={styles.aside}>
        <div className={styles.asideDiv}>
          <div className={styles.basketDiv}>
            <p>
              <b>Ticket Type</b>
            </p>
            <p className={styles.textInBasket}>
              {formData.ticketData.ticketType}
            </p>
          </div>
          <div className={styles.basketDiv}>
            <p>
              <b>Ticket Amount </b>
            </p>
            <p className={styles.textInBasket}>
              {formData.ticketData.ticketQuantity}
            </p>
          </div>
          <div className={styles.basketDiv}>
            <b>
              <p>Camp Spot</p>
            </b>
            <p className={styles.textInBasket}>{formData.campData.campSpot}</p>
          </div>
          <div className={styles.basketDiv}>
            <b>
              <p>Camp Type</p>
            </b>
            <p className={styles.textInBasket}>{formData.campData.campType}</p>
          </div>
        </div>
      </aside>
      <div>
        {currentStep === 4 && (
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}
