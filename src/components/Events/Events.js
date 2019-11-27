import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../Styles/EventsList.css";

const Events = props => {
  const filteredEvents = props.events.filter(event => new Date(event.endDate) > Date.now())
  return (
    <div>
      {props.loggedInUser.length !== 0 && (
        <div>
          <h4>Add New Event </h4>
          <form className="event-form" onSubmit={props.onSubmit}>
            <label className="ev-label">
              Event Name:
              <input
                className="ev-input"
                type="text"
                name="name"
                value={props.values.name}
                onChange={props.onChange}
              />
            </label>

            <label className="ev-label">
              Event Logo:
              <input
                className="ev-input"
                type="text"
                name="logo"
                value={props.values.logo}
                onChange={props.onChange}
              />
            </label>
            <label className="ev-label">
              Starts on:
              <input
                className="ev-input"
                type="datetime-local"
                name="startDate"
                value={props.values.startDate}
                onChange={props.onChange}
              />
            </label>
            <label className="ev-label">
              Ends on:
              <input
                className="ev-input"
                type="datetime-local"
                name="endDate"
                value={props.values.endDate}
                onChange={props.onChange}
              />
            </label>
            <label className="ev-desc">
              Description:
              <input
                className="ev-desc-input"
                type="text"
                name="description"
                value={props.values.description}
                onChange={props.onChange}
              />
            </label>
            <input className="ev-input" type="submit" value="Add" />
          </form>
        </div>
      )}
      <div className="events-wrapper">
        {filteredEvents.map(event => {
          return (
            <div className="event" key={event.id}>
              <h3>{event.name}</h3>
              {event.logo !== "" ? (
                <img className="event-logo" src={event.logo} alt={event.name} />
              ) : (
                <img
                  className="event-logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                  alt={event.name}
                />
              )}
              <div className="dates">
                <p className="start-date">
                  Starts on: {event.startDate.slice(0, 10)} at{" "}
                  {event.startDate.slice(-13, -8)} UTC
                </p>
                <p className="end-date">
                  Ends on: {event.endDate.slice(0, 10)} at{" "}
                  {event.endDate.slice(-13, -8)} UTC
                </p>
              </div>
              <div className="event-button">
                <button className="more-button">
                  <Link
                    className="more-link"
                    to={`/events/${event.id}/tickets`}
                  >
                    See this event's tickets
                  </Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps)(Events);
