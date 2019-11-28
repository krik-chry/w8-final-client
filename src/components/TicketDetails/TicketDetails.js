import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { calculateRisk } from "../../riskAlgorithm";

const TicketDetails = props => {
  const { eventId, ticketId } = props;
  const allTickets = props.allTickets;
  const allComments = props.comments;
  const thisTicket = props.tickets.find(ticket => ticket.id == ticketId);
  const tickets = props.tickets;
  const ticketRisk = calculateRisk(
    allTickets,
    allComments,
    thisTicket,
    tickets
  ).toFixed(1);
  return (
    <div>
      <div className="ticket-section">
        <h2>Ticket from {thisTicket.user.username}</h2>
        <h2>Price: {thisTicket.price} EUR</h2>
        {ticketRisk > 80 && (
          <h3 style={{ color: "red" }}>Risk: {ticketRisk} % VERY HIGH</h3>
        )}
        {ticketRisk > 60 && ticketRisk <= 80 && (
          <h3 style={{ color: "orange" }}>Risk: {ticketRisk} % HIGH</h3>
        )}
        {ticketRisk > 40 && ticketRisk <= 60 && (
          <h3 style={{ color: "yellow" }}>Risk: {ticketRisk} % MODERATE</h3>
        )}
        {ticketRisk > 20 && ticketRisk <= 40 && (
          <h3 style={{ color: "lightgreen" }}>Risk: {ticketRisk} % LOW</h3>
        )}
        {ticketRisk <= 20 && (
          <h3 style={{ color: "green" }}>Risk: {ticketRisk} % VERY LOW</h3>
        )}

        <div className="info-wrapper">
          <div className="image-section">
            {thisTicket.picture !== "" ? (
              <img
                className="ticket-image"
                src={thisTicket.picture}
                alt={thisTicket.picture}
              />
            ) : (
              <img
                className="ticket-image"
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                alt="not available"
              />
            )}
          </div>

          <div className="desc-section">
            <h4>
              <u>Description</u>
            </h4>
            {thisTicket.description !== ""
              ? thisTicket.description
              : "No description available"}
          </div>
        </div>
      </div>
      <div className="comment-section">
        <h4>Comments for this ticket</h4>
        <div className="comments-table">
          <div className="comment-author">
            {props.comments.map(comment => {
              return (
                <p className="author-cell" key={comment.id}>
                  {comment.user.username}
                </p>
              );
            })}
          </div>
          <div className="comment-text">
            {props.comments.map(comment => {
              return (
                <p className="text-cell" key={comment.id}>
                  {comment.text}
                </p>
              );
            })}
          </div>
        </div>
        {props.loggedInUser.length !== 0 && (
          <div>
            <form className="comment-form" autoComplete='off' onSubmit={props.onSubmit}>
              <label className="comment-label">
              Your comment:
                <input
                  className="comment-input"
                  type="text"
                  name="text"
                  placeholder="Type here..."
                  value={props.values.text}
                  onChange={props.onChange}
                />
              </label>
              <input className="comment-input" type="submit" value="Add" />
            </form>
          </div>
        )}
      </div>

      <button className="edit-button">
        <Link className="edit-link" to={`/edit/${ticketId}`}>
          Edit Ticket
        </Link>
      </button>

      <button className="back-button">
        <Link className="back-link" to={`/events/${eventId}/tickets`}>
          Back to Tickets
        </Link>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser,
  comments: state.comments,
  allTickets: state.allTickets,
  tickets: state.tickets
});

export default connect(mapStateToProps)(TicketDetails);
