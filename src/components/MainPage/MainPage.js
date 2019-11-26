import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EventContainer from "../Events";
import "../../Styles/MainPage.css";

const MainPage = props => {
  if (props.loggedInUser.length === 0) {
    return (
      <div>
        <h1 className="mp-title">Welcome to TicketFinder</h1>
        <h3 className="mp-desc">
          Best place online to sell or buy tickets, for EVERY event.
        </h3>
        <p className="mp-text">
          Create a <b>new user account</b> for free or <b>login</b> if you are
          an existing user.<br></br>
          Then you can create events, buy or sell tickets and add comments.
        </p>
        <h2 className="mp-events">Events</h2>
        <EventContainer />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="mp-title">Welcome to TicketFinder</h1>
        <h3 className="mp-desc">
          Best place online to sell or buy tickets, for EVERY event.
        </h3>
        <h2 className="mp-events">Events</h2>
        <EventContainer />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps)(MainPage);
