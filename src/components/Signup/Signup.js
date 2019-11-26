import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Signup = props => {
  if (props.loggedInUser.length === 0) {
    return (
      <div>
        <h1>Sign Up </h1>
        <form className="ls-form" onSubmit={props.onSubmit}>
          <label className="ls-label">
            Username:
            <input
              className="ls-input"
              type="text"
              name="username"
              value={props.values.username}
              onChange={props.onChange}
            />
          </label>
          <label className="ls-label">
            E-mail:
            <input
              className="ls-input"
              type="text"
              name="email"
              value={props.values.email}
              onChange={props.onChange}
            />
          </label>
          <label className="ls-label">
            Password:
            <input
              className="ls-input"
              type="password"
              name="password"
              value={props.values.password}
              onChange={props.onChange}
            />
          </label>
          <input className="ls-input" type="submit" value="Sign Up" />
        </form>
        <button className="ls-button">
          <Link className="ls-link" to={"/"}>
            Back to Main Page
          </Link>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          You have signed up already and you are logged in as{" "}
          {props.loggedInUser.username}
        </h2>
        <button className="ls-button">
          <Link className="ls-link" to={"/"}>
            Back to Main Page
          </Link>
        </button>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps)(Signup);
