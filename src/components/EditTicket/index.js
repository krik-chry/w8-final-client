import React, { Component } from "react";
import { connect } from "react-redux";
import EditTicket from "./EditTicket";
import { updateTicket } from '../../actions/tickets'

class EditTicketContainer extends Component {
  state = { description: "", picture: "", price: "" };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    const { ticketId } = this.props.match.params;
    this.props.updateTicket(this.state, ticketId);

    this.setState({
      description: "",
      picture: "",
      price: ""
    });
  };

  render() {
    return (
      <EditTicket
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
        ticketId={this.props.match.params.ticketId}
        tickets={this.props.tickets}
      />
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser,
  tickets: state.tickets
});

const mapDispatchToProps = { updateTicket };

export default connect(mapStateToProps, mapDispatchToProps)(EditTicketContainer);
