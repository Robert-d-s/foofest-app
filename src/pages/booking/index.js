import { FormProvider } from "../../contexts/FormContext";
import BookingForm from "@/components/BookingForm";
import styles from "./Booking.module.css";

export default function Booking() {
  return (
    <div className={styles.body}>
      <FormProvider>
        <BookingForm />
      </FormProvider>
    </div>
  );
}
