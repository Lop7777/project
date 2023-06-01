// ticketReducer.js
const initialState = {
    departureCity: '',
    destinationCity: '',
    ticketCount: 0,
    ticketNumber: '',
  };
  
  const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TICKET_INFO':
        return {
          ...state,
          departureCity: action.payload.departureCity,
          destinationCity: action.payload.destinationCity,
          ticketCount: action.payload.ticketCount,
          ticketNumber: action.payload.ticketNumber,
        };
      default:
        return state;
    }
  };
  
  export default ticketReducer;
  