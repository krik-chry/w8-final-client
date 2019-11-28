import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../Styles/LoginSignup.css";

const EditTicket = props => {
  const { ticketId } = props;
  const thisTicket = props.tickets.find(ticket => ticket.id == ticketId);
  const eventId = thisTicket.eventId
  return (
    <div>
      {thisTicket.userId === props.loggedInUser.id && (
        <div>
          <h1 className="loginHeader">Edit</h1>
          <form className="ls-form" autoComplete='off' onSubmit={props.onSubmit}>
            <label className="ls-label">
              Description:
              <input
                className="ls-input"
                type="text"
                name="description"
                value={props.values.description}
                onChange={props.onChange}
              />
            </label>
            <label className="ls-label">
              Picture:
              <input
                className="ls-input"
                type="text"
                name="picture"
                value={props.values.picture}
                onChange={props.onChange}
              />
            </label>
            <label className="ls-label">
              Price:
              <input
                className="ls-input"
                type="text"
                name="price"
                value={props.values.price}
                onChange={props.onChange}
              />
            </label>
            <input className="ls-input" type="submit" value="Confirm" />
          </form>
          <button className="ls-button">
            <Link className="ls-link" to={`/ticketDetails/${eventId}/${ticketId}`}>
              Back to tickets
            </Link>
          </button>
        </div>
      )}
      {thisTicket.userId !== props.loggedInUser.id && (
        <div>
          <p>Only the author of this ticket can edit it.</p>
          <button className="ls-button">
            <Link className="ls-link" to={`/ticketDetails/${eventId}/${ticketId}`}>
              Back to tickets
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps)(EditTicket);
