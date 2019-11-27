import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const TicketDetails = props => {
  const { eventId, ticketId } = props;
  const thisTicket = props.tickets.find(ticket => ticket.id == ticketId);
  return (
    <div>
      {props.loggedInUser.length !== 0 && (
        <div>
          <h3>Add New Comment </h3>
          <form onSubmit={props.onSubmit}>
            <label>
              Your comment:
              <input
                type="text"
                name="text"
                placeholder="Type here..."
                value={props.values.text}
                onChange={props.onChange}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </div>
      )}
      <h2>Ticket from {thisTicket.user.username}</h2>
      <p>Price: {thisTicket.price} EUR</p>
      <img src={thisTicket.picture} alt={thisTicket.description} />

      <p>Comments for this ticket</p>
      <div>
        <p>User</p>
        <div>
          {props.comments.map(comment => {
            return <p key={comment.id}>{comment.user.username}</p>;
          })}
        </div>
      </div>
      <div>
        <p>Comment</p>
        {props.comments.map(comment => {
          return <p key={comment.id}>{comment.text}</p>;
        })}
      </div>

      <button><Link to={`/edit/${ticketId}`}>Edit Ticket</Link></button>

      <button>
        <Link to={`/events/${eventId}/tickets`}>Back to all Tickets</Link>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser,
  comments: state.comments
});

export default connect(mapStateToProps)(TicketDetails);
