import { useContext, useState } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import CampCard from "./CampCard";
import TentSelection from "./TentSelection";
import styles from "@/components/CampSelection.module.css";

const CampSelection = () => {
  const { formData, spots, expirationDate } = useContext(FormContext);
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
    dispatch({
      type: "UPDATE_CAMPTYPE_PRICE",
      payload: { campType: campType },
    });
  };

  function reserveSpot() {
    fetch("https://hollow-glowing-gladiolus.glitch.me/reserve-spot", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: formData.campData.campSpot,
        amount: formData.ticketData.ticketQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (!formData.id) {
          const fetchedId = data.id;

          dispatch({
            type: "UPDATE_FIELD",
            payload: { section: "id", value: fetchedId },
          });
        }

        // console.log(formData.id);
      })
      .catch((error) => {
        console.log("Error occurred while fetching or updating id:", error);
      });
  }

  const handleNext = () => {
    let errors = [];

    if (!formData.campData.campSpot) {
      errors.push("Please choose a camp spot.");
    }

    if (formData.tentData.tentRemainder > 1) {
      errors.push(
        "Your chosen amount of tents is too low. Please adjust your selection."
      );
    }

    if (errors.length === 0) {
      dispatch({ type: "NEXT_STEP" });
      dispatch({ type: "CREATE_ATTENDEE_STRUCTURE" });
      if (!expirationDate) {
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            section: "expirationDate",
            value: Date.now() + 300000,
          },
        });
        reserveSpot();
      }
    } else {
      setErrors(errors);
    }
  };

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };
  return (
    <div className={styles.campSelection}>
      <h2>Choose Your Camp *</h2>

      <div className={styles.CampDivs}>
        {spots.map((spot) => (
          <CampCard
            key={spot.area}
            spot={spot}
            required
            formData={formData}
            handleCampSpotChange={handleCampSpotChange}
          />
        ))}
      </div>

      <label className={styles.green}>
        <input
          type="checkbox"
          checked={formData.campData.campType === "green"}
          onChange={handleCampTypeChange}
        />
        GO GREEN +249 ,-
      </label>
      <TentSelection />
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p className={styles.error} key={index}>
              {error}
            </p>
          ))}
        </div>
      )}

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
