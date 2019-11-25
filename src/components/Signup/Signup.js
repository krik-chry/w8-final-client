import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Signup = props => {
  if (props.loggedInUser.length === 0) {
    return (
      <div>
      <h1>Sign Up </h1>
      <form onSubmit={props.onSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={props.values.username}
            onChange={props.onChange}
            />
        </label>
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
        <input type="submit" value="Sign Up" />
      </form>
      <button>
        <Link to={"/"}>Back to Welcome Page</Link>
      </button>
    </div>
  );
} else {
  return (
    <div>
        <h2>You have signed up already and you are logged in as {props.loggedInUser.username}</h2>
        <button className="backToWelcome">
          <Link to={"/"}>Back to Main Page</Link>
        </button>
      </div>
  )
}
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser
  };
}

export default connect(mapStateToProps)(Signup);