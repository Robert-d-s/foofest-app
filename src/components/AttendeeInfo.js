import { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import styles from "../components/AttendeeInfo.module.css";

export default function AttendeeInfo() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  const { attendees } = formData; // Destructure the attendees array from formData

  const handleFieldChange = (index, field, value) => {
    dispatch({
      type: "UPDATE_ATTENDEE_FIELD",
      payload: { index, field, value },
    });
  };

  return (
    <div className={styles.allAttendees}>
      {attendees.map((attendee, index) => (
        <div key={index} className={styles.oneAttendee}>
          <label className={styles.inputFieldLabel}>
            First name
            <input
              className={styles.inputField}
              type="text"
              value={attendee.firstName}
              onChange={(e) =>
                handleFieldChange(index, "firstName", e.target.value)
              }
            />
          </label>

          <label className={styles.inputFieldLabel}>
            Last name
            <input
              className={styles.inputField}
              type="text"
              value={attendee.lastName}
              onChange={(e) =>
                handleFieldChange(index, "lastName", e.target.value)
              }
            />
          </label>

          <label className={styles.inputFieldLabel}>
            Email
            <input
              className={styles.inputField}
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
