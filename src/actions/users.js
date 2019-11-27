import request from "superagent";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const ALL_USERS = "ALL_USERS";
export const NEW_USER = "NEW_USER";
export const ERROR = "ERROR";

const baseUrl = "http://localhost:4000";

function allUsers(payload) {
  return {
    type: ALL_USERS,
    payload
  };
}

export const getUsers = () => (dispatch, getState) => {
  const state = getState();
  const { users } = state;
  if (!users.length) {
    request(`${baseUrl}/users`)
      .then(response => {
        const action = allUsers(response.body);

        dispatch(action);
      })
      .catch(console.error);
  }
};

function newUser(payload) {
  return {
    type: NEW_USER,
    payload
  };
}

export const createUser = data => dispatch => {
  request
    .post(`${baseUrl}/user`)
    .send(data)
    .then(response => {
      const user = response.body;
      const action = newUser(user);
      dispatch(action);
    })
    .catch(console.error);
};

function userLogin(payload) {
  return {
    type: USER_LOGIN,
    payload
  };
}

function error(payload) {
  return {
    type: ERROR,
    payload
  };
}

export const login = (email, password) => (dispatch, getState) => {
  const state = getState();
  request
    .post(`${baseUrl}/login`)
    .set("Authorization", `Bearer ${state.loggedInUser.jwt}`)
    .send({ email, password })
    .then(response => {
      console.log(response.body)

      const { jwt, username, id } = response.body
      
      const action = userLogin({ jwt, username, id });
      dispatch(action);
    })
    .catch(errorResponse => {
      console.error(errorResponse);
      const action = error("Wrong password or email. Please try again.");
      dispatch(action);
    });
};

function userLogout(payload) {
  return {
    type: USER_LOGOUT,
    payload
  };
}

export const logout = () => dispatch => {
  const action = userLogout({});
  dispatch(action);
};
