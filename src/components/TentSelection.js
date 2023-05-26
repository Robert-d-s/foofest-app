import { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";

export default function TentSelection() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

  const addTent = (tentType) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: {
        section: "tentData",
        field: tentType,
        value: formData.tentData[tentType].amount + 1,
      },
    });
  };

  const removeTent = (tentType) => {
    if (formData.tentData[tentType].amount > 0) {
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          section: "tentData",
          field: tentType,
          value: formData.tentData[tentType].amount - 1,
        },
      });
    }
  };

  return (
    <div>
      <h2>Order Tents</h2>

      <div>
        <div>
          <button onClick={() => removeTent("x2tents")}>-</button>
          <span>{formData.tentData.x2tents.amount}</span>
          <button onClick={() => addTent("x2tents")}>+</button>
        </div>
        <p>2 persons tent {formData.tentData.x2tents.price}</p>
        <p>Total Price: {formData.tentData.x2tents.amount * formData.tentData.x2tents.price}</p>
      </div>
      <div>
        <div>
          <button onClick={() => removeTent("x3tents")}>-</button>
          <span>{formData.tentData.x3tents.amount}</span>
          <button onClick={() => addTent("x3tents")}>+</button>
        </div>
        <p>3 persons tent {formData.tentData.x3tents.price}</p>
        <p>Total Price: {formData.tentData.x3tents.amount * formData.tentData.x3tents.price}</p>
      </div>
    </div>
  );
}
