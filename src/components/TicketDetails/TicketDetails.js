import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const TicketDetails = props => {
  const { eventId, ticketId } = props;

  const allTickets = props.allTickets;
  const allComments = props.comments;
  const thisTicket = props.tickets.find(ticket => ticket.id == ticketId);


  //calculate ticket risk algorithm
  const calculateRisk = () => {
    let priceRisk = 0;
    let authorRisk = 0;
    let hourRisk = 0;
    let commentsRisk = 0;

    //calculate number of author's tickets
    const ticketsByAuthor = allTickets.filter(
      ticket => ticket.userId == thisTicket.userId
    ).length;

    //calculate time of creation
    const timeOfCreation = thisTicket.createdAt;
    const hourOfCreation = parseInt(timeOfCreation.slice(11, 13)) + 1;

    //calculate comments
    const filterAuthorComments = allComments.filter(
      comment => comment.userId !== thisTicket.userId
    );
    const commentsNumber = filterAuthorComments.length;

    //calculate ticket avg price
    const ticketsPrices = props.tickets.map(ticket => parseInt(ticket.price));
    const ticketsAveragePrice = ticketsPrices.reduce((total, price) => {
      return (total += price / ticketsPrices.length);
    }, 0);

    //calculate difference
    const percentageDifference = 100 * ( ( Number(thisTicket.price) - ticketsAveragePrice)  / ((Number(thisTicket.price) + ticketsAveragePrice ) / 2)    ) 
      
    //check for difference
    if (percentageDifference > 10) {
      priceRisk -= 10;
    } else if (percentageDifference > 0 && percentageDifference < 10) {
      priceRisk -= percentageDifference;
    } else {
      priceRisk -= percentageDifference;
    }

    //check author's tickets
    if (ticketsByAuthor === 1) {
      authorRisk += 10;
    }

    //check business hour risky or not
    if (hourOfCreation < 9 || hourOfCreation > 16) {
      hourRisk += 10;
    } else hourRisk -= 10;

    //calculate comments length risk
    if (commentsNumber > 3) {
      commentsRisk = 5;
    }

    //add all risks
    const finalRisk = priceRisk + authorRisk + hourRisk + commentsRisk;
    //final result
    if (finalRisk < 5) {
      return 5;
    } else if (finalRisk > 95) {
      return 95;
    } else return finalRisk;
  };
  return (
    <div>
      <h2>Ticket from {thisTicket.user.username}</h2>
      <h2>Price: {thisTicket.price} EUR</h2>
      {calculateRisk() > 80 && (
        <h3 style={{ color: "red" }}>
          Risk: {calculateRisk().toFixed(1)} % VERY HIGH 
        </h3>
      )}
      {calculateRisk() > 60 && calculateRisk() <= 80 && (
        <h3 style={{ color: "orange" }}>
          Risk: {calculateRisk().toFixed(1)} % HIGH
        </h3>
      )}
      {calculateRisk() > 40 && calculateRisk() <= 60 && (
        <h3 style={{ color: "yellow" }}>
          Risk: {calculateRisk().toFixed(1)} % MODERATE
        </h3>
      )}
      {calculateRisk() > 20 && calculateRisk() <= 40 && (
        <h3 style={{ color: "lightgreen" }}>
          Risk: {calculateRisk().toFixed(1)} % LOW
        </h3>
      )}
      {calculateRisk() <= 20 && (
        <h3 style={{ color: "green" }}>
          Risk: {calculateRisk().toFixed(1)} % VERY LOW
        </h3>
      )}

      {thisTicket.picture !== "" ? (
        <img
          className="ticket-image"
          src={thisTicket.picture}
          alt={thisTicket.description}
        />
      ) : (
        <img
          className="ticket-image"
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
          alt="not available"
        />
      )}
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
  comments: state.comments,
  allTickets: state.allTickets
});

export default connect(mapStateToProps)(TicketDetails);
