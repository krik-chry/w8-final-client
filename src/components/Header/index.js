import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from '../../actions/users'
import Header from './Header'

class HeaderContainer extends Component {
  onLogout = () => {
    this.props.logout()
  }
  render() {
    return (
      <Header
        loggedInUser={this.props.loggedInUser}
        onLogout={this.onLogout}
      />
    );
  }
}

function mapStateToProps(state) {
  return { loggedInUser: state.loggedInUser };
}
const mapDispatchToProps = { logout }
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
