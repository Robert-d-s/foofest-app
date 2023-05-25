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
          disabled={spot.available < formData.ticketData.ticketQuantity ? true : false}
        />
        {spot.area}
      </label>
    </div>
  );
};

export default CampCard;
