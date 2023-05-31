import { createContext, useReducer } from "react";
export const FormContext = createContext();
export const DispatchContext = createContext();

const initialState = {
  currentStep: 1,
  spots: [],
  formData: {
    ticketData: { ticketType: "regular", ticketQuantity: 1 },
    campData: { campType: "regular", campSpot: "" },
    tentData: {
      x2tents: {
        amount: 0,
        price: 299,
        capacity: 2,
      },
      x3tents: {
        amount: 0,
        price: 399,
        capacity: 3,
      },
      tentRemainder: 1,
    },
    attendees: [
      {
        firstName: "",
        lastName: "",
        email: "",
      },
    ],
    totalPrice: 0,
    id: "",
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      const { section, field, value } = action.payload;
      if (section === "id") {
        return {
          ...state,
          formData: {
            ...state.formData,
            [section]: value,
          },
        };
      }
      if (section === "tentData") {
        return {
          ...state,
          formData: {
            ...state.formData,
            [section]: {
              ...state.formData[section],
              [field]: {
                ...state.formData[section][field],
                amount: value,
              },
            },
          },
        };
      }
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
    case "SET_AREAS":
      return { ...state, spots: action.payload };

    case "CALCULATE_TENT_CAPACITY":
      const { x2tents, x3tents } = state.formData.tentData;

      const totalTentCapacity =
        x2tents.amount * x2tents.capacity + x3tents.amount * x3tents.capacity;
      const tentRemainder = state.formData.ticketData.ticketQuantity - totalTentCapacity;

      return {
        ...state,
        formData: {
          ...state.formData,
          tentData: {
            ...state.formData.tentData,
            totalTentCapacity,
            tentRemainder,
          },
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
