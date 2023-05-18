import { useContext } from "react";
import { FormContext } from "../components/BookingForm";

export default function TicketSelection() {
  const { formData, dispatch } = useContext(FormContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div>
      <h2>Ticket Choice</h2>
      <label>
        Ticket Type:
        <input
          type="text"
          value={formData.ticketType}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: { field: "ticketType", value: e.target.value },
            })
          }
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={formData.ticketQuantity}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: { field: "ticketQuantity", value: Number(e.target.value) },
            })
          }
        />
      </label>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
