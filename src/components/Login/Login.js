import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../Styles/LoginSignup.css";

const Login = props => {
  if (props.loggedInUser.length === 0) {
    return (
      <div>
        <h1 className="loginHeader">Login</h1>
        <form className="ls-form" autoComplete='off' onSubmit={props.onSubmit}>
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
          <input className="ls-input" type="submit" value="Login" />
        </form>
        {props.error.length > 0 && <p>{props.error}</p>}
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
        <h2>Logged in successfully as {props.loggedInUser.username}</h2>
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
  loggedInUser: state.loggedInUser,
  error: state.error
});

export default connect(mapStateToProps)(Login);
