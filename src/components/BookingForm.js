import { createContext, useReducer } from "react";
import TicketSelection from "../components/TicketSelection";
import CampSelection from "../components/CampSelection";
import Personalinfo from "../components/Personalinfo";
import AttendeeInfo from "./AttendeeInfo";

export const FormContext = createContext();

const initialState = {
  currentStep: 1,
  formData: {
    ticketType: "",
    ticketQuantity: 1,
    campType: "",
    campSpot: "",
    attendees: [
      {
        firstName: "",
        lastName: "",
        email: "",
      },
    ],
    id: "",
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
      };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case "UPDATE_ATTENDEE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          attendees: state.formData.attendees.map((attendee, index) => {
            if (index === action.payload.index) {
              return {
                ...attendee,
                [action.payload.field]: action.payload.value,
              };
            }
            return attendee;
          }),
        },
      };

    case "ADD_ATTENDEE":
      return {
        ...state,
        formData: {
          ...state.formData,
          attendees: [
            ...state.formData.attendees,
            { firstName: "", lastName: "", email: "" },
          ],
        },
      };

    default:
      return state;
  }
};

export default function BookingForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { currentStep, formData } = state;
  const totalSteps = 4;

  //   const handleNext = () => {
  //     dispatch({ type: "NEXT_STEP" });
  //   };

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const handleSubmit = () => {
    // Perform the POST request to '/fulfill-reservation' with formData
    console.log("Form data:", formData);
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <TicketSelection />;
      case 2:
        return <CampSelection />;
      case 3:
        return <Personalinfo />;

      default:
        return null;
    }
  };

  return (
    <div>
      <FormContext.Provider value={{ formData, dispatch }}>
        {renderFormStep()}
      </FormContext.Provider>
      {currentStep > 1 && <button onClick={handlePrevious}>Previous</button>}
      {currentStep === totalSteps && (
        <div>
          <h2>Final Step</h2>
          {/* Render the final step component */}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}
