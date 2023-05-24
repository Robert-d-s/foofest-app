import { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";

export default function TicketSelection() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div>
      <h2>Ticket Choice</h2>
      <label>
        VIP:
        <input
          type="radio"
          name="ticketType"
          value="VIP"
          checked={formData.ticketType === "VIP"}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: { field: "ticketType", value: "VIP" },
            })
          }
        />
      </label>
      <label>
        Regular:
        <input
          type="radio"
          name="ticketType"
          value="Regular"
          checked={formData.ticketType === "Regular"}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: { field: "ticketType", value: "Regular" },
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
              payload: {
                field: "ticketQuantity",
                value: Number(e.target.value),
              },
            })
          }
        />
      </label>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
