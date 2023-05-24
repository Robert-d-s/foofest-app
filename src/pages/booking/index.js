import { FormProvider } from "../../contexts/FormContext";
import BookingForm from "@/components/BookingForm";

export default function Booking() {
  return (
    <>
      <FormProvider>
        <BookingForm />
      </FormProvider>
    </>
  );
}
