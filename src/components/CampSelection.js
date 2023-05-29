import React, { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import CampCard from "./CampCard";
import TentSelection from "./TentSelection";
import styles from "@/components/CampSelection.module.css";

const CampSelection = () => {
  const { formData, spots } = useContext(FormContext);
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

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };
  return (
    <div className={styles.campSelection}>
      <h2>Choose Your Camp</h2>
      <label>
        <div className={styles.CampDivs}>
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
      <div className={styles.twoButtons}>
        <button className={styles.previousButton} onClick={handlePrevious}>
          ← &nbsp; Previous
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          Next &nbsp; →
        </button>
      </div>
    </div>
  );
};

export default CampSelection;
