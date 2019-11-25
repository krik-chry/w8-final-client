import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = props => {
  if (props.loggedInUser.length === 0) {
    return (
      <div>
        <button className="backToWelcome">
          <Link to={"/login"}>Login</Link>
        </button>
        <button className="backToWelcome">
          <Link to={"/signup"}>Signup</Link>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Logged in as:  {props.loggedInUser.username}</p>
        <button onClick={() => props.onLogout()}>
          <Link to="/">Logout</Link>
        </button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser
  };
}

export default connect(mapStateToProps)(Header);
