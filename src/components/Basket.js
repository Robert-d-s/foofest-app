import React, { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import styles from "@/components/Basket.module.css";
export default function Basket() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

  return (
    <aside className={styles.aside}>
      <div className={styles.asideDiv}>
        <div className={styles.basketDiv}>
          <p>
            <b>Ticket Type</b>
          </p>
          <p className={styles.textInBasket}>
            {formData.ticketData.ticketType}
          </p>
        </div>
        <div className={styles.basketDiv}>
          <p>
            <b>Ticket Amount </b>
          </p>
          <p className={styles.textInBasket}>
            {formData.ticketData.ticketQuantity}
          </p>
        </div>
        <div className={styles.basketDiv}>
          <b>
            <p>Price for tickets</p>
          </b>
          <p className={styles.textInBasket}>
            {formData.ticketData.totalTicketPrice}
          </p>
        </div>
        <div className={styles.basketDiv}>
          <b>
            <p>Camp Spot</p>
          </b>
          <p className={styles.textInBasket}>{formData.campData.campSpot}</p>
        </div>
        <div className={styles.basketDiv}>
          <b>
            <p>Camp Type</p>
          </b>
          <p className={styles.textInBasket}>{formData.campData.campType}</p>
        </div>
        <div className={styles.basketDiv}>
          <b>
            <p>TOTAL PRICE</p>
          </b>
          <p className={styles.textInBasket}>
            {" "}
            {formData.campData.campPrice +
              formData.ticketData.totalTicketPrice +
              formData.tentData.totalTentPrice +
              formData.fixedFee}
          </p>
        </div>
      </div>
    </aside>
  );
}
