import request from "superagent";

export const ALL_COMMENTS = "ALL_COMMENTS";
export const NEW_COMMENT = "NEW_COMMENT";
export const FULL_COMMENTS = "FULL_COMMENTS"

const baseUrl = "http://localhost:4000";

function allComments(payload) {
  return {
    type: ALL_COMMENTS,
    payload
  };
}

export const getComments = (ticketId) => (dispatch) => {
    request(`${baseUrl}/comments/${ticketId}`)
      .then(response => {
        const action = allComments(response.body);

        dispatch(action);
      })
      .catch(console.error);
  
};

function newComment(payload) {
  return {
    type: NEW_COMMENT,
    payload
  };
}

export const createComment = (data, ticketId) => (dispatch, getState) => {
  const state = getState()
  request
    .post(`${baseUrl}/comments/${ticketId}`)
    .set("Authorization", `Bearer ${state.loggedInUser.jwt}`)
    .send(data, ticketId)
    .then(response => {
      const comment = response.body;
      const action = newComment(comment);
      dispatch(action);
    })
    .catch(console.error);
};

function fullComments(payload) {
  return {
    type: FULL_COMMENTS,
    payload
  };
}

export const commentsList = () => dispatch => {
  request(`${baseUrl}/commentsList`)
    .then(response => {
      const action = fullComments(response.body);

      dispatch(action);
    })
    .catch(console.error);
};