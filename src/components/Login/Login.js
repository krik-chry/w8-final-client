import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Login = props => {
  if (props.loggedInUser.length === 0) {
    return (
      <div>
        <h1 className="loginHeader">Login</h1>
        <form onSubmit={props.onSubmit}>
          <label>
            E-mail:
            <input
              type="text"
              name="email"
              value={props.values.email}
              onChange={props.onChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={props.values.password}
              onChange={props.onChange}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
        {props.error.length > 0 && <p>{props.error}</p>}
        <button className="backToWelcome">
          <Link to={"/"}>Back to Welcome Page</Link>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Logged in successfully as {props.loggedInUser.username}</h2>
        <button className="backToWelcome">
          <Link to={"/"}>Back to Main Page</Link>
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    error: state.error,
    loggedInUser: state.loggedInUser
  };
}

export default connect(mapStateToProps)(Login);
