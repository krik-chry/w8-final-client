import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/users";
import Login from "./Login";

class LoginContainer extends Component {
  state = { email: "", password: "" };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();

    this.props.login(this.state.email, this.state.password);

    this.setState({
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <Login
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
      />
    );
  }
}

function mapStateToProps(state) {
  return { loggedInUser: state.loggedInUser };
}

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
