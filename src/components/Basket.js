import React, { useContext } from "react";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import styles from "@/components/Basket.module.css";
export default function Basket() {
  const { formData } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);

  return (
    <aside className={styles.aside}>
      <div className={styles.asideDiv}>
        <div className={styles.sectionDiv}>
          <p>
            <b>TICKETS</b>
          </p>
          <div className={styles.basketDiv}>
            <p>Type:</p>
            <p className={styles.textInBasket}>
              {formData.ticketData.ticketType}
            </p>
          </div>
          <div className={styles.basketDiv}>
            <p>Amount:</p>
            <p className={styles.textInBasket}>
              {formData.ticketData.ticketQuantity}
            </p>
          </div>
          <div className={styles.basketDiv}>
            <p>Price:</p>
            <p className={styles.textInBasket}>
              {formData.ticketData.totalTicketPrice},-
            </p>
          </div>
        </div>
        <div className={styles.sectionDiv}>
          <p>
            <b>CAMP INFO</b>
          </p>
          <div className={styles.basketDiv}>
            <p>Spot:</p>

            <p className={styles.textInBasket}>{formData.campData.campSpot}</p>
          </div>
          <div className={styles.basketDiv}>
            <p>Type:</p>

            <p className={styles.textInBasket}>{formData.campData.campType}</p>
          </div>
          <div className={styles.basketDiv}>
            <p>Price:</p>

            <p className={styles.textInBasket}>
              {formData.campData.campPrice},-
            </p>
          </div>
        </div>
        <div className={styles.sectionDiv}>
          <p>
            <b>TENTS INFO</b>
          </p>
          <div className={styles.basketDiv}>
            <p>2 person tents:</p>

            <p className={styles.textInBasket}>
              {formData.tentData.x2tents.amount}
            </p>
          </div>
          <div className={styles.basketDiv}>
            <p>3 person tents:</p>

            <p className={styles.textInBasket}>
              {formData.tentData.x3tents.amount}
            </p>
          </div>
          <div className={styles.basketDiv}>
            <p>Price:</p>

            <p className={styles.textInBasket}>
              {formData.tentData.totalTentPrice},-
            </p>
          </div>
        </div>
        <div className={styles.basketDiv}>
          <p>Booking fee:</p>

          <p className={styles.textInBasket}>{formData.fixedFee},-</p>
        </div>
        <div className={styles.basketDiv}>
          <p>
            <b>TOTAL PRICE:</b>
          </p>

          <p className={styles.textInBasket}>
            {formData.campData.campPrice +
              formData.ticketData.totalTicketPrice +
              formData.tentData.totalTentPrice +
              formData.fixedFee}
            ,-
          </p>
        </div>
      </div>
    </aside>
  );
}
