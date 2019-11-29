import React, { Component } from "react";
import { connect } from "react-redux";
import { getTickets, createTicket, ticketsList } from "../../actions/tickets";
import { commentsList } from '../../actions/ticketDetails'
import Tickets from "./Tickets";

class TicketsContainer extends Component {
  state = { description: "", picture: "", price: "" }
  componentDidMount() {
    const { eventId } = this.props.match.params;

    this.props.getTickets(eventId);
    this.props.ticketsList()
    this.props.commentsList()
  }
  
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { eventId } = this.props.match.params;
    this.props.createTicket(this.state, eventId);

    if (
      this.state.description !== "" ||
      this.state.picture !== "" ||
      this.state.price !== ""
    ) {
      this.setState({
        description: "",
        picture: "",
        price: ""
      });
    }
  };
  
  render() {
    return (
      <Tickets
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
        tickets={this.props.tickets}
        eventId={this.props.match.params.eventId}
        events={this.props.events}
        allComments={this.props.allComments}
        allTickets={this.props.allTickets}
      />
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  events: state.events,
  allComments: state.allComments,
  allTickets: state.allTickets
});

const mapDispatchToProps = { getTickets, createTicket, ticketsList, commentsList };

export default connect(mapStateToProps, mapDispatchToProps)(TicketsContainer);
