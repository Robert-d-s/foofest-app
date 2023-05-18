/* import { useContext } from "react";
import { FormContext } from "../components/BookingForm";
import AttendeeInfo from "./AttendeeInfo";

export default function Personalinfo() {
  const { formData, dispatch } = useContext(FormContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handleAttendee = () => {
    dispatch({ type: "ADD_ATTENDEE" });
  };

  return (
    <div>
      <h2>Personal information</h2>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
 */

import { useContext, useEffect } from "react";
import { FormContext } from "../components/BookingForm";
import AttendeeInfo from "./AttendeeInfo";

export default function PersonalInfo() {
  const { formData, dispatch } = useContext(FormContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handleAttendee = () => {
    dispatch({ type: "ADD_ATTENDEE" });
  };

  useEffect(() => {
    // Create initial attendee forms on component mount
    const initialAttendees = Array.from({ length: formData.ticketQuantity }, (_, index) => ({
      name: "",
      email: "",
      // Add any other fields you need for each attendee
    }));
    dispatch({ type: "UPDATE_ATTENDEE_FIELD", payload: { attendees: initialAttendees } });
  }, [formData.ticketQuantity, dispatch]);

  const renderAttendeeForms = () => {
    return formData.attendees.map((attendee, index) => (
      <AttendeeInfo key={index} index={index} attendee={attendee} />
    ));
  };

  return (
    <div>
      <h2>Personal Information</h2>
      {/* Render the attendee forms */}
      {renderAttendeeForms()}

      <button onClick={handleAttendee}>Add Attendee</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
