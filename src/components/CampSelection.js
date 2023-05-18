import { useContext } from "react";
import { FormContext } from "../components/BookingForm";

export default function CampSelection() {
  const { formData, dispatch } = useContext(FormContext);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div>
      <h2>Camp Spot Choice</h2>
      <label>
        Camp Spot:
        <input
          type="text"
          value={formData.campSpot}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: { field: "campSpot", value: e.target.value },
            })
          }
        />
      </label>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
