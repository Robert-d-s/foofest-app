import { FormProvider } from "../../contexts/FormContext";
import BookingForm from "@/components/BookingForm";
import CampSelection from "@/components/CampSelection";
import { useEffect, useState } from "react";

export default function Booking() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/available-spots")
      .then((response) => response.json())
      .then((data) => {
        setSpots(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <FormProvider>
        <BookingForm spots={spots} />
      </FormProvider>
    </>
  );
}
