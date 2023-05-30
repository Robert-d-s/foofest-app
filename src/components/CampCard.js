/* import React from "react";

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
          disabled={
            spot.available < formData.ticketData.ticketQuantity ? true : false
          }
        />
        {spot.area}
      </label>
    </div>
  );
};

export default CampCard;
 */

/* import React from "react";
import styles from "@/components/CampCard.module.css";

const CampCard = ({ spot, formData, handleCampSpotChange }) => {
  const divClassName =
    formData.campData.campSpot === spot.area ? styles.checked : "";

  return (
    <div className={divClassName}>
      <label>
        <input
          className={styles.input}
          type="radio"
          name="campSpot"
          value={spot.area}
          checked={formData.campData.campSpot === spot.area}
          onChange={handleCampSpotChange}
          disabled={spot.available < formData.ticketData.ticketQuantity}
        />
        {spot.area}
      </label>
    </div>
  );
};

export default CampCard;
 */
/* 
import React from "react";
import styles from "@/components/CampCard.module.css";

const CampCard = ({ spot, formData, handleCampSpotChange }) => {
  const divClassName = `${styles.campCard} ${
    formData.campData.campSpot === spot.area ? styles.checked : ""
  }`;

  return (
    <div className={divClassName}>
      <label>
        <input
          className={styles.input}
          type="radio"
          name="campSpot"
          value={spot.area}
          checked={formData.campData.campSpot === spot.area}
          onChange={handleCampSpotChange}
          disabled={spot.available < formData.ticketData.ticketQuantity}
        />
        {spot.area}
      </label>
      <p>
        {spot.available < formData.ticketData.ticketQuantity
          ? "Sold Out"
          : "Available"}
      </p>
    </div>
  );
};

export default CampCard; */

import React from "react";
import styles from "@/components/CampCard.module.css";

const CampCard = ({ spot, formData, handleCampSpotChange }) => {
  const divClassName = `${styles.campCard} ${
    formData.campData.campSpot === spot.area ? styles.checked : ""
  }`;

  return (
    <div className={divClassName}>
      <label className={styles.campName}>
        {spot.area}
        <input
          className={styles.input}
          type="radio"
          name="campSpot"
          value={spot.area}
          checked={formData.campData.campSpot === spot.area}
          onChange={handleCampSpotChange}
          disabled={spot.available < formData.ticketData.ticketQuantity}
        />
      </label>
      {/*     <p>
        {spot.available < formData.ticketData.ticketQuantity
          ? "Sold Out" 
          : "Available"}
      </p> */}
      <p
        className={
          spot.available < formData.ticketData.ticketQuantity
            ? styles.SoldOut
            : ""
        }
      >
        {spot.available < formData.ticketData.ticketQuantity ? "Sold Out" : ""}
      </p>
    </div>
  );
};

export default CampCard;
