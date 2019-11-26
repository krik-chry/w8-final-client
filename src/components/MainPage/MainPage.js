import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EventContainer from '../Events'

const MainPage = props => {
  if (props.loggedInUser.length === 0) {
    return (
      <div>
        <h1>Welcome to TicketFinder</h1>
        <h3>Best place online to sell or buy tickets, for EVERY event.</h3>
        <p>
          Create a <b>new user account</b> for free or <b>login</b> if you are
          an existing user.<br></br>
          Then you can create events, buy or sell tickets and add comments.
        </p>
        <h2>Events</h2>
        <EventContainer />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Welcome to TicketFinder</h1>
        <h3>Best place online to sell or buy tickets, for EVERY event.</h3>
        <h2>Events</h2>
        <EventContainer />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser
  };
}
export default connect(mapStateToProps)(MainPage);