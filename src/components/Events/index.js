import React, { Component } from "react";
import { connect } from "react-redux";
import { getEvents, createEvent } from "../../actions/events";
import Events from "./Events";

class EventsContainer extends Component {
  state = { name: "", description: "", logo: "", startDate: "", endDate: "" };

  componentDidMount() {
    this.props.getEvents();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.createEvent(this.state);

    if (
      this.state.name !== "" ||
      this.state.description !== "" ||
      this.state.logo !== "" ||
      this.state.startDate !== "" ||
      this.state.endDate !== ""
    ) {
      this.setState({
        name: "",
        description: "",
        logo: "",
        startDate: "",
        endDate: ""
      });
    }
  };
  
  render() {
    return (
      <Events
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
        events={this.props.events}
      />
    );
  }
}

const mapStateToProps = state => ({
  events: state.events
});

const mapDispatchToProps = { getEvents, createEvent };

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
