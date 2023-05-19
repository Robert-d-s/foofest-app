import { useContext, useEffect } from "react";
import { FormContext } from "../components/BookingForm";
import AttendeeInfo from "./AttendeeInfo";

export default function PersonalInfo() {
  const { formData, dispatch } = useContext(FormContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  /* --------THIS NEEDS TO BE FIXED-----*/

  const { ticketQuantity } = formData;
  const dispatchAddAttendee = () => {
    dispatch({ type: "ADD_ATTENDEE" });
  };
  for (let i = 0; i < ticketQuantity; i++) {
    dispatchAddAttendee();
  }
  /* -------UP UNTIL HERE-----*/

  const renderAttendeeForms = () => {
    return <AttendeeInfo />;
  };

  return (
    <div>
      <h2>Personal Information</h2>

      {renderAttendeeForms()}

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
