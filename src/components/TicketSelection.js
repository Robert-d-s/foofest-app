import React, { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import styles from "@/components/TicketSelection.module.css";
export default function TicketSelection() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handleTicketTypeChange = (e) => {
    const ticketType = e.target.value;
    dispatch({
      type: "UPDATE_FIELD",
      payload: {
        section: "ticketData",
        field: "ticketType",
        value: ticketType,
      },
    });
    dispatch({
      type: "CALCULATE_TICKET_PRICE",
    });
  };

  const handleTicketQuantityChange = (e) => {
    const ticketQuantity = Number(e.target.value);
    if (ticketQuantity >= 1) {
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          section: "ticketData",
          field: "ticketQuantity",
          value: ticketQuantity,
        },
      });
      dispatch({
        type: "CALCULATE_TICKET_PRICE",
      });

      // Calculate the tentRemainder based on ticketQuantity
      const tentRemainder = ticketQuantity;

      dispatch({
        type: "CALCULATE_TENT_CAPACITY",
        payload: {
          tentRemainder,
        },
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Choose Your Ticket</h2>
      <div className={styles.ticketsTypes}>
        <label className={styles.radioButton}>
          <input
            type="radio"
            value="VIP"
            checked={formData.ticketData.ticketType === "VIP"}
            onChange={handleTicketTypeChange}
          />
          VIP Ticket
        </label>
        <label className={styles.radioButton}>
          <input
            type="radio"
            value="Regular"
            checked={formData.ticketData.ticketType === "Regular"}
            onChange={handleTicketTypeChange}
          />
          Regular Ticket
        </label>
      </div>
      <div className={styles.ticketsQuantity}>
        <label className={styles.inputFieldLabel}>
          Ticket Quantity
          <input
            className={styles.inputField}
            type="number"
            value={formData.ticketData.ticketQuantity}
            min={1}
            onChange={handleTicketQuantityChange}
          />
        </label>

        <button className={styles.nextButton} onClick={handleNext}>
          Next &nbsp; →
        </button>
      </div>
      <div>
        <p>Please note there is a Fixed booking fee of 99 dkk</p>
      </div>
      <div>
        <h2>Ticket Information</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
}
