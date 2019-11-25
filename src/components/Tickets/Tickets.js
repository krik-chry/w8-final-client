import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const tickets = props => {
  if (props.loggedInUser.length !== 0) {
    return (
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
        {props.tickets.map(ticket => {
          return (
            <div key={ticket.id}>
              {/* <img src={ticket.picture} alt={ticket.id}/> */}
              <p>{ticket.description}</p>
              <p>Price: {ticket.price}</p>
              <button><Link to={'/'}>Back to Events</Link></button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        {props.tickets.map(ticket => {
          return (
            <div key={ticket.id}>
              {/* <img src={ticket.picture} alt={ticket.id}/> */}
              <p>{ticket.description}</p>
              <p>Price: {ticket.price}</p>
              <button><Link to={'/'}>Back to Events</Link></button>
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

export default connect(mapStateToProps)(tickets);
