import { FULL_COMMENTS } from "../actions/ticketDetails";

export default function(state = [], action = {}) {
  switch (action.type) {
    case FULL_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}
