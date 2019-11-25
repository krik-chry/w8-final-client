import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, createUser } from "../../actions/users";
import Signup from "./Signup";
import { Redirect } from "react-router-dom";

class SignupContainer extends Component {
  state = { username: "", email: "", password: "", redirect: false };
  componentDidMount() {
    this.props.getUsers();
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    console.log('onsubmitstate', this.state)
    this.props.createUser(this.state);

    if (
      this.state.username !== "" &&
      this.state.password !== "" &&
      this.state.email !== ""
    ) {
      this.setState({
        username: "",
        email: "",
        password: "",
        redirect: true
      });
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <Signup
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
      />
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

const mapDispatchToProps = { getUsers, createUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
