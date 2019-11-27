import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const TicketDetails = props => {
  const { eventId, ticketId } = props;
  const thisTicket = props.tickets.find(ticket => ticket.id == ticketId);
  return (
    <div>
     
      <h2>Ticket from {thisTicket.user.username}</h2>
      <p>Price: {thisTicket.price} EUR</p>
      <img src={thisTicket.picture} alt={thisTicket.description} />
      <div className="comment-section">
        <h4>Comments for this ticket</h4>
        <div className="comments-table">
          <div className="comment-text">
            {props.comments.map(comment => {
              return (
                <p className="text-cell" key={comment.id}>
                  {comment.text}
                </p>
              );
            })}
          </div>
          <div className="comment-author">
            {props.comments.map(comment => {
              return (
                <p className="author-cell" key={comment.id}>
                  by: {comment.user.username}
                </p>
              );
            })}
          </div>
        </div>
        {props.loggedInUser.length !== 0 && (
        <div>
          <form className="comment-form" onSubmit={props.onSubmit}>
              Your comment:
            <label className="comment-label">
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
  comments: state.comments
});

export default connect(mapStateToProps)(TicketDetails);
