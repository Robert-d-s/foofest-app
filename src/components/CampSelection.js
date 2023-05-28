import { useContext, useState } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import CampCard from "./CampCard";
import TentSelection from "./TentSelection";

const CampSelection = () => {
  const { formData, spots } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  const [errors, setErrors] = useState([]);

  const handleCampSpotChange = (e) => {
    const campSpot = e.target.value;
    dispatch({
      type: "UPDATE_FIELD",
      payload: { section: "campData", field: "campSpot", value: campSpot },
    });
  };

  const handleCampTypeChange = (e) => {
    const campType = e.target.checked ? "green" : "regular";
    dispatch({
      type: "UPDATE_FIELD",
      payload: { section: "campData", field: "campType", value: campType },
    });
  };

  const handleNext = () => {
    let errors = [];

    if (!formData.campData.campSpot) {
      errors.push("Please choose a camp spot.");
    }

    if (formData.tentData.tentRemainder > 1) {
      errors.push("Your chosen amount of tents is too low. Please adjust your selection.");
    }

    if (errors.length === 0) {
      dispatch({ type: "NEXT_STEP" });
      dispatch({ type: "CREATE_ATTENDEE_STRUCTURE" });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div>
      <h2>Camp Selection</h2>
      <label>
        Camp Spot:
        <div>
          {spots.map((spot) => (
            <CampCard
              key={spot.area}
              spot={spot}
              formData={formData}
              handleCampSpotChange={handleCampSpotChange}
            />
          ))}
        </div>
      </label>
      <label>
        <input
          type="checkbox"
          checked={formData.campData.campType === "green"}
          onChange={handleCampTypeChange}
        />
        Go green
      </label>
      <TentSelection />
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default CampSelection;
