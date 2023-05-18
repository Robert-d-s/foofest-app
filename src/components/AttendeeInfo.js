import { useContext } from "react";
import { FormContext } from "../components/BookingForm";

export default function AttendeeInfo() {
  const { formData, dispatch } = useContext(FormContext);

  return (
    <div>
      <label>
        First name
        <input
          type="text"
          value={formData.attendees.firstName}
          onChange={(e) => {
            console.log(formData.attendees.firstName);
            dispatch({
              type: "UPDATE_ATTENDEE_FIELD",
              payload: { field: "firstName", value: e.target.value },
            });
          }}
        />
      </label>

      <label>
        Last name
        <input
          type="text"
          value={formData.attendees.lastName}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ATTENDEE_FIELD",
              payload: { field: "lastName", value: e.target.value },
            })
          }
        />
      </label>

      <label>
        email
        <input
          type="email"
          value={formData.attendees.email}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ATTENDEE_FIELD",
              payload: { field: "email", value: e.target.value },
            })
          }
        />
      </label>
    </div>
  );
}
