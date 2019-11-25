import { USER_LOGIN, USER_LOGOUT } from "../actions/users";

export default function(state = [], action = {}) {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    case USER_LOGOUT:
      return []
    default:
      return state;
  }
}