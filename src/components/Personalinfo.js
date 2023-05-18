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

/* import { useContext, useEffect } from "react";
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

  const renderAttendeeForms = () => {
    return formData.attendees.map((attendee, index) => (
      <AttendeeInfo key={index} index={index} attendee={attendee} />
    ));
  };

  return (
    <div>
      <h2>Personal Information</h2>
   
      {renderAttendeeForms()}

      <button onClick={handleAttendee}>Add Attendee</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
} */

/* import { useContext, useEffect } from "react";
import { FormContext } from "../components/BookingForm";
import AttendeeInfo from "./AttendeeInfo";

export default function PersonalInfo() {
  const { formData, dispatch } = useContext(FormContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  useEffect(() => {
    const { ticketQuantity, attendees } = formData;
    const currentAttendeesCount = attendees.length;
    const attendeesToAdd = ticketQuantity - currentAttendeesCount;

    if (attendeesToAdd > 0) {
      for (let i = 0; i < attendeesToAdd; i++) {
        dispatch({ type: "ADD_ATTENDEE" });
      }
    }
  }, [formData.ticketQuantity]);

  return (
    <div>
      <h2>Personal Information</h2>

      {formData.attendees.map((attendee, index) => (
        <AttendeeInfo key={index} attendee={attendee} />
      ))}

      <button onClick={handleNext}>Next</button>
    </div>
  );
} */

import { useContext, useEffect } from "react";
import { FormContext } from "../components/BookingForm";
import AttendeeInfo from "./AttendeeInfo";

export default function PersonalInfo() {
  const { formData, dispatch } = useContext(FormContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  useEffect(() => {
    const { ticketQuantity, attendees } = formData;
    const currentAttendeesCount = attendees.length;
    const attendeesToAdd = ticketQuantity - currentAttendeesCount;

    if (attendeesToAdd > 0) {
      for (let i = 0; i < attendeesToAdd; i++) {
        dispatch({ type: "ADD_ATTENDEE" });
      }
    }
  }, [formData.ticketQuantity]);

  const renderAttendeeForms = () => {
    return Array.from({ length: formData.ticketQuantity }, (_, index) => (
      <AttendeeInfo key={index} attendee={formData.attendees[index]} />
    ));
  };

  return (
    <div>
      <h2>Personal Information</h2>

      {renderAttendeeForms()}

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
