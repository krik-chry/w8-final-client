import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments, createComment } from "../../actions/ticketDetails";
import { ticketsList } from '../../actions/tickets'
import TicketDetails from "./TicketDetails";

class TicketDetailsContainer extends Component {
  state = { text: "" };

  componentDidMount() {
    const { ticketId } = this.props.match.params;

    this.props.getComments(ticketId);
    this.props.ticketsList()
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { ticketId } = this.props.match.params;
    this.props.createComment(this.state, ticketId)

    if (this.state.text !== "") {
      this.setState({
        text: ""
      });
    }
  };
  
  render() {
    return (
      <TicketDetails
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
        comments={this.props.comments}
        eventId={this.props.match.params.eventId}
        ticketId={this.props.match.params.ticketId}
        tickets={this.props.tickets}
      />
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  tickets: state.tickets,
  allTickets: state.allTickets
});

const mapDispatchToProps = { getComments, createComment, ticketsList };

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailsContainer);
