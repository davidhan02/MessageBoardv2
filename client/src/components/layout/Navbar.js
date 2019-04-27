import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

class Header extends Component {
  logoutUser = () => {
    const { logoutUser, history } = this.props;
    logoutUser(history);
  };

  render() {
    const { isAuthenticated, user, loading } = this.props.auth;

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

    const renderLinks = () => {
      if (loading) {
        return <Nav.Link>Loading...</Nav.Link>;
      }
      if (isAuthenticated) {
        return authLinks;
      }
      return guestLinks;
    };

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
              <Link className="nav-link" to="/about">
                About Us
              </Link>
              {renderLinks()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
