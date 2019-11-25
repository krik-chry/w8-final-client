import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Events = props => {
  if (props.loggedInUser.length !== 0) {
    return (
      <div>
        <h1>Add New Event </h1>
        <form onSubmit={props.onSubmit}>
          <label>
            Event Name:
            <input
              type="text"
              name="name"
              value={props.values.name}
              onChange={props.onChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={props.values.description}
              onChange={props.onChange}
            />
          </label>
          <label>
            Event Logo:
            <input
              type="text"
              name="logo"
              value={props.values.logo}
              onChange={props.onChange}
            />
          </label>
          <label>
            Starts on:
            <input
              type="text"
              name="startDate"
              value={props.values.startDate}
              onChange={props.onChange}
            />
          </label>
          <label>
            Ends on:
            <input
              type="text"
              name="endDate"
              value={props.values.endDate}
              onChange={props.onChange}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
        {props.events.map(event => {
          return (
            <div key={event.id}>
              <h3>{event.name}</h3>
              {/* <img src={event.logo} alt={event.name}/> */}
              <p>{event.description}</p>
              <p>Starts on: {event.startDate}</p>
              <p>Ends on: {event.endDate}</p>
              <button><Link to={`/events/${event.id}/tickets`}>See this event's tickets</Link></button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        {props.events.map(event => {
          return (
            <div key={event.id}>
              <h3>{event.name}</h3>
              {/* <img src={event.logo} alt={event.name}/> */}
              <p>{event.description}</p>
              <p>Starts on: {event.startDate}</p>
              <p>Ends on: {event.endDate}</p>
              <button><Link to={`/events/${event.id}/tickets`}>See this event's tickets</Link></button>
            </div>
          );
        })}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser
  };
}

export default connect(mapStateToProps)(Events);
