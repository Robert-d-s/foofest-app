import React, { useContext } from "react";
import { useRouter } from "next/router";
import { FormContext, DispatchContext } from "../contexts/FormContext";
import styles from "@/components/ThankYou.module.css";
export default function TicketSelection() {
  const { formData } = useContext(FormContext);

  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <h2>Your booking is complete!</h2>

      <p>
        Thank you for your purchase{" "}
        <b>
          {" "}
          {formData.attendees[0].firstName} {formData.attendees[0].lastName}
        </b>
      </p>
      <p>
        We sent an email confirmation to this address:{" "}
        <b> {formData.attendees[0].email}</b>
      </p>
      <img className={styles.ticket} src="../images/ticket1.png" alt="Ticket" />

      <div>
        <button className={styles.nextButton} onClick={() => router.push("/")}>
          Home
        </button>
      </div>
    </div>
  );
}
