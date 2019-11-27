import request from "superagent";

export const ALL_TICKETS = "ALL_TICKETS";
export const NEW_TICKET = "NEW_TICKET";
export const FULL_TICKETS = "FULL_TICKETS"

const baseUrl = "http://localhost:4000";

function allTickets(payload) {
  return {
    type: ALL_TICKETS,
    payload
  };
}

export const getTickets = eventId => dispatch => {
  request(`${baseUrl}/events/${eventId}/tickets`)
    .then(response => {
      const action = allTickets(response.body);

      dispatch(action);
    })
    .catch(console.error);
};

function newTicket(payload) {
  return {
    type: NEW_TICKET,
    payload
  };
}

export const createTicket = (data, eventId) => (dispatch, getState) => {
  const state = getState();
  request
    .post(`${baseUrl}/events/${eventId}/ticket`)
    .set("Authorization", `Bearer ${state.loggedInUser.jwt}`)
    .send(data, eventId)
    .then(response => {
      const action = newTicket(response.body);
      dispatch(action);
    })
    .catch(console.error);
};

export const updateTicket = (data, ticketId) => (dispatch, getState) => {
  const state = getState()
  request
    .put(`${baseUrl}/edit/${ticketId}`)
    .set("Authorization", `Bearer ${state.loggedInUser.jwt}`)
    .send(data)
    .then(response => {
      const action = allTickets(response.body)
      dispatch(action)
    })
    .catch(console.error)
}

function fullTickets(payload) {
  return {
    type: FULL_TICKETS,
    payload
  };
}

export const ticketsList = () => dispatch => {
  request(`${baseUrl}/ticketsList`)
    .then(response => {
      const action = fullTickets(response.body);

      dispatch(action);
    })
    .catch(console.error);
};