import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../Styles/Tickets.css";

const Tickets = props => {
  const { eventId } = props;
  const thisEvent = props.events.find(event => event.id == eventId);
  
  return (
    <div>
      <h2>Tickets for {thisEvent.name}</h2>
      <h3>Available: {props.tickets.length}</h3>
      <div className="ticket-table">
        <div className="ticket-seller">
          <p className="seller-title">Ticket Seller</p>
          {props.tickets.map(ticket => {
            return <p key={ticket.id} className="seller-cell">{ticket.user.username}</p>;
          })}
        </div>
        <div className="ticket-desc">
          <p className="desc-title">Description</p>
          {props.tickets.map(ticket => {
            return (
              <div key={ticket.id}>
                {ticket.description !== "" ? (
                  <p className="desc-cell">{ticket.description}</p>
                ) : (
                  <p className="desc-cell">No description available</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="ticket-price">
          <p className="price-title">Price</p>
          {props.tickets.map(ticket => {
            return <p key={ticket.id} className="price-cell">{ticket.price} EUR</p>;
          })}
        </div>
        <div className="ticket-details">
          <p className="details-title">Details</p>
          {props.tickets.map(ticket => {
            return (
              <div key={ticket.id} className="details-cell">
                <button className='more-button'>
                  <Link className='more-link' to={`/ticketDetails/${eventId}/${ticket.id}`}>
                    More
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {props.loggedInUser.length !== 0 && (
        <div>
          <form className="ticket-form" onSubmit={props.onSubmit}>
          <p>Add New Ticket</p>
            <label className="ticket-label">
              Description:
              <input
                className="ticket-input"
                type="text"
                name="description"
                value={props.values.description}
                onChange={props.onChange}
              />
            </label>
            <label className="ticket-label">
              Ticket Picture:
              <input
                className="ticket-input"
                type="text"
                name="picture"
                value={props.values.picture}
                onChange={props.onChange}
              />
            </label>
            <label className="ticket-label">
              Price :
              <input
                className="ticket-input"
                type="text"
                name="price"
                value={props.values.price}
                onChange={props.onChange}
              />
            </label>
            <input className="ticket-input" type="submit" value="Add" />
          </form>
        </div>
      )}
      <button className="back-button">
        <Link className="back-link" to={"/"}>
          Back to Events
        </Link>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps)(Tickets);
