import React, { useContext, useState } from "react";
import styles from "@/components/CardDetails.module.css";
import { FormContext, DispatchContext } from "../contexts/FormContext";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = () => {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  async function fulfillReservation() {
    const payload = {
      id: formData.id,
    };
    const supabasePayload = {
      ticketType: formData.ticketData.ticketType,
      ticketQuantity: formData.ticketData.ticketQuantity,
      campSpot: formData.campData.campSpot,
      campType: formData.campData.campType,
      x2tents: formData.tentData.x2tents.amount,
      x3tents: formData.tentData.x3tents.amount,
      attendees: formData.attendees,
      totalPrice: formData.totalPrice,
    };
    await Promise.all([
      fetch("https://hollow-glowing-gladiolus.glitch.me/fullfill-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("Error cought on first fetch:", error);
        }),
      fetch("/api/final-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supabasePayload),
      })
        .then((response) => response.json())
        .then((supabaseData) => {
          console.log(supabaseData);
        })
        .catch((error) => {
          console.log("Error cought on second fetch:", error);
        }),
    ]);
  }

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
    fulfillReservation();
  };

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "number") {
      const truncatedValue = value.slice(0, 16);

      setState((prev) => ({ ...prev, [name]: truncatedValue }));
    } else if (name === "expiry") {
      const truncatedValue = value.slice(0, 4);

      setState((prev) => ({ ...prev, [name]: truncatedValue }));
    } else if (name === "cvc") {
      const truncatedValue = value.slice(0, 3);

      setState((prev) => ({ ...prev, [name]: truncatedValue }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className={styles.wrapperForm}>
      <Cards
        className={styles.remove}
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form className={styles.cardDetailsForm}>
        <label className={styles.inputFieldLabel}>
          Card Owner *
          <input
            className={styles.inputField}
            type="text"
            name="name"
            placeholder="John Smith"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </label>

        <label className={styles.inputFieldLabel}>
          <div className={styles.labelDivIcon}>
            <p> Card Number *</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-credit-card"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
              <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
            </svg>
          </div>

          <input
            className={styles.inputField}
            type="number"
            name="number"
            placeholder="XXXX XXXX XXXX XXXX"
            value={state.number}
            maxLength="16"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </label>
        <div className={styles.inputAndCvc}>
          <label className={styles.inputFieldLabel}>
            Expiry Date *
            <input
              className={styles.inputExpiry}
              type="number"
              name="expiry"
              placeholder="XX/XX"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </label>
          <label className={styles.inputFieldLabel}>
            <div className={styles.labelDivIcon}>
              <p> CVC *</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-credit-card-2-back"
                viewBox="0 0 16 16"
              >
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
              </svg>
            </div>
            <input
              className={styles.inputCvc}
              type="number"
              name="cvc"
              placeholder="XXX"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </label>
        </div>
      </form>
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

export default PaymentForm;
