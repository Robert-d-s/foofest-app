import { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import styles from "@/components/TentSelection.module.css";

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
    dispatch({
      type: "CALCULATE_TENT_CAPACITY",
    });
    dispatch({
      type: "CALCULATE_TENT_PRICE",
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
      dispatch({
        type: "CALCULATE_TENT_CAPACITY",
      });

      dispatch({
        type: "CALCULATE_TENT_PRICE",
      });
    }
  };

  return (
    <div className={styles.tents}>
      <h2>Order Tents *</h2>

      <div className={styles.oneTent}>
        <div className={styles.buttonsDiv}>
          <button onClick={() => removeTent("x2tents")}>-</button>
          <span>{formData.tentData.x2tents.amount}</span>
          <button
            onClick={() => addTent("x2tents")}
            disabled={formData.tentData.tentRemainder <= 0 ? true : false}
          >
            +
          </button>
        </div>
        <p>2 persons tent {formData.tentData.x2tents.price},-</p>
      </div>
      <div className={styles.oneTent}>
        <div className={styles.buttonsDiv}>
          <button onClick={() => removeTent("x3tents")}>-</button>
          <span>{formData.tentData.x3tents.amount}</span>
          <button
            onClick={() => addTent("x3tents")}
            disabled={
              formData.tentData.tentRemainder === 0 ||
              formData.tentData.tentRemainder <= 1
                ? true
                : false
            }
          >
            +
          </button>
        </div>
        <p>3 persons tent {formData.tentData.x3tents.price},-</p>
      </div>
      <div className={styles.oneTent}>
        <p>
          <b>Total Price for tents:</b>
        </p>
        <p> {formData.tentData.totalTentPrice},-</p>
      </div>
    </div>
  );
}
