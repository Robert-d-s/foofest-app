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
    </div>
  );
}
