import { createContext, useReducer } from "react";
export const FormContext = createContext();
export const DispatchContext = createContext();

const initialState = {
  currentStep: 1,
  spots: [],
  formData: {
    ticketData: {
      ticketType: "regular",
      ticketQuantity: 1,
      totalTicketPrice: 0,
    },
    campData: { campType: "regular", campSpot: "-", campPrice: 0 },
    tentData: {
      totalTentPrice: 0,
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
    fixedFee: 99,
    totalPrice: 0,
    id: null,
    modal: false,
  },
  expirationDate: null,
};

const formReducer = (state, action) => {
  const { x2tents, x3tents } = state.formData.tentData;

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
      if (section === "expirationDate") {
        return {
          ...state,
          [section]: value,
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

    case "SET_AREAS":
      return { ...state, spots: action.payload };

    case "CALCULATE_TICKET_PRICE":
      const { ticketType } = state.formData.ticketData;
      const ticketQuantity = state.formData.ticketData.ticketQuantity;

      const totalTicketPrice =
        ticketType === "VIP" ? 399 * parseInt(ticketQuantity) : 299 * parseInt(ticketQuantity);
      return {
        ...state,
        formData: {
          ...state.formData,
          ticketData: {
            ...state.formData.ticketData,
            totalTicketPrice: totalTicketPrice,
          },
        },
      };

    case "UPDATE_CAMPTYPE_PRICE":
      const campPrice = action.payload.campType === "green" ? 249 : 0;
      return {
        ...state,
        formData: {
          ...state.formData,
          campData: {
            ...state.formData.campData,
            campPrice: campPrice,
          },
        },
      };
    case "CALCULATE_TENT_PRICE":
      const totalTentPrice = x2tents.amount * x2tents.price + x3tents.amount * x3tents.price;

      return {
        ...state,
        formData: {
          ...state.formData,
          tentData: {
            ...state.formData.tentData,
            totalTentPrice,
          },
        },
      };

    case "CALCULATE_TENT_CAPACITY":
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
    case "CALCULATE_TOTAL_PRICE":
      const totalPrice =
        state.formData.campData.campPrice +
        state.formData.ticketData.totalTicketPrice +
        state.formData.tentData.totalTentPrice +
        state.formData.fixedFee;
      return {
        ...state,
        formData: {
          ...state.formData,
          totalPrice: totalPrice,
        },
      };

    case "COUNTDOWN_EXPIRED":
      return {
        ...state,
        formData: {
          ...state.formData,
          modal: true,
        },
      };

    case "START_OVER":
      return initialState;

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
