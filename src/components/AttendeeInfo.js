import { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import styles from "../components/AttendeeInfo.module.css";

export default function AttendeeInfo() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  const { attendees } = formData;

  const handleFieldChange = (index, field, value) => {
    dispatch({
      type: "UPDATE_ATTENDEE_FIELD",
      payload: { index, field, value },
    });
  };

  return (
    <form className={styles.allAttendees}>
      {attendees.map((attendee, index) => (
        <div key={index} className={styles.attendeeDiv}>
          <p>Guest nr. {index + 1}</p>
          <div className={styles.oneAttendee}>
            <label className={styles.inputFieldLabel}>
              First name *
              <input
                className={styles.inputField}
                type="text"
                required
                placeholder="John"
                value={attendee.firstName}
                onChange={(e) =>
                  handleFieldChange(index, "firstName", e.target.value)
                }
              />
            </label>
            <label className={styles.inputFieldLabel}>
              Last name *
              <input
                className={styles.inputField}
                type="text"
                required
                placeholder="Smith"
                value={attendee.lastName}
                onChange={(e) =>
                  handleFieldChange(index, "lastName", e.target.value)
                }
              />
            </label>
            <label className={styles.inputFieldLabel}>
              Email *
              <input
                className={styles.inputField}
                type="email"
                required
                placeholder="john.smith@email.com"
                value={attendee.email}
                onChange={(e) =>
                  handleFieldChange(index, "email", e.target.value)
                }
              />
            </label>
          </div>
        </div>
      ))}
    </form>
  );
}
