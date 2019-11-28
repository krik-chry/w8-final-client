import { combineReducers } from "redux";
import users from './users'
import error from './error'
import events from './events'
import tickets from './tickets'
import comments from './comments'
import allTickets from './allTickets'
import allComments from './allComments'
import loggedInUser from './loggedInUser'

export default combineReducers({
  users,
  error,
  events,
  tickets,
  comments,
  allTickets,
  allComments,
  loggedInUser
});