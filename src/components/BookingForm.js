import { useContext, useEffect } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import TicketSelection from "../components/TicketSelection";
import CampSelection from "../components/CampSelection";
import Personalinfo from "../components/Personalinfo";

export default function BookingForm() {
  const { currentStep, formData, spots } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  const totalSteps = 4;

  useEffect(() => {
    fetch("http://localhost:8080/available-spots")
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

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

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
      default:
        return null;
    }
  };

  return (
    <div>
      {renderFormStep()}
      <div>
        {currentStep > 1 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep === totalSteps && (
          <div>
            <h2>Final Step</h2>
            {/* Render the final step component */}
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}
