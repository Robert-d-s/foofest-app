import React from "react";

const CampCard = ({ spot, formData, handleCampSpotChange }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          name="campSpot"
          value={spot.area}
          checked={formData.campData.campSpot === spot.area}
          onChange={handleCampSpotChange}
        />
        {spot.area}
      </label>
    </div>
  );
};

export default CampCard;
