import { createContext, useReducer } from "react";
export const FormContext = createContext();
export const DispatchContext = createContext();

const initialState = {
  currentStep: 1,
  formData: {
    ticketData: { ticketType: "regular", ticketQuantity: 1 },
    campData: { campType: "regular", campSpot: "", tentSetup: false },
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
      const { section, field, value } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [section]: {
            ...state.formData[section],
            [field]: value,
          },
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

    case "CREATE_ATTENDEE_STRUCTURE":
      let attendees = [];
      for (let i = 0; i < state.formData.ticketData.ticketQuantity; i++) {
        attendees.push({ firstName: "", lastName: "", email: "" });
      }
      return {
        ...state,
        formData: {
          ...state.formData,
          attendees: attendees,
        },
      };

    case "ADD_ATTENDEE":
      return {
        ...state,
        formData: {
          ...state.formData,
          attendees: [...state.formData.attendees, { firstName: "", lastName: "", email: "" }],
        },
      };

    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </FormContext.Provider>
  );
};

export default FormProvider;
