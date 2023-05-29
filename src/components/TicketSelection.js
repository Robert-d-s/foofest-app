import React, { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";

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
      payload: { section: "ticketData", field: "ticketType", value: ticketType },
    });
  };

  const handleTicketQuantityChange = (e) => {
    const ticketQuantity = Number(e.target.value);
    if (ticketQuantity >= 1) {
      dispatch({
        type: "UPDATE_FIELD",
        payload: { section: "ticketData", field: "ticketQuantity", value: ticketQuantity },
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
    <div>
      <h2>Ticket Choice</h2>
      <div>
        <label>
          <input
            type="radio"
            value="VIP"
            checked={formData.ticketData.ticketType === "VIP"}
            onChange={handleTicketTypeChange}
          />
          VIP Ticket
        </label>
        <label>
          <input
            type="radio"
            value="Regular"
            checked={formData.ticketData.ticketType === "Regular"}
            onChange={handleTicketTypeChange}
          />
          Regular Ticket
        </label>
      </div>
      <div>
        <label>
          Ticket Quantity:
          <input
            type="number"
            value={formData.ticketData.ticketQuantity}
            min={1}
            onChange={handleTicketQuantityChange}
          />
        </label>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
