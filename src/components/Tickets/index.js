import React, { Component } from "react";
import { connect } from "react-redux";
import { getTickets, createTicket } from "../../actions/tickets";
import Tickets from "./Tickets";

class TicketsContainer extends Component {
  state = { description: "", picture: "", price: "" };
  componentDidMount() {
    const { eventId } = this.props.match.params;

    this.props.getTickets(eventId);
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
      this.state.description !== "" &&
      this.state.picture !== "" &&
      this.state.price !== ""
    ) {
      this.setState({
        name: "",
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
      />
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets
});

const mapDispatchToProps = { getTickets, createTicket };

export default connect(mapStateToProps, mapDispatchToProps)(TicketsContainer);
