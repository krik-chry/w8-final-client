import { FULL_TICKETS } from "../actions/tickets";

export default function(state = [], action = {}) {
  switch (action.type) {
    case FULL_TICKETS:
      return action.payload;
    default:
      return state;
  }
}
