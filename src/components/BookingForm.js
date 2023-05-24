import { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import TicketSelection from "../components/TicketSelection";
import CampSelection from "../components/CampSelection";
import Personalinfo from "../components/Personalinfo";
import AttendeeInfo from "./AttendeeInfo";

export default function BookingForm() {
  const { currentStep, formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  const totalSteps = 4;

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
        return <CampSelection />;
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
