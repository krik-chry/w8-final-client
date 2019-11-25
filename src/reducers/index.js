import { combineReducers } from "redux";
import users from './users'
import loggedInUser from './loggedInUser'
import error from './error'
import events from './events'
import tickets from './tickets'

export default combineReducers({
  users,
  error,
  loggedInUser,
  events,
  tickets
});