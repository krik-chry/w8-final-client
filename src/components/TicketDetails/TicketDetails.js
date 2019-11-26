import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const TicketDetails = props => {
  if (props.loggedInUser.length !== 0) {
    return (
      <div>
        <h1>Add New Comment </h1>
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
        {props.comments.map(comment => {
          return <div key={comment.id}>{comment.text}</div>;
        })}
        <button><Link to={'/'}>Back to Event</Link></button>
      </div>
    );
  } else {
    return (
      <div>
        {props.comments.map(comment => {
          return (

            <div key={comment.id}>{comment.text}</div>
          )
        })}
        <button><Link to={'/'}>Back to Event</Link></button> 
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser
  };
}

export default connect(mapStateToProps)(TicketDetails);
