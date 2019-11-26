import { ALL_COMMENTS, NEW_COMMENT } from "../actions/ticketDetails";

export default function(state = [], action = {}) {
  switch (action.type) {
    case ALL_COMMENTS:
      return [...action.payload];
      case NEW_COMMENT:
      return [...state, action.payload];
    default:
      return state;
  }
}
