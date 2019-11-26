import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Tickets = props => {
  return (
    <div>
      {props.loggedInUser.length !== 0 && (
        <div>
          <h1>Add New Ticket </h1>
          <form onSubmit={props.onSubmit}>
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
              Ticket Picture:
              <input
                type="text"
                name="picture"
                value={props.values.picture}
                onChange={props.onChange}
              />
            </label>
            <label>
              Price :
              <input
                type="text"
                name="price"
                value={props.values.price}
                onChange={props.onChange}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </div>
      )}

      <h3>Tickets for this event</h3>
      <p>Tickets available: {props.tickets.length}</p>
      {props.tickets.map(ticket => {
        return (
          <div key={ticket.id}>
            {/* <img src={ticket.picture} alt={ticket.id}/> */}
            <p>{ticket.description}</p>
            <p>{ticket.user.username}</p>
            <p>Price: {ticket.price}</p>
            <button>
              <Link to={`/ticketDetails/${ticket.id}`}>Details</Link>
            </button>
          </div>
        );
      })}
      <button>
        <Link to={"/"}>Back to Events</Link>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps)(Tickets);
