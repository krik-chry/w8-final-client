import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../Styles/Header.css";

const Header = props => {
  if (props.loggedInUser.length === 0) {
    return (
      <div className="header">
        <img
          className="header-img"
          alt="ticket"
          src="http://www.pngmart.com/files/6/Ticket-PNG-Photo.png"
        />
        <div className="header-title">
          <Link className="ls-link" style={{ color: "yellow" }} to={"/"}>
            TicketFinder
          </Link>
        </div>
        <div className="header-buttons">
          <button className="ls-button">
            <Link className="ls-link" to={"/login"}>
              Login
            </Link>
          </button>
          <button className="ls-button">
            <Link className="ls-link" to={"/signup"}>
              Signup
            </Link>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header">
        <img
          className="header-img"
          alt="ticket"
          src="http://www.pngmart.com/files/6/Ticket-PNG-Photo.png"
        />
        <div className="header-title">
          <Link className="ls-link" style={{ color: "yellow" }} to={"/"}>
            TicketFinder
          </Link>
        </div>

        <div className="header-logged">
          <p className="logged-in"><span role="img" aria-label="user">👤</span> {props.loggedInUser.username}</p>
          <button className="ls-button" onClick={() => props.onLogout()}>
            <Link className="ls-link" to="/">
              Logout
            </Link>
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps)(Header);
