import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
  logout = () => {
    const { logoutUser, history } = this.props;
    logoutUser(history);
  };

  render() {
    const { isAuthenticated, user, loading } = this.props.auth;

    const authLinks = (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            {user.name}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={this.logout}>
            Logout
          </Link>
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </Fragment>
    );

    const renderLinks = () => {
      if (loading) {
        return ' Loading...';
      }
      if (isAuthenticated) {
        return authLinks;
      }
      return guestLinks;
    };

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            CompanyName
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              {renderLinks()}
            </ul>
          </div>
        </div>
      </nav>
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
