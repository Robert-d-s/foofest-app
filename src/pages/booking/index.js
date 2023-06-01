import { FormProvider } from "../../contexts/FormContext";
import BookingForm from "@/components/BookingForm";
import styles from "./Booking.module.css";
import Navbar from "@/components/Navbar";

export default function Booking() {
  return (
    <div className={styles.body}>
      <FormProvider>
        <Navbar />
        <BookingForm />
      </FormProvider>
    </div>
  );
}
