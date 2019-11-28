import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../Styles/EventsList.css";

class Events extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      eventsPerPage: 9
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { currentPage, eventsPerPage } = this.state;
    const events = this.props.events.filter(
      event => new Date(event.endDate) > Date.now()
    );

    // Logic for displaying current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const renderEvents = currentEvents.map(event => {
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
              <Link className="more-link" to={`/events/${event.id}/tickets`}>
                See this event's tickets
              </Link>
            </button>
          </div>
        </div>
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <div>
        {this.props.loggedInUser.length !== 0 && (
          <div>
            <h4>Add New Event </h4>
            <form className="event-form" onSubmit={this.props.onSubmit}>
              <label className="ev-label">
                Event Name:
                <input
                  className="ev-input"
                  type="text"
                  name="name"
                  value={this.props.values.name}
                  onChange={this.props.onChange}
                />
              </label>

              <label className="ev-label">
                Event Logo:
                <input
                  className="ev-input"
                  type="text"
                  name="logo"
                  value={this.props.values.logo}
                  onChange={this.props.onChange}
                />
              </label>
              <label className="ev-label">
                Starts on:
                <input
                  className="ev-input"
                  type="datetime-local"
                  name="startDate"
                  value={this.props.values.startDate}
                  onChange={this.props.onChange}
                />
              </label>
              <label className="ev-label">
                Ends on:
                <input
                  className="ev-input"
                  type="datetime-local"
                  name="endDate"
                  value={this.props.values.endDate}
                  onChange={this.props.onChange}
                />
              </label>
              <label className="ev-desc">
                Description:
                <input
                  className="ev-desc-input"
                  type="text"
                  name="description"
                  value={this.props.values.description}
                  onChange={this.props.onChange}
                />
              </label>
              <input className="ev-input" type="submit" value="Add" />
            </form>
          </div>
        )}
        <div className="page-numbers">
          <p className="page-number">Page: {currentPage}</p>
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </div>
        <div className="events-wrapper">{renderEvents}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser,
  events: state.events
});

export default connect(mapStateToProps)(Events);
