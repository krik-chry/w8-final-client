import { ALL_TICKETS, NEW_TICKET } from "../actions/tickets";

export default function(state = [], action = {}) {
  switch (action.type) {
    case ALL_TICKETS:
      return action.payload;
    case NEW_TICKET:
      return [...state, action.payload];
    default:
      return state;
  }
}
