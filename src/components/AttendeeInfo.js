/* import { useContext } from "react";
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
 */

import { useContext } from "react";
import { FormContext } from "../components/BookingForm";

export default function AttendeeInfo() {
  const { formData, dispatch } = useContext(FormContext);
  const { attendees } = formData; // Destructure the attendees array from formData

  const handleFieldChange = (index, field, value) => {
    dispatch({
      type: "UPDATE_ATTENDEE_FIELD",
      payload: { index, field, value },
    });
  };

  return (
    <div>
      {attendees.map((attendee, index) => (
        <div key={index}>
          <label>
            First name
            <input
              type="text"
              value={attendee.firstName}
              onChange={(e) =>
                handleFieldChange(index, "firstName", e.target.value)
              }
            />
          </label>

          <label>
            Last name
            <input
              type="text"
              value={attendee.lastName}
              onChange={(e) =>
                handleFieldChange(index, "lastName", e.target.value)
              }
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={attendee.email}
              onChange={(e) =>
                handleFieldChange(index, "email", e.target.value)
              }
            />
          </label>
        </div>
      ))}
    </div>
  );
}
