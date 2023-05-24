import { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";

const CampSelection = () => {
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
      payload: { section: "campData", field: "tentSetup", value: tentSetup },
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
          <label>
            <input
              type="radio"
              name="campSpot"
              value="Svartheim"
              checked={formData.campData.campSpot === "Svartheim"}
              onChange={handleCampSpotChange}
            />
            Svartheim
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="campSpot"
              value="Nifheim"
              checked={formData.campData.campSpot === "Nifheim"}
              onChange={handleCampSpotChange}
            />
            Nifheim
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="campSpot"
              value="Helheim"
              checked={formData.campData.campSpot === "Helheim"}
              onChange={handleCampSpotChange}
            />
            Helheim
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="campSpot"
              value="Muspelheim"
              checked={formData.campData.campSpot === "Muspelheim"}
              onChange={handleCampSpotChange}
            />
            Muspelheim
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="campSpot"
              value="Alfheim"
              checked={formData.campData.campSpot === "Alfheim"}
              onChange={handleCampSpotChange}
            />
            Alfheim
          </label>
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
      <label>
        <input
          type="checkbox"
          checked={formData.campData.tentSetup}
          onChange={handleTentSetupChange}
        />
        Order Tent Setup
      </label>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default CampSelection;
