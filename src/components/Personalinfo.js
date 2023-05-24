import { useContext, useEffect } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import AttendeeInfo from "./AttendeeInfo";

export default function PersonalInfo() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  /* --------THIS NEEDS TO BE FIXED-----*/

  const { ticketQuantity } = formData;
  const dispatchAddAttendee = () => {
    dispatch({ type: "ADD_ATTENDEE" });
  };
  /* for (let i = 0; i < ticketQuantity; i++) {
    dispatchAddAttendee();
  } */
  /* -------UP UNTIL HERE-----*/

  return (
    <div>
      <h2>Personal Information</h2>

      <AttendeeInfo />

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
