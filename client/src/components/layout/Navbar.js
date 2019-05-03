import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearCurrentProfile } from '../../actions/profileActions';
import { logoutUser } from '../../actions/authActions';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends Component {
  logoutUser = () => {
    const { logoutUser, history } = this.props;
    this.props.clearCurrentProfile();
    logoutUser(history);
  };

  render() {
    const { isAuthenticated, loading, user } = this.props.auth;

    const loadingLink = <Nav.Link>Loading...</Nav.Link>;

    const authLinks = (
      <Fragment>
        <Link className="nav-link" to="/dashboard">
          {user.name}
        </Link>
        <Nav.Link onClick={this.logoutUser}>Logout</Nav.Link>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Link className="nav-link" to="/login">
          Login
        </Link>
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </Fragment>
    );

    return (
      <Navbar expand="sm" className="navbar mb-5">
        <Container>
          <Link className="navbar-brand" to="/">
            CompanyName
          </Link>
          <Navbar.Toggle aria-controls="navigation" />
          <Navbar.Collapse id="navigation">
            <Nav className="ml-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/profiles">
                Profiles
              </Link>
              {loading ? loadingLink : isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(Header));
