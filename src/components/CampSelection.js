import React, { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import CampCard from "./CampCard";
import TentSelection from "./TentSelection";

const CampSelection = ({ spots }) => {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

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

  const handleTentSetupChange = (e) => {
    const tentSetup = e.target.checked;
    dispatch({
      type: "UPDATE_FIELD",
      payload: { section: "tentData", field: "tentSetup", value: tentSetup },
    });
  };

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
    dispatch({ type: "CREATE_ATTENDEE_STRUCTURE" });
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

      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default CampSelection;
